import { createContext, useContext } from 'react'
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

export type RequestContextType = {
  requestId: string
  setRequestId: (id: string) => void
}
export const RequestIdContext = createContext<RequestContextType>({
  requestId: '',
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  setRequestId: () => {},
})

export const getTotalQuantity = (): number => {
  const products = useContext(ProductContext)
  if (products === undefined) {
    return 0
  }
  return products.productsCheckout.reduce(
    (totalCount: number, item: ProductsCheckout) => totalCount + item.quantity,
    0,
  )
}
