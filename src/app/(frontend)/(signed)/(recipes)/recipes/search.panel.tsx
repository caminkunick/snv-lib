import { Close, Search } from '@mui/icons-material'
import { Box, IconButton, InputAdornment, TextField } from '@mui/material'
import { useEffect, useRef, useState } from 'react'

interface SearchPanelProps {
  onSearch: (query: string) => void
}

export const SearchIcon = ({ onSearch }: SearchPanelProps) => {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [])

  const handleSearch = (value: string) => {
    setQuery(value)
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      onSearch(value)
    }, 250)
  }

  const handleClear = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setQuery('')
    onSearch('')
    setOpen(false)
  }

  if (!open) {
    return (
      <IconButton
        onClick={() => setOpen(true)}
        sx={{
          color: '#1F2421',
          '&:hover': {
            bgcolor: 'primary.light',
          },
        }}
      >
        <Search fontSize="small" />
      </IconButton>
    )
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <TextField
        autoFocus
        size="small"
        placeholder="Search recipes..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        sx={{
          minWidth: { xs: '200px', sm: '300px' },
          '& .MuiOutlinedInput-root': {
            borderRadius: '12px',
            bgcolor: '#FBF9F5',
            '& fieldset': {
              borderColor: '#E7E1D7',
            },
            '&:hover fieldset': {
              borderColor: 'primary.main',
            },
            '&.Mui-focused fieldset': {
              borderColor: 'primary.main',
            },
          },
        }}
        slotProps={{
          input: {
            startAdornment: (
              <InputAdornment position="start">
                <Search fontSize="small" sx={{ color: '#5C635D' }} />
              </InputAdornment>
            ),
          },
        }}
      />
      <IconButton
        onClick={handleClear}
        sx={{
          color: '#1F2421',
          '&:hover': {
            bgcolor: 'primary.light',
          },
        }}
      >
        <Close fontSize="small" />
      </IconButton>
    </Box>
  )
}
