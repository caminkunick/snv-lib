import { ImageType } from './image'
import { SerializedEditor } from '@payloadcms/richtext-lexical/lexical'
import { Ingredient, OtherIngredient } from './ingredient'
import { Client } from './clients'

export interface RecipeType {
  id: number
  title: string
  title_th: string
  image: ImageType | null
  method: SerializedEditor | null
  type: string
  ingredients: Ingredient[]
  otherIngredients: OtherIngredient[]
  subRecipes: any[]
  updatedAt: string
  createdAt: string
}

export class Recipe implements RecipeType {
  id: number = 0
  title: string = ''
  title_th: string = ''
  image: ImageType | null = null
  method: SerializedEditor | null = null
  type: string = ''
  ingredients: Ingredient[] = []
  otherIngredients: OtherIngredient[] = []
  subRecipes: any[] = []
  clients: { id: string; client: Client }[] = []
  updatedAt: string = ''
  createdAt: string = ''

  constructor(data?: Partial<RecipeType>) {
    Object.assign(this, data)
    this.clients = this.clients.map((client) => ({
      id: client.id,
      client: new Client(client.client),
    }))
  }
}
