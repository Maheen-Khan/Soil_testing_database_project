import { createContext, useReducer, useEffect , useContext  } from "react";
import {getData} from "./SessionHandler"
export const AuthContext = createContext()
const reducer = ((state,action) => {
    switch(action.type){
        case "LOGIN":
            return {user : action.data}
        case "LOGOUT":
            return {user : null}
        default:
            return state
    }
})

export const AuthContextProvider = (({children}) =>{

    const [state,dispatch] = useReducer(reducer,{user : null})

    useEffect(()=>{
        const user = getData("user") //extracts the user from the session storage
        if(user){
            dispatch({type : "LOGIN", data : user})
        }
    },[])

    return(
        <AuthContext.Provider value = {{...state, dispatch}} >
            {children}
        </AuthContext.Provider>
    )

})

export const useAuthContext = (() =>{
    const context = useContext(AuthContext)

    if(!context){
        throw Error ("Error: useContext must be inside authcontextProvider")
    }
    return context
})

