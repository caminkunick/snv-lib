export class Product {
  firebaseId: string = ''
  sku: { id?: string; value: string }[] = []
  name: string = ''
  name_th: string = ''
  unit: { id?: string; value: string }[] = []
  price: { id?: string; value: number }[] = []
  cat: string = ''
  tag: string = ''
  image: string = ''
  visibility: 'public' | 'private' | 'trash' | null = 'public'
  size: string = ''
  color_emarket: string = ''
  desc_emarket: string = ''
  slogan: string = ''
  image_fruit: string = ''
  emkt_offsetLeft: string = '0'
  offset_thumb_size: string = '0'
  color_bg: string = ''
  color_primary: string = ''
  color_secondary: string = ''
  emkt_scale: string = '1'
  emkt_size: string = ''
  refrigerate_time: string = '0'
  offset_thumb_top: string = '0'
  freezing_time: string = '0'
  instruction: string = ''
  refrigerate_temp: string = '0'
  emkt_flavor: string = ''
  emkt_fruit_scale: string = '1'
  image_emarket: string = ''
  image_app: string = ''
  emkt_weight: string = '0'
  catalog: boolean = false
  servingsPerUnit: string = '0'
  emkt_promo: string = ''
  desc_th: string = ''
  ex_weight: string = '0'
  ex_qty: string = '0'
  desc_en2: string = ''

  constructor(data?: Partial<Product | Record<'sku' | 'unit' | 'price', string>>) {
    if (data) {
      data = Object.fromEntries(
        Object.entries(data).filter(([key]) => Product.allowedKeys.includes(key)),
      )
      Object.assign(this, data)
    }
    this.sku = this.sku.map((item) => {
      if (typeof item === 'string') {
        return { value: item }
      }
      return item
    })
    this.unit = this.unit.map((item) => {
      if (typeof item === 'string') {
        return { value: item }
      }
      return item
    })
    this.price = this.price.map((item) => {
      if (typeof item === 'string' || typeof item === 'number') {
        return { value: Number(item) }
      }
      return item
    })
  }

  Get() {
    return {
      cost: (): number => {
        const price = Number(this.price[0]?.value || 0)
        if (this.cat === 'syrups') {
          return price / 830
        }
        return 0
      },
      totalCost: (qty: number): number => {
        return this.Get().cost() * qty
      },
    }
  }

  static allowedKeys = [
    'firebaseId',
    'sku',
    'name',
    'name_th',
    'unit',
    'price',
    'cat',
    'tag',
    'image',
    'visibility',
    'size',
    'color_emarket',
    'desc_emarket',
    'slogan',
    'image_fruit',
    'emkt_offsetLeft',
    'offset_thumb_size',
    'color_bg',
    'color_primary',
    'color_secondary',
    'emkt_scale',
    'freezing_temp',
    'emkt_size',
    'refrigerate_time',
    'offset_thumb_top',
    'freezing_time',
    'instruction',
    'refrigerate_temp',
    'emkt_flavor',
    'emkt_fruit_scale',
    'image_emarket',
    'image_app',
    'emkt_weight',
    'catalog',
    'servingsPerUnit',
    'emkt_promo',
    'desc_th',
    'ex_weight',
    'ex_qty',
    'desc_en2',
  ]

  static arrayFields = ['sku', 'unit', 'price']
}
