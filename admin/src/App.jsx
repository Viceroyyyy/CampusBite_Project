import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add/Add'
import List from './pages/List/List'
import Orders from './pages/Orders/Orders'
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const url = 'http://localhost:4000';

  return (
    <div>
      <ToastContainer />
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/add" element={<Add url={url} />} />
          <Route path="/list" element={<List url={url} />} />
          <Route path="/orders" element={<Orders url={url} />} />
          
        </Routes>
      </div>
    </div>
  )
}
/* Key Differences between Link and NavLink tag of react-router-dom:

	•	Styling: Link is just a basic anchor tag for navigation, while NavLink allows you to automatically apply active styles when a route is active.
	•	Use Case: Link is suitable for regular navigation, and NavLink is best for menus where highlighting the active link is desired. */

export default App
