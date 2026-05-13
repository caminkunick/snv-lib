'use client'

export default function ImageCell({ cellData }: { cellData?: string }) {
  if (!cellData) return <span>-</span>
  return (
    <img
      src={cellData}
      alt=""
      style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 4 }}
    />
  )
}
