import axios from 'axios'
import { Product, ProductsResponse } from '../Types/Product'

export class ProductHttpService {
  public static async getProducts(): Promise<Product[]> {
    const response = await axios.get<ProductsResponse>(
      'https://c8036bd8-ea01-4f47-9ff1-dbf8001a0500.mock.pstmn.io/products',
      {
        params: {
          requestId: '12344556',
        },
      },
    )
    return response.data.products
  }
}
