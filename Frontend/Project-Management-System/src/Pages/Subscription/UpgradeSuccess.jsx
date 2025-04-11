import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { store } from '@/Redux/Store/Store'
import { getUserSubscription, upgradeSubscription } from '@/Redux/Subscription/Action'
import { CheckCircledIcon } from '@radix-ui/react-icons'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

const UpgradeSuccess = () => {
    const navigate = useNavigate();
    const {subscription} =useSelector(store=>store)

    const queryParams = new URLSearchParams(location.search);

    const paymentId = queryParams.get("payment_id");

    const planType=queryParams.get("planType");

    const dispatch = useDispatch();

    useEffect(() => {
        // const jwt = localStorage.getItem("jwt");
      
        // if (jwt && planType) {
          dispatch(upgradeSubscription({ planType }));
          dispatch(getUserSubscription());
        }
      , []);
      

  return (
    <div className='flex justify-center'>
        <Card className={"mt-20 p-5 space-y-5 flex flex-col items-center"}>
           <div className='flex items-center gap-4'>
                 <CheckCircledIcon className='h-9 w-9 text-green-500'/>
                 <p className='text-xl'>Plan Upgraded Successfully</p>
           </div>

            <div className='space-y-3'>
                <p className='text-green-500'>Start Date : {subscription.userSubscription?.subscriptionStartDate} </p>
                <p className='text-red-500'>End Date : {subscription.userSubscription?.subscriptionEndDate} </p>
                <p >plan type : {subscription.userSubscription?.planType} </p>
            </div>

            <Button onClick={()=>navigate("/")}>
                Go To Home
            </Button>
        </Card>
    </div>
  )
}

export default UpgradeSuccess
