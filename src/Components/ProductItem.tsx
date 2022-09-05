import { Avatar, Box, Grid, Typography } from '@mui/material'
import { Product } from '../Types/Product.d'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { useContext, useEffect, useState } from 'react'
import { ProductContext, ProductContextType } from '../Context/ProductContext'

interface ProductProps {
  product: Product
}

export default function ProductItem(props: ProductProps) {
  const avatarStyle = {
    backgroundColor: 'white',
    border: '2px solid blue',
    boxShadow: 20,
    width: 56,
    height: 56,
  }
  const [quantity, setQuantity] = useState<number>(0)
  const { productsCheckout, setProductsCheckout } = useContext<ProductContextType>(ProductContext)

  useEffect(() => {
    setProductsCheckout([
      ...productsCheckout.filter((item) => item.product.id !== props.product.id),
      { product: props.product, quantity: quantity },
    ])
  }, [quantity])

  return (
    <Grid item xs={4} display='flex' flexDirection='row' justifyContent='center' mb={4}>
      <Box display='flex' flexDirection='column' alignItems='center'>
        <Avatar sx={avatarStyle} alt={props.product.name} />

        <Typography variant='body1' fontWeight={800}>
          {props.product.name}
        </Typography>

        <Grid display='flex' flexDirection='row' gap={1}>
          <Typography color='primary'>{props.product.price}</Typography>
          <Typography color='primary'>{props.product.currency}</Typography>
        </Grid>

        <Grid display='flex' flexDirection='row' gap={1}>
          <span
            onClick={() => setQuantity((prevState) => prevState + 1)}
            style={{ cursor: 'Pointer' }}
          >
            <AddBoxOutlinedIcon color='primary'></AddBoxOutlinedIcon>
          </span>
          <Typography> {quantity}</Typography>
          <span
            onClick={() => setQuantity((prevState) => prevState - 1)}
            style={{ cursor: 'Pointer' }}
          >
            <IndeterminateCheckBoxOutlinedIcon color='primary'></IndeterminateCheckBoxOutlinedIcon>
          </span>
        </Grid>
        <Typography color='text.secondary' variant='body1'>
          quantity
        </Typography>
      </Box>
    </Grid>
  )
}
