import React from 'react'
import Link from 'next/link'

function Navbar() {
  return (
 <nav className='bg-purple-200 text-black flex justify-between items-center px-4 md:h-16'>
      <Link className="logo font-bold flex justify-center items-center" href={"/"}>
        <span className='md:text-base my-3 md:my-0'>WeatherSpan!</span>
      </Link>

      <div className='flex justify-center items-center md:block gap-4'>
          <button>
              <Link href = '/'>Home</Link>       
          </button>
          
      </div>
    </nav>
  
  )
}

export default Navbar
