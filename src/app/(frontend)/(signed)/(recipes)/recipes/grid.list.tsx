import { Recipe } from '@/libs/recipes'
import {
  Edit as EditIcon,
  ImageNotSupported as ImageNotSupportedIcon,
  Visibility as VisibilityIcon,
  MoreVert,
  Delete as DeleteIcon,
} from '@mui/icons-material'
import {
  Avatar,
  Box,
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
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  Skeleton,
  styled,
} from '@mui/material'
import { useState } from 'react'

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
  const [anchor, setAnchor] = useState<null | { anchor: HTMLElement; value: Recipe }>(null)

  return (
    <>
      {props.list ? (
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
                <Card sx={{ position: 'relative' }}>
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
                  <CardContent sx={{ aspectRatio: '2 / 1' }}>
                    <Link
                      variant="body1"
                      sx={{
                        color: 'text.primary',
                        fontWeight: 'bold',
                        lineHeight: 1.1,
                        mb: 1,
                        display: '-webkit-box',
                        WebkitLineClamp: 3,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
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
                  </CardContent>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      padding: 0.5,
                      background:
                        'linear-gradient(to bottom left, rgba(0,0,0,0.75) 0%, rgba(0,0,0,0) 75%)',
                    }}
                  >
                    <IconButton
                      size="small"
                      children={<MoreVert fontSize="small" />}
                      onClick={(e) => setAnchor({ anchor: e.currentTarget, value: doc })}
                    />
                  </Box>
                  {doc.clients.length > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        padding: 1,
                      }}
                    >
                      <Clients>
                        {doc.clients.map((client) => (
                          <Avatar
                            key={client.id}
                            src={client.client?.image?.thumbnailURL}
                            sx={{ width: 24, height: 24 }}
                          />
                        ))}
                      </Clients>
                    </Box>
                  )}
                </Card>
              </Grid>
            ))
          )}
        </Grid>
      )}
      <Menu
        open={Boolean(anchor)}
        anchorEl={anchor?.anchor}
        onClose={() => setAnchor(null)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        slotProps={{ list: { dense: true, disablePadding: true } }}
      >
        <ListItemButton
          LinkComponent={'a'}
          href={`/admin/collections/recipes/${anchor?.value.id}`}
          target="_blank"
          sx={{ color: 'warning.main' }}
        >
          <ListItemIcon>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </ListItemButton>
        <ListItemButton sx={{ color: 'error.main' }}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remove" />
        </ListItemButton>
      </Menu>
    </>
  )
}
