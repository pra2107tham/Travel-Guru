import React from 'react'
import axios from "axios"
import { useAuthContext } from '../context/AuthContext'
import { useState } from 'react'

const useLogin = () => {
    const [loading,setLoading] = useState(false)

    const {setAuthUser} = useAuthContext()

    const login = async ({username,password}) => {
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_PROXY}/auth/login`,
                {
                    username,
                    password
                }
            )
            const data = res.data
            // console.log(data)
            // toast.success(res.data.message) 

            //local storage
            localStorage.setItem('authUser',JSON.stringify(data))
            //context
            setAuthUser(data)
            
        } catch (error) {
            console.log("Error logging in : ",error)
        }finally{
            setLoading(false)
        }
    }
    return {login,loading}
}

export default useLogin