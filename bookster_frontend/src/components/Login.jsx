import { useNavigate, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import useLogin from "../hooks/useLogin"
import loginService from '../services/loginService'
import { setLogin } from '../reducers/loginReducer'
import { setError, unsetError } from '../reducers/errorReducer'
import ErrorMsg from './ErrorMsg'

//componente para el login
function Login(props){

    const navigate = useNavigate()
    const login = useLogin()

    //funcion para loguearnos
    async function sendLogin(event){
        event.preventDefault()
    
        const user = {
            username: login.user,
            password: login.password
        }

        try {
            const userlogin = await loginService.sendUser(user)
            console.log(userlogin)
            window.localStorage.setItem('user', JSON.stringify(userlogin))
            props.setLogin(userlogin)
            login.resetLogin()
            navigate('/home')
            window.location.reload()
            
            
        } catch (error) {
            console.log(error.response.data.error)
            props.setError(error.response.data.error)
            setTimeout( ()=>{props.unsetError()}, 2000)
        }
        
    }

    //funcion que guarda el valor usuario en el estado
    function handleUsername(event){
        event.preventDefault()
        login.useUser(event.target.value)
    }

    //funcion que guarda el valor password en el estado
    function handlePassword(event){
        event.preventDefault()
        login.usePassword(event.target.value)
    }

    return(
        <div className="center">
            {props.errors.error? <ErrorMsg msg={props.errors.msg} />: null}
            <form className="login" onSubmit={(event)=>{sendLogin(event)}}>
                <div>
                    <h1>Login :</h1>
                    <h3>Username:</h3>
                    <input  type="text" 
                            value={login.user} 
                            id='username'
                            placeholder="Introduce nombre de usuario"
                            onChange={(event)=>{handleUsername(event)}}
                    />
                    <h3>Password:</h3>
                    <input  type="password" 
                            value={login.password}
                            id='password'
                            placeholder="Introduce contraseña"
                            onChange={(event)=>{handlePassword(event)}}
                    /><br/>
                    <button id='loginButton' type="sumbit"><b>Aceptar</b></button>
                </div>
                <Link className='linkLogin' 
                      to={'/create-user'}
                      id='createUser'>¿No tienes un usuario? Crealo</Link>
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
const ConnectLogin = connect(
mapStateToProps,
mapDispatchToProps
)(Login)

export default ConnectLogin
