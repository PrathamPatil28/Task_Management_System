
import api from "@/config/api";
import * as actionType from"./actionType"

export const getUserSubscription =()=>{
    return async (dispatch) =>{
        dispatch({type:actionType.GET_USER_SUBSCRIPTION_REQUEST});
        try {
             const response = await api.get("/api/subscriptions/user" ,{
                    headers:{
                        "Authorization" : `Bearer ${localStorage.getItem("jwt")}`
                    }
                } );
            dispatch({type : actionType.GET_USER_SUBSCRIPTION_SUCCESS,payload :response.data});
            console.log("user subscription" , response.data);
                
        } catch (error) {
             console.log(error);
             dispatch({type:actionType.GET_USER_SUBSCRIPTION_FAILURE ,error:error.message})
        }
    }
}  

export const upgradeSubscription =({planType})=>{
    return async (dispatch) =>{
        dispatch({type:actionType.UPGRADE_SUBSCRIPTION_REQUEST});
        try {
             const response = await api.patch("/api/subscriptions/upgrade" ,null,{
                 headers:{
                    "Authorization" :`Bearer ${localStorage.getItem("jwt")}`
                 },
                
                    params:{
                        planType :planType,
                    }
                } );
            dispatch({type : actionType.UPGRADE_SUBSCRIPTION_SUCCESS,payload :response.data});
            console.log("upgrade subscription" , response.data);
                
        } catch (error) {
             console.log(error);
             dispatch({type:actionType.UPGRADE_SUBSCRIPTION_FAILURE ,error:error.message})
        }
    }
}