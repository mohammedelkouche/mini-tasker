import React from 'react'
import Sidebar from '../components/Home/Sidebar'
import { Outlet } from 'react-router-dom'

function Home() {
  return (
    <div className='flex flex-col md:flex-row h-[98vh] gap-4'>
      <div className='md:w-1/4 xl:w-1/6 border border-gray-700 bg-gray-800/40 shadow-lg rounded-2xl p-4 flex flex-col justify-between'>
        < Sidebar />
      </div>
      <div className='flex-1 min-h-0 overflow-y-auto border border-gray-700 bg-gray-800/20 shadow-lg rounded-2xl p-4'>
        <Outlet />
      </div>
    </div>
  )
}

export default Home