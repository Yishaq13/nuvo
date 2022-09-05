import { createContext } from 'react'
import { ProductsCheckout } from '../Types/Product'

export type ProductContextType = {
  productsCheckout: ProductsCheckout[]
  setProductsCheckout: (products: ProductsCheckout[]) => void
}
export const ProductContext = createContext<ProductContextType>({
  productsCheckout: [],
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setProductsCheckout: () => {},
})
