import { createContext, useEffect, useReducer } from "react"

const INI_STATE={
    user:JSON.parse(localStorage.getItem('user')) || null,
    err:null,
    loading:false,
}

export const AuthContext=createContext(INI_STATE)

const AuthReducer=(state,action)=>{
    switch(action.type){
    case "LOGIN_START":
        return{
            user:null,
            err:null,
            loading:true,
        }
    case "LOGIN_SUCCESS":
        return{
            user:action.payload,
            err:null,
            loading:false
        }
    case "LOGIN_FAILED":
        return{
            user:null,
            err:action.payload,
            loading:false
        }
    case "LOGOUT":
        return{
            user:null,
            err:null,
            loading:false,
        }    
    default:
        return state
    }
    }

    export const AuthContextProvider=({children})=>{
        const [state,dispatch]=useReducer(AuthReducer,INI_STATE)
        //storing the user into local storage
        useEffect(()=>{
            localStorage.setItem('user',JSON.stringify(state.user))
        },[state.user])
        return(
            <AuthContext.Provider
            value={{
                user:state.user,
                loading:state.loading,
                err:state.err,
                dispatch
            }}>
                {children}
            </AuthContext.Provider>
        )
    }