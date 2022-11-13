import { useState } from "react"

const useLogin = () => {
    const [user, setUser] = useState('')
    const [name, setName] = useState('')
    const [password1, setPassword1] = useState('')
    const [password2, setPassword2] = useState('')
    const [description, setDescription] = useState('')
    const [profileImg, setProfileImg] = useState(null)
  
    const useUser = (username) => {
      setUser(username)
    }

    const useImg = (img) => {
      setProfileImg(img)
    }

    const useName = (username) => {
      setName(username)
    }
  
    const usePassword1 = (passwd) => {
      setPassword1(passwd)
    }

    const usePassword2 = (passwd) => {
      setPassword2(passwd)
    }

    const useDescription = (desc) => {
      setDescription(desc)
    }
  
  
    return {
      useUser,
      useName,
      usePassword1,
      usePassword2,
      useImg,
      useDescription,
      description,
      user,
      name,
      password1,
      password2,
      profileImg
    }
}

export default useLogin