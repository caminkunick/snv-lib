'use client'

export default function UploadImageCell({ cellData }: { cellData?: string | null }) {
  if (!cellData) return <span>-</span>
  //   get the image URL from the cellData, which is in the format "collection:id"
  const imageUrl = `/api/media/thumbnail/${cellData}`
  return (
    <img
      src={imageUrl}
      alt=""
      style={{ width: 48, height: 48, objectFit: 'contain', borderRadius: 4 }}
    />
  )
}
