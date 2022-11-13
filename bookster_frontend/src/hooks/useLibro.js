import { useState } from "react"

const useLibro = () => {
  const [pdf, setPdf] = useState(null)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState('')
  const [resume, setResume] = useState('')
  
    const usePdf = (pdf) => {
      setPdf(pdf)
    }
  
    const useImage = (img) => {
      setImage(img)
    }
  
    const useTitle = (tit) => {
      setTitle(tit)
    }

    const useResume = (res) => {
      setResume(res)
    }
  
    return {
      usePdf,
      useImage,
      useTitle,
      useResume,
      pdf,
      image,
      title,
      resume
    }
}

export default useLibro