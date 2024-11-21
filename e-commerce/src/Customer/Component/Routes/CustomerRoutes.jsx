import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Cart from '../Cart/Cart'
import Product from '../Product/Product'
import Navigation from '../Navigation/Navigation'
import ProductDetails from '../Productdetails/ProductDetails'
import Checkout from '../Checkout/Checkout'
import Order from '../Order/Order'
import Orderdetail from '../Order/Orderdetail'
import Charity from '../Charity/Charity'
import ContactForm from '../Contact/Contact'
// import Contact from '../Contact/Contact'
import Charityform from '../Charity/Charityform';
import Homepage from '../Pages/HomePage/Homepage'
import LoginPage from '../Login/loginpage'
import RegisterPage from '../Register/Register'

const CustomerRoutes = () => {
  return (
    <div>
        <div>
      <Navigation/>
        </div>
      <Routes>
        <Route path='/' element={<Homepage/>} ></Route>
        <Route path='/Cart' element={<Cart/>} ></Route>
        <Route path='/product' element={<Product/>} product={Product} ></Route>
        <Route path='/product/:productId' element={<ProductDetails/>} ></Route>
        <Route path='/Checkout' element={<Checkout/>} ></Route>
        <Route path='/account/order' element={<Order/>} ></Route>
        <Route path='/account/order/:Orderdetail' element={<Orderdetail />} ></Route>
        <Route path='/charity' element={<Charity />} ></Route>
        <Route path='/Contact' element={<ContactForm />} ></Route>
        <Route path='/charity/charityform' element={<Charityform/>} ></Route>
        <Route path='/login' element={<LoginPage/>} ></Route>
        <Route path='/register' element={<RegisterPage/>} ></Route>
        
        
      
    
    
    
          {/* <Order/> */}
          {/* <Orderdetail/> */}
      </Routes>
    </div>
  )
}

export default CustomerRoutes
