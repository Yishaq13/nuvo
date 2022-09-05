import ProductList from './Components/ProductList'
import { ProductContext } from './Context/ProductContext'
import './App.css'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Checkout from './Components/Checkout'
import { ProductsCheckout } from './Types/Product.d'
import { useState } from 'react'

function App() {
  const [productsCheckout, setProductsCheckout] = useState<ProductsCheckout[]>([])
  const value = { productsCheckout, setProductsCheckout }
  return (
    <ProductContext.Provider value={value}>
      <Router>
        <main className='App'>
          <Routes>
            <Route path='/' element={<ProductList />} />
            <Route path='/checkout' element={<Checkout />} />
          </Routes>
        </main>
      </Router>
    </ProductContext.Provider>
  )
}

export default App
