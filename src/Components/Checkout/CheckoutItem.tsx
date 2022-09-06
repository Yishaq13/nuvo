import { Avatar, Grid, Typography } from '@mui/material'
import { ProductsCheckout } from '../../Types/Product'

interface ProductProps {
  holder: ProductsCheckout
}

export default function CheckoutItem(props: ProductProps) {
  return (
    <Grid container display='flex' flexDirection='row'>
      <Grid item xs={2}>
        <Avatar
          alt={props.holder.product.name}
          sx={{
            backgroundColor: 'white',
            border: '3px solid #6A52FF',
            width: 30,
            height: 30,
          }}
        />
      </Grid>
      <Grid item xs={10}>
        <Grid item display='flex' flexDirection='row' justifyContent='space-between'>
          <Typography variant='body2' fontWeight={800}>
            {props.holder.product.name}
          </Typography>
          <Typography color='primary' variant='body2' fontWeight={800}>
            {(props.holder.product.price * props.holder.quantity).toFixed(1)} TBH
          </Typography>
        </Grid>

        <Grid display='flex' flexDirection='row' justifyContent='space-between'>
          <Typography color='primary' variant='caption'>
            {props.holder.product.price} THB
          </Typography>
          <Typography color='text.secondary' variant='caption'>
            qty: {props.holder.quantity}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}
