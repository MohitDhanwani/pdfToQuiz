'use client'
import React from 'react'
import {signIn, signOut, useSession} from "next-auth/react"

const Navbar = () => {
  
  const session = useSession();

  console.log(session);

  return (
    <div className="flex justify-between p-3 bg-gray-800 items-center">
      <h1 className="text-3xl font-semibold ml-24">Quizlet</h1>
      <div className='text-xl font-semibold'>
      {session.data?.user && `Welcome ${session.data?.user.name} , have a great learning!`}
      </div>
      {session.data?.user && <button className="text-lg mr-16 font-semibold bg-[#800080] hover:bg-pink-700 transition duration-300 rounded-xl p-2 px-4"
      onClick={() => signOut()}>Logout</button>}
      {!session.data?.user && <button className="text-lg mr-16 font-semibold bg-[#800080] hover:bg-pink-700 transition duration-300 rounded-xl p-2 px-4"
      onClick={() => signIn()}>SignUp</button>}
    </div>
  )
}

export default Navbar