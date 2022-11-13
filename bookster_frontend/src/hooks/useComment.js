import { useState } from "react"

const useComment = () => {
  const [user, setUser] = useState('')
  const [comment, setComment] = useState('')
  
    const useUser = (username) => {
      setUser(username)
    }
  
    const useComment = (com) => {
      setComment(com)
    }
  
    return {
      useUser,
      useComment,
      user,
      comment
    }
}

export default useComment