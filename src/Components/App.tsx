import React,{useState,useEffect} from 'react'
import {Routes, Route} from 'react-router-dom'
import {Login} from '../Pages/Login'
import {Register} from '../Pages/Register'
import {Home} from '../Pages/Home'
import './App.css'
import {IUser} from '../Interface/type'

export default function App() {
  const [auth, setAuth] = useState<IUser | null>(null)

  useEffect(() => {
    const user: null | string = localStorage.getItem('authUser')
    if(user) {
      setAuth(JSON.parse(user))
    }
  }, [auth?.email, auth?.id])

  return (
    <div className='wrapper'>
      <Routes>
        {auth ? (
          <Route path="/" element={<Home setAuth={setAuth} auth={auth}/>}/>
        ):(
          <>
            <Route path="/Login" element={<Login setAuth={setAuth}/>}/>
            <Route path="/Register" element={<Register setAuth={setAuth}/>}/>
            <Route path="/" element={<Home setAuth={setAuth} auth={auth}/>}/>
          </>
        )}
      </Routes>
    </div>
  )
}
