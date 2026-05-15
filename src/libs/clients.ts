import { ImageType } from './image'

export interface ClientType {
  id: number
  title: string
  image: ImageType | null
}

export class Client implements ClientType {
  id: number = 0
  title: string = ''
  image: ImageType | null = null
  createdAt: string = ''
  updatedAt: string = ''

  constructor(data?: Partial<ClientType>) {
    Object.assign(this, data)
  }
}
