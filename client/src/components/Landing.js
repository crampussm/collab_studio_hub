import React from 'react'

function Landing() {
  return (
    <div>
        <nav>
            <div className='px-10 py-2 w-full flex justify-between'>
                <div className="logo w-1/2">
                    <img className='w-1/4' src="./images/landingPage/csh_logo.png" alt="" />
                </div>
                <div className="navitems flex flex-row w-1/2 justify-end items-center">
                    <ul className='flex flex-row justify-evenly w-1/2'>
                        <li className='list-none'>Feature</li>
                        <li className='list-none'>Pricing</li>
                        <li className='list-none'>Docs</li>
                    </ul>
                    <div className='flex flex-row justify-evenly w-1/4'>
                        <button className='bg-cshgreen w-[5rem] h-[2.5rem] text-white rounded-md'>Sign up</button>
                        <button className='bg-cshoffwhite w-[5rem] h-[2.5rem] text-black rounded-md'>Log in</button>
                    </div>
                </div>
            </div>
        </nav>
        <hr />
    </div>
  )
}

export default Landing