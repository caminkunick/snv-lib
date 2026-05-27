import { Box, Breadcrumbs, Chip, Link, Typography } from '@mui/material'
import { ReactNode } from 'react'

export type ContentHeaderProps = {
  label?: ReactNode
  actions?: ReactNode
  breadcrumbs?: { label: ReactNode; href?: string }[]
}
export const ContentHeader = (props: ContentHeaderProps) => {
  return (
    <Box sx={{ display: 'flex', mb: 4 }}>
      <Box>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {props.label}
        </Typography>
        <Breadcrumbs>
          <Chip label="Home" size="small" component="a" href="/" />
          {props.breadcrumbs?.map((breadcrumb, index) =>
            breadcrumb.href ? (
              <Chip
                key={index}
                label={breadcrumb.label}
                size="small"
                component="a"
                href={breadcrumb.href}
              />
            ) : (
              <Typography variant="body2" color="textSecondary" key={index}>
                {breadcrumb.label}
              </Typography>
            ),
          )}
        </Breadcrumbs>
      </Box>
      <Box sx={{ flexGrow: 1 }} />
      <Box>{props.actions}</Box>
    </Box>
  )
}
