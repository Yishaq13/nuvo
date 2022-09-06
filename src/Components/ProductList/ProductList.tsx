import { Product, ProductsResponse } from '../../Types/Product'
import ProductItem from './ProductItem'
import { useContext, useEffect, useState } from 'react'
import { ProductHttpService } from '../../Http/Products.http.service'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Badge, Button, Typography } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { NavLink } from 'react-router-dom'
import {
  getTotalQuantity,
  RequestContextType,
  RequestIdContext,
} from '../../Context/ProductContext'

export default function ProductList() {
  const { setRequestId } = useContext<RequestContextType>(RequestIdContext)
  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    ProductHttpService.getProducts().then((data: ProductsResponse) => {
      setProducts(data.products)
      setRequestId(data.requestId)
    })
  }, [])

  return (
    <Box display='flex' justifyContent='center' flexDirection='column' height='100%'>
      <Typography align='center' variant='h4' fontWeight={800} mt={8}>
        Products
      </Typography>
      <Box display='flex' justifyContent='center' flexDirection='row' mt={12}>
        <Grid xs={6} container item>
          {products.map((product, index) => (
            <ProductItem key={index} product={product} />
          ))}
        </Grid>
      </Box>
      <Box
        display='flex'
        justifyContent='center'
        flexDirection='column'
        mt={12}
        alignItems='center'
      >
        <NavLink to='/checkout'>
          <Badge badgeContent={getTotalQuantity()} color='error'>
            <Button
              disabled={getTotalQuantity() == 0}
              color='primary'
              variant='contained'
              sx={{ borderRadius: '50%', minWidth: '25px', padding: 1 }}
            >
              <ShoppingCartOutlinedIcon fontSize='small' />
            </Button>
          </Badge>
        </NavLink>
        <Typography align='center' variant='body2' mt={1}>
          Checkout
        </Typography>
      </Box>
    </Box>
  )
}
