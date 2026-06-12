'use client'

import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material'
import { useState } from 'react'
import { usePreCon } from '../../(signed)/pre.con'

export class PopupValue {
  title: string = 'Popup'
  type: 'alert' | 'confirm' | 'prompt' | 'remove' = 'alert'
  message: string = ''
  onConfirm?: (value: string) => void
  onCancel?: () => void

  constructor(data?: Partial<PopupValue>) {
    Object.assign(this, data)
  }
}

export const Popup = () => {
  const { state, setState } = usePreCon()
  const [value, setValue] = useState('')

  const Actions = () => {
    switch (state.popup?.type) {
      case 'remove':
        return (
          <>
            <Button
              variant="contained"
              onClick={() => setState((s) => s.Set('popup', null))}
              children="Cancel"
              color="inherit"
            />
            <Button
              color="error"
              onClick={() => {
                state.popup?.onConfirm?.(value)
                setState((s) => s.Set('popup', null))
              }}
              children="Delete"
            />
          </>
        )
      default:
        return (
          <Button
            onClick={() => setState((s) => s.Set('popup', null))}
            color="inherit"
            children="Close"
          />
        )
    }
  }

  return (
    <Dialog fullWidth maxWidth="xs" open={Boolean(state.popup)}>
      <DialogTitle>{state.popup?.title}</DialogTitle>
      <DialogContent>{state.popup?.message}</DialogContent>
      <DialogActions>
        <Actions />
      </DialogActions>
    </Dialog>
  )
}
