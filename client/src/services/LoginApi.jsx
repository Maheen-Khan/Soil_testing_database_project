import api from "./api" 

const URL = "http://localhost:3001"

const login = async (userData) => {
    try{
        const res = await api.post('/login',userData) 

        return(res.data)
    }catch(err){
        console.log(err)
    }
}

const register = async (userData) =>{
    console.log(userData)
    const res = await api.post("/register",userData)
    console.log("Account created") 
}

export default {
    login,
    register
}