import { Grid, Typography } from '@mui/material'
import { useContext } from 'react'
import { ProductContext, ProductContextType } from '../../Context/ProductContext'
import SuccessProductItem from './SuccessProductItem'
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined'

export default function SuccessPage() {
  const { productsCheckout } = useContext<ProductContextType>(ProductContext)

  return (
    <Grid container display='flex' justifyContent='center'>
      <Grid display='flex' flexDirection='column' gap={2} mt={16} maxWidth={'700px'}>
        <Grid xs={12} item>
          <Typography align='center' variant='h4' fontWeight={800}>
            Success
          </Typography>
        </Grid>
        <Grid xs={12} item alignItems='center' display='flex' flexDirection='column'>
          <CheckCircleOutlineOutlinedIcon fontSize='large' color='success' />
        </Grid>
        <Grid xs={12} item mb={4}>
          <Typography align='center' variant='body2' color='text.secondary'>
            Thank you for shopping with us
          </Typography>
        </Grid>
        {productsCheckout.map((holder) => (
          <Grid key={holder.product.id} xs={12} item>
            <SuccessProductItem holder={holder} />
          </Grid>
        ))}
      </Grid>
    </Grid>
  )
}
