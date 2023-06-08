
import './App.scss'
import { useState } from 'react'
import { Header } from './Components/Header/Header'
import { DataProvider } from './context/DataProvider'
import { Home } from './pages/Home/Home'
import { Login } from './pages/Login/Login'
import {Routes,Route,Outlet,Navigate} from 'react-router-dom'
import { CreateBlog } from './pages/CreateBlog/CreateBlog'

const PrivateRoute=({isAuthenticated,...props})=>{
  return isAuthenticated?<>
    <Header/>
    <Outlet/>
  </>:
  <Navigate replace to='/login'/>
}

function App() {
  const [isAuthenticated,isUserAuthenticated]=useState(false)


  return (
    <>
    <DataProvider>
    <Routes>
    <Route path='/login' element={<Login isUserAuthenticated={isUserAuthenticated} />} />
            
            <Route path='/' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/' element={<Home />} />
            </Route>
            <Route path='/create' element={<PrivateRoute isAuthenticated={isAuthenticated} />} >
              <Route path='/create' element={<CreateBlog />} />
            </Route>
     
     </Routes>
     </DataProvider>
    </>
  )
}

export default App
