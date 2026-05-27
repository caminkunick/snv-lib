import { ImageType } from './image'
import { Product } from './products'

export class Ingredient {
  id: string = ''
  product: Product | null = null
  quantity: string = '0'
  unit: string = 'g'

  constructor(data?: Partial<Ingredient>) {
    Object.assign(this, data)
    this.product = this.product ? new Product(this.product) : null
  }
}

export interface OtherIngredient {
  id: string
  subIngredient: SubIngredient
  quantity: string
  unit: string
}

export interface SubIngredient {
  id: number
  title: string
  cost: number
  image: ImageType | null
  updatedAt: string
  createdAt: string
  unit: string
}
