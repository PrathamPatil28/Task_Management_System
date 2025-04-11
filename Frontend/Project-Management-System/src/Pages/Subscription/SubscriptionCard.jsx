import { Button } from '@/components/ui/button'
import { createPayment } from '@/Redux/Payment/Action'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import React from 'react'
import { useDispatch } from 'react-redux'

const SubscriptionCard = ({data}) => {
  const dispatch = useDispatch();

  const handleUpgrade =()=>{
    dispatch(createPayment({planType:data.planType,jwt:localStorage.getItem(("jwt"))}))
  }

  return (
    <div className='rounde-xl bg-[#1b1b1b] bg-opacity-20 shadow-[#14173b] shadow-2xl card p-5 space-y-5 w-[18rem] '>
       <p>{data.planName}</p>
       <p>
         <span className='text-xl font-semibold'>₹{data.price}/</span>
         <span> {data.planType}</span>
       </p>
        {data.planType=="ANNUALLY" &&<p className='text-green-500'>30% off</p>}

        <Button onClick={handleUpgrade} className='w-full cursor-pointer'  size="lg">
            {data.buttonName}
        </Button>


        <div>
        {data.fretures.map((item) => 
       
            <div key={item} className='flex items-center gap-2'>
                <CheckCircledIcon/>
                <p>{item}</p>
            </div>
        )}
        </div> 
    </div>
  )
}

export default SubscriptionCard
