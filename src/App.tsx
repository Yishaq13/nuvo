import ProductList from './Components/ProductList/ProductList'
import { ProductContext, RequestIdContext } from './Context/ProductContext'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './Components/Checkout/Checkout'
import { ProductsCheckout } from './Types/Product.d'
import { useState } from 'react'
import SuccessPage from './Components/SuccessPage/Success'

function App() {
  const [productsCheckout, setProductsCheckout] = useState<ProductsCheckout[]>([])
  const [requestId, setRequestId] = useState<string>('')

  return (
    <ProductContext.Provider value={{ productsCheckout, setProductsCheckout }}>
      <RequestIdContext.Provider value={{ requestId, setRequestId }}>
        <Router>
          <main className='App'>
            <Routes>
              <Route path='/' element={<ProductList />} />
              <Route path='/checkout' element={<Checkout />} />
              <Route path='/thanks' element={<SuccessPage />} />
            </Routes>
          </main>
        </Router>
      </RequestIdContext.Provider>
    </ProductContext.Provider>
  )
}

export default App
