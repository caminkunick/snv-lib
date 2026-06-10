'use server'

import { getPayload } from 'payload'
import config from '@/payload.config'
import { ContentHeader } from '@/components/content.header'
import { Fab, List, Tooltip } from '@mui/material'
import { Add as AddIcon } from '@mui/icons-material'
import { Category } from '@/payload-types'
import { SnackFab } from '@/components/snack.fab'
import { EnhanceListItemButton } from './grid.cat'

const PageCategory = async () => {
  const payloadConfig = await config
  const payload = await getPayload({ config: payloadConfig })

  const docs = await payload
    .find({
      collection: 'categories',
      pagination: false,
      depth: 0,
    })
    .then((data) => data.docs)
    .catch(() => [] as Category[])

  return (
    <div>
      <ContentHeader label="Categories" breadcrumbs={[{ label: 'Categories' }]} />
      <List disablePadding>
        {docs
          .filter((doc) => !Boolean(doc.parent))
          .map((doc) => (
            <EnhanceListItemButton doc={doc} docs={docs} key={doc.id} />
          ))}
      </List>
      <SnackFab>
        <Tooltip title="Create Category" placement="left">
          <Fab
            children={<AddIcon />}
            color="success"
            LinkComponent="a"
            href="/admin/collections/categories/create"
            target="_blank"
          />
        </Tooltip>
      </SnackFab>
    </div>
  )
}

export default PageCategory
