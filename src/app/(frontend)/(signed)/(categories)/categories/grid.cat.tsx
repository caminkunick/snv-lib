'use client'

import { Category } from '@/payload-types'
import { Edit, ImageNotSupported, Delete, ArrowUpward } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardHeader,
  Collapse,
  Grid,
  IconButton,
  List,
  ListItemAvatar,
  ListItemButton,
  ListItemButtonProps,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/material'
import { usePreCon } from '../../pre.con'
import { useState } from 'react'

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
    const [expanded, setExpanded] = useState(false)

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
        <ListItemButton
          {...props}
          component={tab === 0 ? 'span' : 'a'}
          onClick={tab === 0 ? () => setExpanded((e) => !e) : undefined}
          href={tab !== 0 ? `/categories/${doc.id}` : undefined}
          target={tab !== 0 ? '_blank' : undefined}
        >
          {tab === 0 && (
            <ListItemIcon>
              <ArrowUpward
                sx={{
                  transition: 'transform 0.2s',
                  transform: expanded ? 'rotate(180deg)' : 'none',
                }}
              />
            </ListItemIcon>
          )}
          <ListItemAvatar>
            <Avatar
              variant="square"
              src={`/api/media/image/id/${doc.image}`}
              children={<ImageNotSupported />}
            />
          </ListItemAvatar>
          <ListItemText
            primary={doc.name}
            secondary={children.length > 0 ? `${children.length} subcategories` : null}
            slotProps={{
              secondary: {
                variant: 'caption',
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
          <Collapse in={expanded}>
            <List disablePadding>
              {children
                .sort((a, b) => a.name.localeCompare(b.name))
                .map((child) => (
                  <EnhanceListItemButton doc={child} docs={docs} key={child.id} tab={tab + 1} />
                ))}
            </List>
          </Collapse>
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
