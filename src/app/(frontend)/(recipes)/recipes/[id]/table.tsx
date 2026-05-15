'use client'

import { Avatar, Box } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'

export type TableRowData = {
  id: string
  name: string
  qty: number | string
  image?: string
  cost?: number
  totalCost?: number
  size: number | string
  price?: number
}
export const Table = ({ rows }: { rows: TableRowData[] }) => (
  <Box
    sx={{ height: 400 }}
    children={
      <DataGrid
        rows={rows}
        columns={[
          {
            field: 'image',
            headerName: ' ',
            width: 64,
            renderCell: ({ row }) => (
              <Avatar variant="square" src={row.image} sx={{ img: { objectFit: 'contain' } }} />
            ),
          },
          { field: 'name', headerName: 'Ingredient', flex: 1, minWidth: 200 },
          { field: 'qty', headerName: 'Quantity', width: 150 },
          { field: 'cost', headerName: 'Cost', width: 100 },
          { field: 'size', headerName: 'Size', width: 100 },
          { field: 'price', headerName: 'Price', width: 100 },
          { field: 'totalCost', headerName: 'Total Cost', width: 120 },
        ]}
      />
    }
  />
)
