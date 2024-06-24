import React from 'react'
import { useState } from 'react'
import { useAuthContext } from '../context/AuthContext'
import axios from "axios"

const useLogout = () => {
  const [loading , setLoading] = useState(false)
  const {setAuthUser} = useAuthContext();

    const logout = async() => {
        setLoading(true)
        try {
            const res = await axios.post(`${import.meta.env.VITE_PROXY}/auth/logout`)
            console.log(res.message)
            localStorage.clear("authUser")
            setAuthUser(null)
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    return {loading, logout}
}

export  {useLogout}