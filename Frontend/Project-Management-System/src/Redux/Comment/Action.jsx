import api from "@/config/api"
import * as actionType from "./ActionType"

export const createComment =(commentData)=>{
     return async (dispatch)=>{
        dispatch({type:actionType.CREATE_COMMENT_REQUEST})
        try {
             const response = await api.post(`/api/comments`,commentData);               
             console.log("comment created" ,response.data);
             dispatch({type : actionType.CREATE_COMMENT_SUCCESS ,comment:response.data})
             
        } catch (error) {
            console.log(error);
            dispatch({type:actionType.CREATE_COMMENT_FAILURE ,error:error.message})
        }
     }
}

export const deleteComments =(commentId)=>{
    return async (dispatch)=>{
       dispatch({type:actionType.DELETE_COMMENT_REQUEST})
       try {
            const response = await api.delete(`/api/comments/${commentId}`);               
            console.log("deleted comments" ,response.data);
            dispatch({type : actionType.DELETE_COMMENT_SUCCESS ,commentId})
            
       } catch (error) {
           console.log(error);
           dispatch({type:actionType.DELETE_COMMENT_FAILURE ,error:error.message})
       }
    }
}


export const fetchComments =(issueId)=>{
    return async (dispatch)=>{
       dispatch({type:actionType.FETCH_COMMENT_REQUEST})
       try {
            const response = await api.get(`/api/comments/${issueId}`);               
            console.log("fetched comments" ,response.data);
            dispatch({type : actionType.FETCH_COMMENT_SUCCESS ,comments:response.data})
            
       } catch (error) {
           console.log(error);
           dispatch({type:actionType.FETCH_COMMENT_FAILURE ,error:error.message})
       }
    }
}