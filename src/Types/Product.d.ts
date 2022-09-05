export interface Product {
  id: number
  name: string
  price: number
  currency: string
}

export interface ProductsResponse {
  requestId: string
  products: Product[]
}

export interface ProductsCheckout {
  quantity: number
  product: Product
}
