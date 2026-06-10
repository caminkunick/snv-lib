'use client'

import { Category } from '@/payload-types'
import { Edit, ImageNotSupported } from '@mui/icons-material'
import {
  Avatar,
  Card,
  CardHeader,
  Grid,
  IconButton,
  List,
  ListItemButton,
  ListItemButtonProps,
  ListItemText,
} from '@mui/material'
import { styled } from '@mui/material'

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
    const children = docs.filter((d) => d.parent === doc.id)
    return (
      <>
        <ListItemButton component="a" href={`/categories/${doc.id}`} target="_blank" {...props}>
          <ListItemText primary={doc.name} />
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
  borderRadius: theme.spacing(2),
  marginBottom: theme.spacing(1),
  marginLeft: theme.spacing(tab * 4),
}))
