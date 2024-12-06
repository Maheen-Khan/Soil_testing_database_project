import { useAuthContext } from "./AuthContext"
import { useNavigate } from "react-router-dom"
export const getData = ((key) =>{
    const localData = localStorage.getItem(key)
    if(localData){
        
        return(JSON.parse(localData))
    }

    const sessionData = sessionStorage.getItem(key)
    if(sessionData){
        return(JSON.parse(sessionData))
    }
    
    return null

})

export const setData = ((type,key,value) =>{
    if(type === "session"){
        sessionStorage.setItem(key,value)
        return true
    }

    if(type === "local"){
        localStorage.setItem(key,value)
        return true
    }

    return false
})

export const removeData = ((key) =>{
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
    
    console.log("User logged out and storage cleared");

})

export const roleRedirect = (() =>{
    const user = useAuthContext()
    if(user.role === "user"){
        nav("/")
    }
})
