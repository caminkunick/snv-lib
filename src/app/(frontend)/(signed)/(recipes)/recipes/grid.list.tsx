import { Recipe } from '@/libs/recipes'
import {
  Edit as EditIcon,
  ImageNotSupported as ImageNotSupportedIcon,
  Visibility as VisibilityIcon,
  MoreVert,
  Delete as DeleteIcon,
  SearchOff as SearchOffIcon,
  RestaurantMenu as RestaurantMenuIcon,
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
  Typography,
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
    <Grid size={{ xs: 12, sm: 4, md: 3, lg: 2 }}>
      <Card
        sx={{
          opacity: 0.5,
          pointerEvents: 'none',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#FFFFFF',
          border: '1px solid #E7E1D7',
          borderRadius: '16px',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            aspectRatio: '1 / 1',
            bgcolor: '#FBF9F5',
            flexShrink: 0,
          }}
        >
          <CircularProgress sx={{ color: 'primary.main' }} />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            p: 2,
            minHeight: '120px',
          }}
        >
          <Skeleton
            variant="rounded"
            width="60%"
            height={20}
            sx={{ mb: 1.5, borderRadius: '6px' }}
          />
          <Skeleton variant="text" width="90%" height={16} sx={{ mb: 0.5 }} />
          <Skeleton variant="text" width="70%" height={16} />
        </Box>
      </Card>
    </Grid>
  )
}

export type GridListProps = {
  loading?: boolean
  list?: boolean
  docs: Recipe[]
  searchQuery?: string
}

const EmptyState = ({ searchQuery }: { searchQuery?: string }) => {
  const isSearch = Boolean(searchQuery)

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: 12,
        px: 4,
      }}
    >
      <Box
        sx={{
          width: 120,
          height: 120,
          borderRadius: '50%',
          bgcolor: '#FBF9F5',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mb: 3,
          border: '2px solid #E7E1D7',
        }}
      >
        {isSearch ? (
          <SearchOffIcon sx={{ fontSize: 56, color: '#5C635D' }} />
        ) : (
          <RestaurantMenuIcon sx={{ fontSize: 56, color: '#5C635D' }} />
        )}
      </Box>
      <Typography
        variant="h5"
        sx={{
          fontFamily: '"Playfair Display", serif',
          fontWeight: 400,
          fontSize: '1.75rem',
          color: '#1F2421',
          mb: 1,
          textAlign: 'center',
        }}
      >
        {isSearch ? 'No recipes found' : 'No recipes yet'}
      </Typography>
      <Typography
        sx={{
          fontSize: '1rem',
          color: '#5C635D',
          fontWeight: 300,
          maxWidth: '400px',
          textAlign: 'center',
        }}
      >
        {isSearch
          ? `We couldn't find any recipes matching "${searchQuery}". Try a different search term.`
          : 'Start creating your first recipe to see it here.'}
      </Typography>
    </Box>
  )
}
export const GridList = (props: GridListProps) => {
  const [anchor, setAnchor] = useState<null | { anchor: HTMLElement; value: Recipe }>(null)
  const isEmpty = !props.loading && props.docs.length === 0

  if (isEmpty) {
    return <EmptyState searchQuery={props.searchQuery} />
  }

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
                <Card
                  sx={{
                    position: 'relative',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: '#FFFFFF',
                    border: '1px solid #E7E1D7',
                    borderRadius: '16px',
                    overflow: 'hidden',
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 8px 24px rgba(31, 36, 33, 0.12)',
                    },
                  }}
                >
                  <CardMedia
                    component={doc.image?.firebaseURL ? 'img' : 'div'}
                    image={doc.image?.firebaseURL}
                    alt={doc.title}
                    sx={{
                      backgroundColor: '#FBF9F5',
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      width: '100%',
                      aspectRatio: '1 / 1',
                      flexShrink: 0,
                    }}
                  />
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: 'flex',
                      flexDirection: 'column',
                      p: 2,
                      minHeight: '120px',
                      '&:last-child': {
                        pb: 2,
                      },
                    }}
                  >
                    <Chip
                      label={doc.type === 'master' ? 'สูตรหลัก' : 'สูตรย่อย'}
                      size="small"
                      variant={doc.type === 'master' ? 'filled' : 'outlined'}
                      sx={{
                        textTransform: 'uppercase',
                        fontSize: '0.65rem',
                        fontWeight: 600,
                        height: '20px',
                        mb: 1.5,
                        alignSelf: 'flex-start',
                        borderRadius: '6px',
                        letterSpacing: '0.03em',
                      }}
                      color="primary"
                    />
                    <Link
                      variant="body1"
                      sx={{
                        color: '#1F2421',
                        fontWeight: 600,
                        fontSize: '0.95rem',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textDecoration: 'none',
                        '&:hover': {
                          color: 'primary.main',
                        },
                        transition: 'color 0.2s ease',
                      }}
                      href={`/recipes/${doc.id}`}
                      children={doc.title}
                    />
                  </CardContent>
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      borderRadius: '8px',
                      bgcolor: 'rgba(255, 255, 255, 0.9)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <IconButton
                      size="small"
                      children={<MoreVert fontSize="small" />}
                      onClick={(e) => setAnchor({ anchor: e.currentTarget, value: doc })}
                      sx={{
                        color: '#1F2421',
                        '&:hover': {
                          bgcolor: 'primary.light',
                          color: 'primary.main',
                        },
                      }}
                    />
                  </Box>
                  {doc.clients.length > 0 && (
                    <Box
                      sx={{
                        position: 'absolute',
                        top: 8,
                        left: 8,
                        borderRadius: '8px',
                        bgcolor: 'rgba(255, 255, 255, 0.9)',
                        backdropFilter: 'blur(8px)',
                        p: 0.5,
                      }}
                    >
                      <Clients>
                        {doc.clients.map((client) => (
                          <Avatar
                            key={client.id}
                            src={client.client?.image?.thumbnailURL}
                            sx={{
                              width: 28,
                              height: 28,
                              border: '2px solid #FFFFFF',
                              boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                            }}
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
        slotProps={{
          list: { dense: true, disablePadding: true },
          paper: {
            sx: {
              borderRadius: '12px',
              border: '1px solid #E7E1D7',
              boxShadow: '0 4px 12px rgba(31, 36, 33, 0.1)',
              mt: 1,
            },
          },
        }}
      >
        <ListItemButton
          LinkComponent={'a'}
          href={`/admin/collections/recipes/${anchor?.value.id}`}
          target="_blank"
          sx={{
            color: 'warning.main',
            '&:hover': {
              bgcolor: 'warning.light',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <EditIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Edit" />
        </ListItemButton>
        <ListItemButton
          sx={{
            color: 'error.main',
            '&:hover': {
              bgcolor: 'error.light',
            },
          }}
        >
          <ListItemIcon sx={{ color: 'inherit' }}>
            <DeleteIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Remove" />
        </ListItemButton>
      </Menu>
    </>
  )
}
