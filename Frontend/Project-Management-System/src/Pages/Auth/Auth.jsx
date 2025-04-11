import React, { useState } from 'react'
import Signup from './Signup'
import Login from './login'
import { Button } from '@/components/ui/button'
import "./Auth.css"

const Auth = () => {
    const [active, setActive] = useState(true)
  return (
    <div className='auth-root loginContainer'>
        <div className='box h-[30rem] w-[25rem]'>
            <div className='minContainer login'>
                <div className='loginBox  w-full px-10 space-y-5'>
                    {active ? <Signup/> : <Login/>}

                      <div className='flex items-center gap-8 !ml-4 !mt-4'>
                        <span className='text-base'>already have account ?</span>
                        <Button className="cursor-pointer text-base text-blue-400 hover:text-blue-500"  variant="ghost" onClick={()=>setActive(!active)}>{active?"signin":"signup"}</Button>
                      </div>
                </div>
            </div>
        </div>
       
    </div>
  )
}

export default Auth
