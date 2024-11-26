import api from "./api";

const URL = "http://localhost:3001"

const login = async (userData) => {
    try{
        const res = await api.post('/login',userData);

        sessionStorage.setItem("name",JSON.stringify(res.data.name));
        sessionStorage.setItem("user",JSON.stringify(res.data.id));
        return(res.data)
    }catch(err){
        console.log(err)
    }
}

const register = async (userData) =>{
    const res = await api.post("/register",userData)
    console.log("Account created");
}

export default {
    login,
    register
}