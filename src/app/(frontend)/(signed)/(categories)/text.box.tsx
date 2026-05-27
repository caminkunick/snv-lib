'use client'

import { RichText } from '@payloadcms/richtext-lexical/react'

export const TextBox = (props: { content: any }) => {
  // @ts-ignore
  return <RichText content={props.content} />
}
