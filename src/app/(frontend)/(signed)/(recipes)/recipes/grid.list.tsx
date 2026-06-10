import { Recipe } from '@/libs/recipes'
import {
  Edit as EditIcon,
  ImageNotSupported as ImageNotSupportedIcon,
  Visibility as VisibilityIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Skeleton,
  styled,
  Typography,
} from '@mui/material'

const Clients = styled(Box)(({ theme }) => ({
  display: 'flex',
  cursor: 'pointer',
  pointerEvents: 'auto',
  '> *': {
    transition: 'margin-right 0.3s ease',
    marginRight: theme.spacing(-1.5),
  },
  '&:hover': {
    '> *': {
      marginRight: theme.spacing(0.5),
    },
  },
}))

const Loading = () => {
  return (
    <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
      <Card sx={{ opacity: 0.5, pointerEvents: 'none' }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: '1 / 1',
          }}
        >
          <CircularProgress />
        </Box>
      </Card>
    </Grid>
  )
}

export type GridListProps = {
  loading?: boolean
  list?: boolean
  docs: Recipe[]
}
export const GridList = (props: GridListProps) => {
  return props.list ? (
    <List>
      <Divider />
      {props.loading ? (
        <ListItem divider>
          <ListItemText
            primary={<Skeleton width="50%" />}
            secondary={<Skeleton width="30%" height={8} />}
          />
        </ListItem>
      ) : (
        props.docs.map((doc) => (
          <ListItem
            dense
            key={doc.id}
            divider
            secondaryAction={
              <IconButton
                size="small"
                children={<EditIcon fontSize="small" />}
                color="warning"
                LinkComponent="a"
                href={`/admin/collections/recipes/${doc.id}`}
                target="_blank"
              />
            }
          >
            <ListItemAvatar>
              <Avatar
                variant="square"
                src={doc.image?.thumbnailURL}
                children={<ImageNotSupportedIcon />}
              />
            </ListItemAvatar>
            <ListItemText
              primary={doc.title}
              secondary={`${doc.type === 'master' ? 'สูตรหลัก' : 'สูตรย่อย'}`}
              slotProps={{
                primary: {
                  component: 'a',
                  href: `/recipes/${doc.id}`,
                },
              }}
            />
          </ListItem>
        ))
      )}
    </List>
  ) : (
    <Grid container spacing={1}>
      {props.loading ? (
        <Loading />
      ) : (
        props.docs.map((doc) => (
          <Grid key={doc.id} size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
            <Card>
              <CardMedia
                component={doc.image?.firebaseURL ? 'img' : 'div'}
                image={doc.image?.firebaseURL}
                alt={doc.title}
                sx={{
                  backgroundColor: 'background.default',
                  backgroundSize: 'cover',
                  width: '100%',
                  aspectRatio: '1 / 1',
                }}
              />
              <CardContent>
                <Link
                  variant="body1"
                  sx={{
                    display: 'block',
                    color: 'text.primary',
                    fontWeight: 'bold',
                    lineHeight: 1.1,
                    mb: 1,
                  }}
                  href={`/recipes/${doc.id}`}
                  children={doc.title}
                />
                <Chip
                  label={doc.type === 'master' ? 'สูตรหลัก' : 'สูตรย่อย'}
                  size="small"
                  variant={doc.type === 'master' ? 'filled' : 'outlined'}
                  sx={{ textTransform: 'uppercase', fontSize: 9, mb: 1 }}
                  color="primary"
                />
                {doc.clients.length > 0 && (
                  <Clients>
                    {doc.clients.map((client) => (
                      <Avatar
                        key={client.id}
                        src={client.client?.image?.thumbnailURL}
                        sx={{ width: 24, height: 24 }}
                      />
                    ))}
                  </Clients>
                )}
              </CardContent>
              <CardActions sx={{ justifyContent: 'flex-end' }}>
                <Button
                  size="small"
                  variant="outlined"
                  color="info"
                  LinkComponent={'a'}
                  href={`/recipes/${doc.id}`}
                  children="View"
                  startIcon={<VisibilityIcon fontSize="small" />}
                />
                <Button
                  size="small"
                  variant="outlined"
                  color="warning"
                  LinkComponent={'a'}
                  href={`/admin/collections/recipes/${doc.id}`}
                  target="_blank"
                  children="Edit"
                  startIcon={<EditIcon fontSize="small" />}
                />
              </CardActions>
            </Card>
          </Grid>
        ))
      )}
    </Grid>
  )
}
