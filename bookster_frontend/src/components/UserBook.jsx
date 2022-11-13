import { useState } from "react"
import { useEffect } from "react"
import { useParams } from "react-router"
import { connect } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faThumbsUp } from "@fortawesome/free-solid-svg-icons";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router";
import useComment from "../hooks/useComment";
import bookService from "../services/bookService"

//componente para los comentarios
function Coments(props){

    return (
        <div>
            <form onSubmit={(event)=>{props.sendComment(event)}}>
                <h3>Comentario</h3>
                <textarea className="comment" 
                          id="commentText"
                          value={props.comment.comment} 
                          onChange={(event)=>{props.handleComment(event)}}
                /><br/>
                <button id="commentButton" type="submit">Comentar</button>
            </form>
        </div>
    )
}


//componente principal
function UserBook (props){
    const [active, setActive] = useState(false)
    const [commentForm, setCommentForm] = useState(false)
    const [book, setBook] = useState({
        user:{
            image: null
        },
        image: null,
        comments : [],
        likes: {
            number: 0,
            users: []
        }
    })

    //conseguimos el parámetro de la url
    const {title} = useParams()

    const comment = useComment()
    const navigate = useNavigate()

    useEffect(()=>{
        async function getBook(title){
            const libro = await bookService.getBookOne(title)
            setBook(libro)
            console.log(libro)
            libro.likes.users.forEach(user => {
                if (user === props.login.username){
                    setActive(true)
                }
            })
        }

        getBook(title)
    },[])

    //funcion para dar like a los libros
    async function likeBook(){
        console.log(active)
        const likedBook = await bookService.likeBook(title, props.login.username)
        const newBook = {...book}
        if (likedBook.correct){
            newBook.likes.number++
            setBook(newBook)
            setActive(true)
        }else{
            newBook.likes.number--
            setBook(newBook)
            setActive(false)
        }
    }

    let style = active? 'active': 'inactive'

    
    function handleComment(event){
        event.preventDefault()
        comment.useComment(event.target.value)
    }

    //funcion para mandar un comentario
    async function sendComment(event){
        event.preventDefault()
        setCommentForm(false)

        const commentSend = {
            user: props.login.username,
            comment: comment.comment
        }
        const newComments = await bookService.postComment(title, commentSend)
        setBook(newComments)
    }

    async function deleteBook(event){
        event.preventDefault()
        await bookService.delBook(book.title)
        navigate('/me')
    }

    return(
        <div className="center">
            <div className='bookOne'>
                <Link to={`/user/${book.user.username}`}
                      id='userLinkBook' 
                      className='bookOneLink'
                >
                    <div className='flex'>
                        <img className='bookAuthorImg' 
                             src={book.user.image} 
                             alt="UserImg"
                        /> 

                        <h2>{book.user.name}</h2>

                    </div>
                </Link>
                <div>
                    <img className='bookOneImg' 
                         src={book.image} 
                         alt="Book"
                    /> 
                    <p className="bookResume">{book.resume}</p>
                    <h2>{book.title} 
                        <a className="descarga" 
                           download={book.title} 
                           href={book.document} 
                        >
                        Desgarga el libro</a>

                        {book.author === props.login.username
                            ? <button onClick={(event)=>{deleteBook(event)}}
                                      id='delBook'
                                      className='delButton'>
                                Eliminar
                              </button>
                            : null
                        }

                    </h2>
                    <div className='flex'>
                        <span className="oneBookIcon" 
                              onClick={()=>{likeBook()}}
                        >
                            <FontAwesomeIcon className={style} id='like' icon={faThumbsUp} /> 
                            <span className="number">{book.likes.number}</span>
                        </span>
                        <span className='ml1 oneBookIcon' 
                              onClick={()=>{setCommentForm(!commentForm)}}
                        >
                            <FontAwesomeIcon id="comment" icon={faComment}/> 
                            <span className="number">{book.comments.length}</span>
                        </span>
                    </div>
                </div>   
                
                {commentForm? <Coments sendComment={sendComment} 
                                       comment={comment} 
                                       handleComment={handleComment}
                                /> 
                            : null
                }

                <div className="comments">
                    <h2>Comentarios</h2>
                    {book.comments.map((com, i)=> <div key={i} className="com">
                        <h3>{com.username}</h3>
                        <p>{com.text}</p>
                    </div>)}
                </div>

            </div>
        </div>
    )
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
const ConnectUserBook = connect(
mapStateToProps,
mapDispatchToProps
)(UserBook)

export default ConnectUserBook