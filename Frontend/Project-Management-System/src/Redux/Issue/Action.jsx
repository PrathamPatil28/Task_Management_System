import api from "@/config/api";
import * as actionType from "./ActionType"

export const fetchIssues =(id)=>{
    return async (dispatch)=>{
        dispatch({type: actionType.FETCH_ISSUES_REQUEST});
        try {
             const response =  await api.get(`/api/issues/project/${id}`);
             console.log("fetch issue by project id", response.data);
             dispatch({type : actionType.FETCH_ISSUES_SUCCESS , issues:response.data})
             
        } catch (error) {
             dispatch({type:actionType.FETCH_ISSUES_FAILURE, error: error.message})
        }
    }
}

export const createIssue = (issueData) => {
    return async (dispatch) => {
        dispatch({ type: actionType.CREATE_ISSUE_REQUEST });

        try {
            const response = await api.post("/api/issues", issueData);
            dispatch({ type: actionType.CREATE_ISSUE_SUCCESS, issues: response.data });
            console.log("Issue created successfully", response.data);
        } catch (error) {
            console.error("Issue creation failed", error.message);
            dispatch({ type: actionType.CREATE_ISSUE_FAILURE, error: error.message });
        }
    };
};


export const fetchIssueById =(id)=>{
    return async (dispatch)=>{
        dispatch({type: actionType.FETCH_ISSUES_BY_ID_FAILURE});
        try {
             const response =  await api.get(`/api/issues/${id}`);
             console.log("fetch issues by id", response.data);
             dispatch({type : actionType.FETCH_ISSUES_BY_ID_SUCCESS , issues:response.data})
             
        } catch (error) {
             dispatch({type:actionType.FETCH_ISSUES_BY_ID_FAILURE, error: error.message})
        }
    }
}

export const updateIssueStatus =({id,status})=>{
    return async (dispatch)=>{
        dispatch({type: actionType.UPDATE_ISSUE_STATUS_FAILURE});
        try {
             const response =  await api.put(`/api/issues/${id}/status/${status}`);
             console.log("update issue status", response.data);
             dispatch({type : actionType.UPDATE_ISSUE_STATUS_SUCCESS , issues:response.data})
             
        } catch (error) {
             dispatch({type:actionType.UPDATE_ISSUE_STATUS_FAILURE, error: error.message})
        }
    }
}

export const assignedUserTOIssue =({issueId,userId})=>{
    return async (dispatch)=>{
        dispatch({type: actionType.ASSIGN_ISSUE_TO_USER_REQUEST});
        try {
             const response =  await api.put(`/api/issues/${issueId}/assignee/${userId}`);
             console.log("assigned issue ", response.data);
             dispatch({type : actionType.ASSIGN_ISSUE_TO_USER_SUCCESS , issues:response.data})
             
        } catch (error) {
             dispatch({type:actionType.ASSIGN_ISSUE_TO_USER_FAILURE, error: error.message})
        }
    }
}


export const deleteIssue = (issueId) => {
    return async (dispatch) => {
        dispatch({ type: actionType.DELETE_ISSUE_REQUEST });
        try {
            await api.delete(`/api/issues/${issueId}`);
            dispatch({ type: actionType.DELETE_ISSUE_SUCCESS, issueId }); // <-- fix here
            console.log("Issue deleted successfully", issueId);
        } catch (error) {
            dispatch({ type: actionType.DELETE_ISSUE_FAILURE, error: error.message });
        }
    };
};






