import React from 'react'
import './Home.scss'
import { Banner } from '../../Components/Banner/Banner'
import { Category } from '../../Components/Categories/Category'

export const Home = () => {
  return (
    <div className='home'>
      <Banner/>
      <Category/>
    </div>
  )
}
