import { useState } from "react"

const useLogin = () => {
    const [user, setUser] = useState('')
    const [password, setPassword] = useState('')
  
    const useUser = (username) => {
      setUser(username)
    }
  
    const usePassword = (passwd) => {
      setPassword(passwd)
    }

    const resetLogin = () => {
      setPassword('')
      setUser('')
    }
  
  
    return {
      useUser,
      usePassword,
      resetLogin,
      user,
      password
    }
}

export default useLogin