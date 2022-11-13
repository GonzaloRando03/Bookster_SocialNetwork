import { setLogin } from '../reducers/loginReducer';
import { setError, unsetError } from '../reducers/errorReducer';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import bookService from '../services/bookService';
import userService from '../services/userService';


function MyBooks(){

  //conseguimos el parámetro de la url
  const {username} = useParams()

  const [userBooks, setUserBooks] = useState([])


  useEffect( ()=>{

    const getBooks = async () =>{
      const books = await bookService.getMyBooks(username)
      setUserBooks(books)
      console.log(books)
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
            <img src={bookOne.image} alt='book'/>
          </Link>
        </div>
      )}
    </div>
  )
}


function User(props) {
  const [user, setUser] = useState({username:'', name: '', followers: {number: 0, users: []}}) 
  const [follow, setFollow] = useState(false) 

  //conseguimos el parámetro de la url
  const {username} = useParams()

  const navigate = useNavigate()
  
  useEffect( ()=>{

    if (props.login.username === username){
      navigate('/me')
    }

    const getUser = async () =>{
      const userdata = await userService.getUser(username)
      setUser(userdata)
      console.log(userdata)
    }

    getUser()
  }, [])


  async function followUser(){
    const userFollowed = await userService.followUser(username, props.login.username)
    const newUser = {...user}
    if (userFollowed.correct){
        newUser.followers.number++
        setUser(newUser)
        setFollow(true)
    }else{
        newUser.followers.number--
        setUser(newUser)
        setFollow(false)
    }
}

    return (
      <div className='center full'>
        <div className='me'>
            <div className='mt7 profile'>
                <img src={user.image} alt='userImg' className='profilePhoto'/>
                <h1>{user.name}</h1><button id='followButton' className='unlog' onClick={followUser}>{follow? 'Dejar de seguir': 'Seguir'}</button>
            </div>
            <p className='mt1'>Followers: {user.followers.number}</p>
            <p className='mb10'>{user.description}</p>
            <MyBooks />
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
const ConnectUser = connect(
mapStateToProps,
mapDispatchToProps
)(User)

export default ConnectUser