import { Product } from './products'

export interface Ingredient {
  id: string
  product: Product
  quantity: string
}

export interface OtherIngredient {
  id: string
  subIngredient: SubIngredient
  quantity: string
}

export interface SubIngredient {
  id: number
  title: string
  cost: number
  image: any
  updatedAt: string
  createdAt: string
}
