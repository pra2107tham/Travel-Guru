import React, { useState } from 'react'
import axios from "axios"
import { useAuthContext } from '../context/AuthContext'

const useSignup = () => {
  const [loading,setLoading] = useState(false)

  const {setAuthUser} = useAuthContext()

  const signup = async ({username,password}) => {
    setLoading(true)
    try {
        const res = await axios.post(`${import.meta.env.VITE_PROXY}/auth/signup`,
            {
                
                username,
                password
            }
        )
        const data = res.data
        console.log(data)

        //local storage
        localStorage.setItem('authUser',JSON.stringify(data))
        //context
        setAuthUser(data)
    } catch (error) {
        console.log("Error signing up: ",error)
    }finally{
        setLoading(false)
    }
  }
  return {signup,loading}
}

export default useSignup

