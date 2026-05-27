'use client'

import { Avatar, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { HideImage as HideImageIcon } from '@mui/icons-material'

export type TableRowData = {
  id: string
  name: string
  qty: number | string
  image?: string
  cost?: number | string
  totalCost?: number | string
  size: number | string
  price?: number | string
  link?: string
}
export const Table = ({ rows }: { rows: TableRowData[] }) => (
  <Box
    sx={{ height: 480 }}
    children={
      <DataGrid
        rows={rows}
        columns={[
          {
            field: 'image',
            headerName: ' ',
            width: 64,
            renderCell: ({ row }) =>
              row.image ? (
                <Box
                  sx={{
                    height: '100%',
                    aspectRatio: '1 / 1',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar
                    variant="square"
                    src={row.image}
                    sx={{ img: { objectFit: 'contain' } }}
                    children={<HideImageIcon />}
                  />
                </Box>
              ) : null,
          },
          {
            field: 'name',
            headerName: 'Ingredient',
            flex: 1,
            minWidth: 200,
            renderCell: ({ row, value }) =>
              row.link ? (
                <a href={row.link} children={value} />
              ) : (
                <Box sx={{ textTransform: 'capitalize' }} children={value} />
              ),
          },
          { field: 'qty', headerName: 'Qty (g/ml)', width: 100, align: 'right' },
          {
            field: 'cost',
            headerName: 'Cost (g/ml)',
            width: 100,
            align: 'right',
            renderCell: ({ row }) => Number(row.cost || 0).toFixed(2),
          },
          // { field: 'size', headerName: 'Size', width: 100 },
          // { field: 'price', headerName: 'Price', width: 100 },
          {
            field: 'totalCost',
            headerName: 'Total Cost',
            width: 100,
            align: 'right',
            renderCell: ({ row }) => Number(row.totalCost || 0).toFixed(2),
          },
        ]}
        disableRowSelectionOnClick
      />
    }
  />
)
