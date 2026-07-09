'use client'

import {
  Avatar,
  Box,
  TableContainer,
  Table as MuiTable,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Link,
} from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import { HideImage as HideImageIcon } from '@mui/icons-material'

const maxFixed = (value?: string | number, digit: number = 2) =>
  new Intl.NumberFormat(undefined, {
    maximumFractionDigits: 2,
  }).format(Number(value || 0))

export type TableRowData = {
  id: string
  name: string
  qty: number | string
  image?: string
  cost?: number | string
  totalCost?: number | string
  size?: number | string
  price?: number | string
  link?: string
}
export const Table = ({
  rows,
  snvSum,
  total,
}: {
  rows: TableRowData[]
  snvSum: number
  total: number
}) => (
  <>
    <TableContainer>
      <MuiTable
        sx={{
          '& td, & th': { borderColor: 'divider' },
        }}
      >
        <TableHead>
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell sx={{ width: 56 }} />
            <TableCell
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 12,
                letterSpacing: '0.05em',
                color: 'text.secondary',
              }}
            >
              Ingredient
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 12,
                letterSpacing: '0.05em',
                color: 'text.secondary',
              }}
            >
              Qty
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 12,
                letterSpacing: '0.05em',
                color: 'text.secondary',
              }}
            >
              Cost
            </TableCell>
            <TableCell
              align="right"
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                fontSize: 12,
                letterSpacing: '0.05em',
                color: 'text.secondary',
              }}
            >
              Total
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row, index) => (
            <TableRow
              key={index}
              sx={{
                transition: 'background-color 0.15s',
                '&:hover': { bgcolor: 'action.hover' },
                '&:last-of-type td': { borderBottom: 'none' },
              }}
            >
              <TableCell>
                <Avatar
                  variant="rounded"
                  src={row.image}
                  sx={{
                    width: 40,
                    height: 40,
                    bgcolor: 'action.selected',
                    color: 'text.disabled',
                    img: { objectFit: 'contain' },
                  }}
                >
                  <HideImageIcon fontSize="small" />
                </Avatar>
              </TableCell>
              <TableCell sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
                {row.link ? (
                  <Link href={row.link} target="_blank" underline="hover">
                    {row.name}
                  </Link>
                ) : (
                  row.name
                )}
              </TableCell>
              <TableCell align="right" sx={{ whiteSpace: 'nowrap', color: 'text.secondary' }}>
                {row.qty}
              </TableCell>
              <TableCell align="right" sx={{ color: 'text.secondary' }}>
                {maxFixed(row.cost)}
              </TableCell>
              <TableCell align="right" sx={{ fontWeight: 600 }}>
                {maxFixed(row.totalCost)}
              </TableCell>
            </TableRow>
          ))}
          <TableRow sx={{ bgcolor: 'action.hover' }}>
            <TableCell colSpan={4} sx={{ fontWeight: 500, color: 'text.secondary' }}>
              Only Synova Products
            </TableCell>
            <TableCell align="right" sx={{ fontSize: 20, fontWeight: 700 }}>
              {maxFixed(snvSum)}
            </TableCell>
          </TableRow>
          <TableRow sx={{ bgcolor: 'primary.main', '& td': { borderBottom: 'none' } }}>
            <TableCell
              colSpan={4}
              sx={{
                fontWeight: 700,
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
                color: 'primary.contrastText',
              }}
            >
              Total
            </TableCell>
            <TableCell
              align="right"
              sx={{ fontSize: 26, fontWeight: 800, color: 'primary.contrastText' }}
            >
              {maxFixed(total)}
            </TableCell>
          </TableRow>
        </TableBody>
      </MuiTable>
    </TableContainer>
    {/* <Box
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
    /> */}
  </>
)
