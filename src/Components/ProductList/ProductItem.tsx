import { Avatar, Box, Grid, Typography } from '@mui/material'
import { Product } from '../../Types/Product'
import IndeterminateCheckBoxOutlinedIcon from '@mui/icons-material/IndeterminateCheckBoxOutlined'
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined'
import { useContext, useEffect, useState } from 'react'
import { ProductContext, ProductContextType } from '../../Context/ProductContext'
import theme from '../../theme'

interface ProductProps {
  product: Product
}

export default function ProductItem(props: ProductProps) {
  const [quantity, setQuantity] = useState<number>(0)
  const { productsCheckout, setProductsCheckout } = useContext<ProductContextType>(ProductContext)

  useEffect(() => {
    setProductsCheckout([
      ...productsCheckout.filter(
        (item) => item.product.id !== props.product.id && item.quantity > 0,
      ),
      { product: props.product, quantity: quantity },
    ])
  }, [quantity])

  return (
    <Grid
      item
      display='flex'
      flexDirection='column'
      alignItems='center'
      width='69px'
      mb={4}
      xs={4}
      sx={{
        [theme.breakpoints.down('sm')]: {
          maxWidth: '100%',
          minWidth: '100%',
        },
      }}
    >
      <Avatar
        alt={props.product.name}
        sx={{
          backgroundColor: 'white',
          border: '4px solid #6A52FF',
          width: 61,
          height: 61,
        }}
      />
      <Typography variant='body2' fontWeight={800}>
        {props.product.name}
      </Typography>

      <Grid display='flex' flexDirection='row' gap={1}>
        <Typography color='primary' variant='caption'>
          {props.product.price}
        </Typography>
        <Typography color='primary' variant='caption'>
          {props.product.currency}
        </Typography>
      </Grid>

      <Grid display='flex' flexDirection='row' gap={1}>
        <Box
          onClick={() => setQuantity((prevState) => prevState + 1)}
          style={{ cursor: 'Pointer' }}
        >
          <AddBoxOutlinedIcon color='primary'></AddBoxOutlinedIcon>
        </Box>
        <Typography variant='body2'> {quantity}</Typography>
        <Box
          onClick={() => setQuantity((prevState) => Math.max(prevState - 1, 0))}
          style={{ cursor: 'Pointer' }}
        >
          <IndeterminateCheckBoxOutlinedIcon color='primary'></IndeterminateCheckBoxOutlinedIcon>
        </Box>
      </Grid>
      <Typography color='text.secondary' variant='caption'>
        quantity
      </Typography>
    </Grid>
  )
}
