import { Category } from '@/payload-types'
import { Edit, ImageNotSupported } from '@mui/icons-material'
import { Avatar, Card, CardHeader, Grid, IconButton } from '@mui/material'

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
