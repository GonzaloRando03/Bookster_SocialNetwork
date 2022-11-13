import { useState } from "react";
import { connect } from "react-redux";

import useLibro from "../hooks/useLibro";
import ErrorMsg from "./ErrorMsg";
import bookService from "../services/bookService"

//componente para el drag and drop de la imagen
 export function DragAndDropImg(props){
    //funcion para cargar la imagen
    const changeImage = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])

        //se ejecuta cuando subimos una imagen
        reader.onload = (event) => {
            event.preventDefault()
            props.setImage(event.target.result)
        }

    }

    return(
        <div className="dragDiv">
            <input  className="dragAndDrop" 
                    type='file' 
                    id="dragAndDropImg"
                    accept="image/*" 
                    onChange={(event)=>{changeImage(event)}}
            />
            <h3>Arrastra o selecciona tu imágen.</h3>
            {props.img === null? null
                :<div className="dragImg">
                    <p>Imagen seleccionada:  </p>
                    <img  src={props.img} alt='imagen'/>
                </div>
            }
        </div>
    )
}

//componente para el drag and drop del pdf
function DragAndDropPdf(props){
    const pdf = props.pdf
    const setPdf = props.setPdf
    const [title, setTitle] = useState(null)

    //funcion para cargar el pdf
    const changePdf = (event) => {
        const reader = new FileReader()
        reader.readAsDataURL(event.target.files[0])
        setTitle(event.target.files[0].name)

        reader.onload = (event) => {
            event.preventDefault()
            console.log(event.target)
            setPdf(event.target.result)
        }
    }

    return(
        <div className="pdf">
            Arrastra o selecciona el documento.
            <input  type='file' 
                    accept=".pdf"  
                    id="dragAndDropPdf" 
                    onChange={(event)=>{changePdf(event)}}/>
            {pdf? <p>Archivo: {title}</p>: null}
        </div>
    )
}

//componente para crear una publicación
function Create(props) {
    const [form, setForm] = useState(false)
    const [error, setError] = useState(false)
    const libro = useLibro()

    //funcion para cambiar el titulo
    function handleTitle(event){
        event.preventDefault()
        libro.useTitle(event.target.value)
    }

    //funcion para cambiar el resumen
    function handleResume(event){
        event.preventDefault()
        libro.useResume(event.target.value)
    }

    //funcion para enviar el libro
    async function handleLibro(event){
        event.preventDefault()
        if (libro.title !== '' && libro.pdf !== null && libro.image !== null){
            const ObjectLibro = {
                author: props.login.username,
                title: libro.title,
                resume: libro.resume,
                pdf: libro.pdf,
                image: libro.image,
                likes: 0,
                comments: []
            }
            console.log(ObjectLibro)
            const savedLibro = await bookService.postBook(ObjectLibro)
            console.log(savedLibro)

            //comprueba que el formulario no da error
            if (savedLibro.hasOwnProperty('error')){
                setError(true)
                setTimeout(()=>{setError(false)}, 3000)

            }else{
                setForm(false)
                window.location.reload()
            }

        }else{
            setError(true)
            setTimeout(()=>{setError(false)}, 3000)
        }
    }

    return (
      <div>
        {error? <ErrorMsg msg={'Datos incorrectos'}/>: null}
        {form
            
            ?<div>
                <form onSubmit={(event)=>{handleLibro(event)}}>
                    Título: <br/>
                    <input id='bookTitle' type='text' value={libro.title} onChange={(event)=>{handleTitle(event)}} />
                    <br/>Resumen: <br/>
                    <textarea id='bookResume' value={libro.resume} onChange={(event)=>{handleResume(event)}}/>
                    <br/>PDF del libro: <br/>
                    <DragAndDropPdf pdf={libro.pdf} setPdf={libro.usePdf}/>
                    <DragAndDropImg img={libro.image} setImage={libro.useImage}/>
                    <button type="submit" className="mr1" id='createBookButton'>Enviar</button>
                    <button onClick={()=>{setForm(!form)}}>Cancelar</button>
                </form>
            </div>
            
            :<button id='createBook' onClick={()=>{setForm(!form)}}>
                Nuevo libro
            </button>
        }

        
      </div>
    );
  }
  
//función para pasar los estados como props
const mapStateToProps = (state) => {
    return {
      login: state.login,
    }
  }
  
  //función para pasar las funciones del reducer como props
  const mapDispatchToProps = {}
  
  //componentes con props
  const ConnectCreate = connect(
  mapStateToProps,
  mapDispatchToProps
  )(Create)
  
  export default ConnectCreate