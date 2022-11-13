import { Link } from "react-router-dom"

function Libro ({libro}){
    return(
        <Link to={`/book/${libro.title}`}>
            <div className='mt ml libro'>
                <div className='flex'>
                    <img className='userBookImg' src={libro.user.image} alt="UserImg"/> 
                    <h4>{libro.user.username}</h4>
                </div>
                <div>
                    <img className='bookImg' src={libro.image} alt="Book"/> 
                    <h3>{libro.title}</h3>
                    <div className='flex'>
                        <span>Likes: {libro.likes.number}</span>
                        <span className='ml1'>Coments: {libro.comments.length}</span>
                    </div>
                </div>   
            </div>
        </Link>
    )
}

export default Libro