import { getPayload } from 'payload'
import config from '@/payload.config'
import { ContentHeader } from '@/components/content.header'
import { Fab, Snackbar, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { Category } from '@/payload-types'
import { GridCat } from './grid.cat'

const PageCategory = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const docs = await payload
    .find({
      collection: 'categories',
      where: { parent: { equals: null } },
      pagination: false,
    })
    .then((data) => data.docs)
    .catch(() => [] as Category[])

  return (
    <div>
      <ContentHeader label="Categories" breadcrumbs={[{ label: 'Categories' }]} />
      <GridCat docs={docs} />
      <Snackbar open anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}>
        <Tooltip title="Create Category" placement="left">
          <Fab
            children={<AddIcon />}
            color="success"
            LinkComponent="a"
            href="/admin/collections/categories/create"
            target="_blank"
          />
        </Tooltip>
      </Snackbar>
    </div>
  )
}

export default PageCategory
