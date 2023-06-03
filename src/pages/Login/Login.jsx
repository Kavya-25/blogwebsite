import {useState} from 'react'
import './Login.scss'

export const Login = () => {
    const [account,setAccount]=useState("login");
    const toggleAccount=()=>{
        if(account=='login'){
            setAccount('signup')
        }
        else{
            setAccount('login')
        }
    }
  return (
    <div className='login'>
    {account==='login'?<div className="container">
            <img src="https://pngimg.com/uploads/photoshop/photoshop_PNG7.png" alt="" />
            <form action="">
                <input type="text" placeholder='Enter Username'/>
                <input type="password" placeholder='Enter Password' />
                <button type='submit' className='form-btn'>Login</button>
            <p>OR</p>
            <button onClick={toggleAccount}>Create an account</button>
            </form>
        </div>:<div className="container">
            <img src="https://pngimg.com/uploads/photoshop/photoshop_PNG7.png" alt="" />
            <form action="">
                <input type="text" placeholder='Enter Name'/>
                <input type="text" placeholder='Enter Username'/>
                <input type="password" placeholder='Enter Password' />
                <button type='submit' className='form-btn'>Sign Up</button>
            <p>OR</p>
            <button onClick={toggleAccount}>Already have an account</button>
            </form>
        </div> }
    </div>
  )
}
