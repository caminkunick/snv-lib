import { ChevronLeft } from '@mui/icons-material'
import { Button, Typography } from '@mui/material'

export const NotFound = (props: { category?: string; message?: string; back?: string }) => {
  return (
    <div style={{ textAlign: 'center', padding: '2rem' }}>
      <Typography
        variant="h4"
        color="error"
        gutterBottom
        sx={{
          textTransform: 'uppercase',
          fontWeight: 'bold',
        }}
      >
        {props.category ? `${props.category} Not Found` : 'Page Not Found'}
      </Typography>
      <Typography variant="body1">
        {props.message || 'The page you are looking for does not exist.'}
      </Typography>
      {props.back && (
        <Button
          variant="outlined"
          href={props.back}
          sx={{ marginTop: '1rem' }}
          startIcon={<ChevronLeft />}
        >
          Go Back
        </Button>
      )}
    </div>
  )
}
