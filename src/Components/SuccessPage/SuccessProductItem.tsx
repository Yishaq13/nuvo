import { Avatar, Grid, Typography } from '@mui/material'
import { ProductsCheckout } from '../../Types/Product'

interface ProductProps {
  holder: ProductsCheckout
}

export default function SuccessProductItem(props: ProductProps) {
  return (
    <Grid container display='flex' flexDirection='row' alignItems='center'>
      <Grid item xs={4}>
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

      <Grid xs={8} item display='flex' flexDirection='row' justifyContent='space-between'>
        <Typography variant='body2' fontWeight={800}>
          {props.holder.product.name}
        </Typography>
        <Typography color='primary' variant='body2' fontWeight={800}>
          qty: {props.holder.quantity}
        </Typography>
      </Grid>
    </Grid>
  )
}
