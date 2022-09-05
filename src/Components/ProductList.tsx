import { Product } from '../Types/Product.d'
import ProductItem from '../Components/ProductItem'
import { useEffect, useState } from 'react'
import { ProductHttpService } from './../Http/Products.http.service'
import Box from '@mui/material/Box'
import Grid from '@mui/material/Grid'
import { Fab, Typography } from '@mui/material'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined'
import { NavLink } from 'react-router-dom'

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([])
  useEffect(() => {
    ProductHttpService.getProducts().then((data: Product[]) => {
      setProducts(data)
    })
  })

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
      <Box display='flex' justifyContent='center' flexDirection='row' mt={12}>
        <NavLink to='/checkout'>
          <Fab>
            <ShoppingCartOutlinedIcon color='primary' />
          </Fab>
        </NavLink>
      </Box>
    </Box>
  )
}
