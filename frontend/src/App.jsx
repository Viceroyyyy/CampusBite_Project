import React from 'react'
import NavBar from './components/NavBar/NavBar'
import { Link,Routes,Route } from 'react-router-dom'
const App = () => {
  return (
    <div className='app'>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}></Route>
        <Route path="/cart" element={<Cart/>}></Route>
        <Route path="/order" element={<PlaceOrder/>}></Route>
        {/* <Route path="/" element={<Home/>}></Route> */}
      </Routes>
    </div>
  )
}  

export default App