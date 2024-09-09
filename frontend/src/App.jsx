import React from 'react'
import NavBar from './components/NavBar/NavBar'
import { Link,Routes,Route } from 'react-router-dom'
import Home from './pages/Home/Home'
import Cart from './pages/Cart/Cart'
import PlaceOrder from './pages/PlaceOrder/PlaceOrder'
import Footer from './components/Footer/Footer'
const App = () => {

  return (

    <>

    <div className='app'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/order" element={<PlaceOrder/>}></Route>
        {/* <Route path="/" element={<Home/>}></Route> */}
      </Routes>
    </div>
    <Footer />

    </>
    
  )
}  

export default App