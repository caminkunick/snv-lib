'use client'

import { Category } from '@/payload-types'
import { Edit, ImageNotSupported, Delete } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/material'
import { usePreCon } from '../../pre.con'

export const GridCat = ({ docs }: { docs: Category[] }) => {
  return docs.length > 0 ? (
    <Grid container spacing={2}>
      {docs.map((doc) => (
        <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={doc.id}>
          <Card>
            <CardHeader
              avatar={<Avatar variant="square" children={<ImageNotSupported />} />}
              title={doc.name}
              slotProps={{
                title: {
                  component: 'a',
                  href: `/categories/${doc.id}`,
                  sx: {
                    fontWeight: 'bold',
                    textDecoration: 'underline',
                  },
                },
              }}
              action={
                <IconButton
                  size="small"
                  children={<Edit fontSize="small" />}
                  color="warning"
                  LinkComponent="a"
                  href={`/admin/collections/categories/${doc.id}`}
                  target="_blank"
                />
              }
            />
          </Card>
        </Grid>
      ))}
    </Grid>
  ) : null
}

export type EnhanceListItemButtonProps = ListItemButtonProps & {
  doc: Category
  docs: Category[]
  tab?: number
}
export const EnhanceListItemButton = styled(
  ({ doc, docs, tab = 0, ...props }: EnhanceListItemButtonProps) => {
    const { setState } = usePreCon()
    const children = docs.filter((d) => d.parent === doc.id)

    const handleDelete = () =>
      setState((s) =>
        s.Set('popup', {
          type: 'remove',
          title: 'Delete Category',
          message: `Are you sure you want to delete "${doc.name}"?`,
          onConfirm: () =>
            fetch(`/api/categories/${doc.id}`, { method: 'DELETE' }).finally(() => {
              window.location.reload()
              setState((s) => s.Set('popup', null))
            }),
        }),
      )

    return (
      <>
        <ListItemButton {...props}>
          <ListItemAvatar>
            <Avatar
              variant="square"
              src={`/api/media/image/id/${doc.image}`}
              children={<ImageNotSupported />}
            />
          </ListItemAvatar>
          <ListItemText
            primary={doc.name}
            slotProps={{
              primary: {
                component: 'a',
                href: `/categories/${doc.id}`,
                target: '_blank',
              },
            }}
          />
          <ListItemSecondaryAction>
            <IconButton
              size="small"
              children={<Edit fontSize="small" />}
              color="warning"
              LinkComponent="a"
              href={`/admin/collections/categories/${doc.id}`}
              target="_blank"
            />
            <IconButton
              size="small"
              children={<Delete fontSize="small" />}
              color="error"
              onClick={handleDelete}
            />
          </ListItemSecondaryAction>
        </ListItemButton>
        {children.length > 0 ? (
          <List disablePadding>
            {children.map((child) => (
              <EnhanceListItemButton doc={child} docs={docs} key={child.id} tab={tab + 1} />
            ))}
          </List>
        ) : null}
      </>
    )
  },
)<EnhanceListItemButtonProps>(({ theme, tab = 0 }) => ({
  border: `1px solid ${theme.palette.divider}`,
  borderRadius: theme.spacing(1),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(tab * 4),
}))
