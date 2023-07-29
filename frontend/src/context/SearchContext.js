import { createContext, useContext, useReducer } from "react"
//defining the initial states that will be passed in the components
const INI_STATE={
    city:undefined,
    date:[],
    opt:{
        adult:undefined,
        children:undefined,
        room:undefined,
    },
}
//creating a context for passing the above defined states in the comps
export const SearchContext=createContext(INI_STATE);
//creating a reducer 
const SearchReducer=(state,action)=>{
    switch(action.type){
        case "NEW_SEARCH":
            return action.payload
        case "RESET_SEARCH": 
            return INI_STATE
        default:
        return state   
    }
}
//creating a context provider
export const SearchContextProvider=({children})=>{
        const [state,dispatch]=useReducer(SearchReducer,INI_STATE)
        return(
            <SearchContext.Provider
            value={{
                city:state.city,
                date:state.date,
                opt:state.opt,
                dispatch
            }}>
                {children}
            </SearchContext.Provider>
        )
}
