import {
  Alert,
  Box,
  Button,
  Grid,
  InputAdornment,
  Snackbar,
  TextField,
  Typography,
} from '@mui/material'
import { useContext, useState } from 'react'
import {
  ProductContext,
  ProductContextType,
  RequestContextType,
  RequestIdContext,
} from '../../Context/ProductContext'
import CheckoutItem from './CheckoutItem'
import { ProductHttpService } from '../../Http/Products.http.service'
import { Payment, PaymentProduct, ProductsCheckout } from '../../Types/Product'
import { useFormik } from 'formik'
import * as yup from 'yup'
import valid from 'card-validator'
import { useNavigate } from 'react-router-dom'
import theme from '../../theme'

const validationSchema = yup.object({
  email: yup.string().email('Enter a valid email').required('Email is required'),

  cardCvc: yup
    .string()
    .required('CVC is required')
    .test('test-cvv', 'CVC is invalid', (value) => valid.cvv(value).isValid),

  cardNumber: yup
    .string()
    .required('Card number is required')
    .test(
      'test-number', // this is used internally by yup
      'Credit Card number is invalid', // validation message
      (value) => valid.number(value).isValid,
    ),

  cardDate: yup
    .string()
    .required('Expiration date is required')
    .test(
      'test-expiration',
      'Expiration date is invalid',
      (value) => valid.expirationDate(value).isValid,
    ),
})

export default function Checkout() {
  const navigate = useNavigate()
  const { productsCheckout } = useContext<ProductContextType>(ProductContext)
  const { requestId } = useContext<RequestContextType>(RequestIdContext)
  const [displayResponse, setDisplayResponse] = useState<boolean>()

  const formik = useFormik({
    initialValues: {
      email: '',
      cardCvc: '',
      cardNumber: '',
      cardDate: '',
    },
    validationSchema: validationSchema,

    onSubmit: async () => {
      await handleCheckout()
    },
  })

  const handleCheckout = async () => {
    const products: PaymentProduct[] = productsCheckout.map((item) => {
      return { id: item.product.id, quantity: item.quantity } as PaymentProduct
    })
    const checkout: Payment = {
      requestId: requestId,
      paymentInfo: {
        email: formik.values.email,
        cardInfo: {
          cardNo: formik.values.cardNumber,
          cardExpiryDate: formik.values.cardDate,
          cardCVV: formik.values.cardCvc,
        },
      },
      products: products,
    }

    ProductHttpService.buyProducts(checkout)
      .then(() => {
        navigate('/thanks')
      })
      .catch(() => {
        setDisplayResponse(true)
      })
  }

  const getTotalCost = (): number => {
    return productsCheckout.reduce(
      (totalCost: number, item: ProductsCheckout) => totalCost + item.product.price * item.quantity,
      0,
    )
  }

  return (
    <Grid container display='flex' justifyContent='center'>
      <Grid
        display='flex'
        flexDirection='column'
        gap={2}
        maxWidth={'700px'}
        m={6}
        sx={{
          [theme.breakpoints.down('sm')]: {
            maxWidth: 'unset',
          },
        }}
      >
        <Grid xs={12} item mb={4}>
          <Typography align='center' variant='h4' fontWeight={800}>
            Checkout
          </Typography>
        </Grid>
        {productsCheckout.map((holder) => (
          <Grid key={holder.product.id} xs={12} item>
            <CheckoutItem holder={holder} />
          </Grid>
        ))}
        <form onSubmit={formik.handleSubmit} style={{ maxWidth: '450px' }}>
          <Grid xs={12} item display='flex' flexDirection='column' gap={2} mt={4}>
            <Typography fontWeight={800}>Email</Typography>
            <TextField
              id='email'
              placeholder='john@example.com'
              variant='outlined'
              value={formik.values.email}
              onChange={formik.handleChange}
              error={formik.touched.email && Boolean(formik.errors.email)}
              helperText={formik.touched.email && formik.errors.email}
            />
            <Typography fontWeight={800}>Card Information</Typography>
            <TextField
              id='cardNumber'
              placeholder='xxxx xxxx xxxx xxxx'
              variant='outlined'
              value={formik.values.cardNumber}
              onChange={formik.handleChange}
              error={formik.touched.cardNumber && Boolean(formik.errors.cardNumber)}
              helperText={formik.touched.cardNumber && formik.errors.cardNumber}
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
                <TextField
                  placeholder='MM/YY'
                  id='cardDate'
                  variant='outlined'
                  value={formik.values.cardDate}
                  onChange={formik.handleChange}
                  error={formik.touched.cardDate && Boolean(formik.errors.cardDate)}
                  helperText={formik.touched.cardDate && formik.errors.cardDate}
                  fullWidth
                  inputProps={{
                    maxLength: 5,
                  }}
                />
              </Grid>
              <Grid xs={6} item>
                <TextField
                  placeholder='CVC'
                  id='cardCvc'
                  variant='outlined'
                  value={formik.values.cardCvc}
                  onChange={formik.handleChange}
                  error={formik.touched.cardCvc && Boolean(formik.errors.cardCvc)}
                  helperText={formik.touched.cardCvc && formik.errors.cardCvc}
                  fullWidth
                  inputProps={{
                    maxLength: 3,
                  }}
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
              <Button variant='contained' color='secondary' type='submit'>
                Pay {getTotalCost()} TBH
              </Button>
            </Grid>
          </Grid>
        </form>
      </Grid>

      <Snackbar
        open={displayResponse}
        autoHideDuration={6000}
        onClose={() => setDisplayResponse(false)}
      >
        <Alert severity='error'>Something went wrong. Please try again.</Alert>
      </Snackbar>
    </Grid>
  )
}
