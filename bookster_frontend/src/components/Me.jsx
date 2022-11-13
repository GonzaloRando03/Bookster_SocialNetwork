import { setLogin } from '../reducers/loginReducer';
import { setError, unsetError } from '../reducers/errorReducer';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import Create from './Create';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';

//componente que muestra los libros del usuario
function MyBooks(){
  const [userBooks, setUserBooks] = useState([])

  useEffect( ()=>{
    let userJSON = window.localStorage.getItem('user')
    let user = JSON.parse(userJSON)

    const getBooks = async () =>{
      const books = await bookService.getMyBooks(user.username)
      setUserBooks(books)
    }

    getBooks()
  }, [])

  if (userBooks.length === 0){
    return(<div className='mt100'></div>)
  }

  return(
    <div className='userBooks'>
      {userBooks.map(bookOne => 
        <div key={bookOne.title} className='userBookDiv'>
          <Link to={`/book/${bookOne.title}`}>
            <img src={bookOne.image} alt='book' className='imageUserBook'/>
          </Link>
        </div>
      )}
    </div>
  )
}


//componente del usuario
function Me(props) {
  const navigate = useNavigate()

  function unlog(){
    window.localStorage.removeItem('user')
    props.setLogin({})
    window.location.reload()
    navigate('/login')
  }

    return (
      <div className='center full'>
        <div className='me'>
            <div className='mt7 profile'>
                <img src={props.login.image} alt='userImg' className='profilePhoto'/>
                <h1>{props.login.name}</h1><button className='unlog' onClick={unlog}>Cerrar sesión</button>
            </div>
            <p>{props.login.description}</p>
            <Create/>
            <MyBooks/>
        </div>
      </div>
    );
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
const ConnectMe = connect(
mapStateToProps,
mapDispatchToProps
)(Me)

export default ConnectMe