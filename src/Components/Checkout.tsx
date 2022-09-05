import { Box, Button, Grid, InputAdornment, TextField, Typography } from '@mui/material'
import { useContext } from 'react'
import { ProductContext, ProductContextType } from '../Context/ProductContext'

export default function Checkout() {
  const { productsCheckout } = useContext<ProductContextType>(ProductContext)

  console.log(productsCheckout)
  return (
    <Grid container display='flex' justifyContent='center'>
      <Grid display='flex' flexDirection='column' gap={2} m={6} maxWidth={'700px'}>
        <Grid xs={12} item>
          <Typography align='center' variant='h4' fontWeight={800}>
            Checkout
          </Typography>
        </Grid>
        <Grid xs={12} item display='flex' flexDirection='column' gap={2}>
          <Typography fontWeight={800}>Email</Typography>
          <TextField id='email' placeholder='john@example.com' variant='outlined' />
          <Typography fontWeight={800}>Card Information</Typography>
          <TextField
            id='email'
            placeholder='xxxx xxxx xxxx xxxx'
            variant='outlined'
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <Box component='img' src='visa.svg' sx={{ width: '20px' }} />
                  <Box component='img' ml={1} src='mastercard.svg' sx={{ width: '20px' }} />
                </InputAdornment>
              ),
            }}
          />

          <Grid container>
            <Grid xs={6} item>
              <TextField placeholder='MM/YY' id='email' variant='outlined' fullWidth />
            </Grid>
            <Grid xs={6} item>
              <TextField
                placeholder='CVC'
                id='email'
                variant='outlined'
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <Box component='img' src='cvc.png' sx={{ width: '20px' }} />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
          <Grid xs={12} item justifyContent='center' display='flex' mt={4}>
            <Button variant='contained' color='secondary'>
              Pay 55 BTH
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}
