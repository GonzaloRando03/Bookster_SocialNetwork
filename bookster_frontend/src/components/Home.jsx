import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { setError, unsetError } from '../reducers/errorReducer';
import { setLogin } from '../reducers/loginReducer';
import { setBooksRedux } from '../reducers/booksReducer';
import bookService from '../services/bookService';

import Libros from './Libros';


function Home(props) {

  const [books, setBooks] = useState([])

  useEffect(()=>{
    async function getLastBooks(){
      const lastBooks = await bookService.getLastBooks()
      setBooks(lastBooks)
      props.setBooksRedux(lastBooks)
    }

    //cache de libros con redux
    if (props.books.length !== 0){
      setBooks(props.books)
    }else{
      getLastBooks()
    }
  
  }, [])

  return (
    <div className='center'>
        <div className="home">
            <div className="userLat">
                <div className='flex'>
                    <img src={props.login.image} alt="UserImg"/> 
                    <h4>{props.login.name}</h4> 
                </div> 
                <p>{props.login.description} <br/> Seguidores: {props.login.followers.number}</p>
            </div>
            <div className="contentLat">
                <Libros libros={books}/>
            </div>
        </div>
    </div>   
  );
}

//función para pasar los estados como props
const mapStateToProps = (state) => {
    return {
      login: state.login,
      errors: state.errors,
      books: state.books
    }
  }
  
//función para pasar las funciones del reducer como props
const mapDispatchToProps = {
    setLogin,
    setError,
    unsetError,
    setBooksRedux
}

//componentes con props
const ConnectHome = connect(
mapStateToProps,
mapDispatchToProps
)(Home)

export default ConnectHome