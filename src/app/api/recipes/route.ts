import configPromise from '@payload-config'
import { getPayload } from 'payload'
import { NextRequest } from 'next/server'

export const GET = async (request: NextRequest) => {
  const payload = await getPayload({
    config: configPromise,
  })

  const searchParams = request.nextUrl.searchParams
  const page = parseInt(searchParams.get('page') || '1')
  const limit = parseInt(searchParams.get('limit') || '20')
  const sort = searchParams.get('sort') || 'title'
  const search = searchParams.get('search') || ''

  try {
    const where: any = {}

    // ถ้ามี search query ให้ค้นหาใน title (case-insensitive)
    if (search) {
      where.or = [
        {
          title: {
            like: search.toLowerCase(),
          },
        },
        {
          title: {
            contains: search,
          },
        },
      ]
    }

    const result = await payload.find({
      collection: 'recipes',
      page,
      limit,
      sort,
      where,
    })

    return Response.json(result)
  } catch (error) {
    console.error('Error fetching recipes:', error)
    return Response.json({ error: 'Failed to fetch recipes' }, { status: 500 })
  }
}
