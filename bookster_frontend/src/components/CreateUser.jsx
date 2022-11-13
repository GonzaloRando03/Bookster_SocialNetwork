import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { connect } from 'react-redux'
import { setLogin } from '../reducers/loginReducer'
import { setError, unsetError } from '../reducers/errorReducer'
import Cropper from "react-cropper";

import "cropperjs/dist/cropper.css";

import useUser from "../hooks/useUser"
import userService from '../services/userService'
import { DragAndDropImg } from './Create'
import ErrorMsg from './ErrorMsg'

//componente para crear ususario
function CreateUser(props){
    const [goodPasswd, setGoodPasswd] = useState(true)
    const [error, setError] = useState(false)
    const [cropper, setCropper] = useState()

    const navigate = useNavigate()
    const user = useUser()

    //función para mandar un nuevo usuario a la base de datos.
    async function sendUser(event){
        event.preventDefault()

        if(user.password1 === user.password2 && user.profileImg !== null){
            if(user.password1 !== ''){
                const usuario = {
                    username: user.user,
                    name:user.name,
                    password: user.password1,
                    image: cropper.getCroppedCanvas().toDataURL(),
                    followers: 0,
                    description: user.description
                }
                console.log(usuario)
                let userLogin = await userService.sendUser(usuario)
                console.log(userLogin)

                //comprueba que no hay error al mandar la información
                if (userLogin.hasOwnProperty('error')){
                    setError(true)
                    setTimeout(()=>{setError(false)}, 3000)

                }else{
                    window.localStorage.setItem('user', JSON.stringify(userLogin))
                    props.setLogin(userLogin)
                    navigate('/home')
                }
            }
        
        }else{
            setError(true)
            setTimeout(()=>{setError(false)}, 3000)
        }
        
    }

    //funcion que guarda el valor usuario en el estado
    function handleUsername(event){
        event.preventDefault()
        user.useUser(event.target.value)
    }

     //funcion que guarda el valor nombre en el estado
     function handleName(event){
        event.preventDefault()
        user.useName(event.target.value)
    }

    //funcion que guarda el valor password en el estado
    function handlePassword1(event){
        event.preventDefault()
        user.usePassword1(event.target.value)
    }

    function handlePassword2(event){
        event.preventDefault()
        if(event.target.value !== user.password1){
            setGoodPasswd(false)
        }else{
            setGoodPasswd(true)
        }
        user.usePassword2(event.target.value)
    }

    //funcion que guarda el valor description en el estado
    function handleDescription(event){
        event.preventDefault()
        user.useDescription(event.target.value)
    }

    return(
        <div className="center">
            {error? <ErrorMsg msg={'Error al crear el usuario, comprueba los datos o cambia el nombre'}/>: null}
            <form className="createUser" onSubmit={(event)=>{sendUser(event)}}>
                <div>
                    <h1>Register :</h1>
                    <h3>Username:</h3>
                    <input  type="text" 
                            id='username'
                            value={user.user} 
                            placeholder="Introduce nombre de usuario"
                            onChange={(event)=>{handleUsername(event)}}
                    />
                    <h3>Name:</h3>
                    <input  type="text" 
                            id='name'
                            value={user.name} 
                            placeholder="Introduce tu nombre y apellidos"
                            onChange={(event)=>{handleName(event)}}
                    />
                    <h3>Password:</h3>
                    <input  type="password" 
                            id='password1'
                            value={user.password1}  
                            placeholder="Introduce contraseña"
                            onChange={(event)=>{handlePassword1(event)}}
                    /><br/>
                    {goodPasswd? null : <b className='red'>Las contraseñas no son iguales</b>}<br/>
                    <input  type="password"
                            id='password2'
                            value={user.password2}  
                            placeholder="Repite la contraseña"
                            onChange={(event)=>{handlePassword2(event)}}
                    /><br/>
                    <h3>Description:</h3>
                    <textarea   name="textarea" 
                                id='description'
                                rows="10" 
                                cols="50"
                                value={user.description}
                                placeholder="Escribe una descripción"
                                onChange={(event)=>{handleDescription(event)}}
                                >
                    </textarea><br/>
                    <DragAndDropImg img={user.profileImg} setImage={user.useImg}/>
                    {/* cortador de imagenes de react */}
                    {user.profileImg
                        ?<Cropper
                            style={{ height: 400, width: "80%" }}
                            zoomTo={0.5}
                            initialAspectRatio={1}
                            preview=".img-preview"
                            src={user.profileImg}
                            viewMode={1}
                            minCropBoxHeight={10}
                            minCropBoxWidth={10}
                            background={false}
                            responsive={true}
                            autoCropArea={1}
                            checkOrientation={false} 
                            guides={true}
                            aspectRatio={9 / 9}
                            onInitialized={(instance) => {
                            setCropper(instance);
                            }}
                        />: null}
                    <button id='createUserButton' type="sumbit"><b>Aceptar</b></button>
                </div>
            </form>
        </div>
    )
}

//función para pasar los estados como props
const mapStateToProps = (state) => {
    return {
      login: state.login,
      errors: state.errors
    }
  }
  
  //función para pasar las funciones del reducer como props
  const mapDispatchToProps = {
    setLogin,
    setError,
    unsetError
  }
  
  //componentes con props
  const ConnectCreateUser = connect(
  mapStateToProps,
  mapDispatchToProps
  )(CreateUser)
  
  export default ConnectCreateUser