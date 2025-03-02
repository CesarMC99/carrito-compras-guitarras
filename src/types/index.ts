export type Guitars = {
  id: number
  name: string
  image: string
  description: string
  price: number
}

export type CartItem = Guitars &{
  quantity: number
}
