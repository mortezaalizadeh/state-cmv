import React from 'react'
import { Input } from '../../../chromaComponents'

export const DatePickerWrapper = React.forwardRef((props: any, ref: any) => (
  <Input
    id={Math.floor(Math.random() * 100000 + 1).toString()}
    error={!!props.error}
    placeholder="DD/MM/YYYY"
    size={2}
    value={props.value}
    onClick={props.onClick}
  />
))
