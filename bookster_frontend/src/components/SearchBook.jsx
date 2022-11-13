import { useState, useEffect } from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import bookService from "../services/bookService";


//componente para mostrar y buscar libros
function SearchBook(){
    const [search, setSearch] = useState('')
    const [books, setBooks] = useState([])

    useEffect(() => {
        const getBooks = async () => {
            const books = await bookService.searchBook(search)
            setBooks(books)
        }

        getBooks()
    }, [])

    function handleSearch(event){
        event.preventDefault()
        setSearch(event.target.value)
    }

    async function searchBooks(event){
        event.preventDefault()
        const result = await bookService.searchBook(search)
        setBooks(result)
    }

    return(
        <div className="center">
            <div className="searchComponent">
                <form onSubmit={(event)=>{searchBooks(event)}}>
                    <b>Buscador</b>
                    <input  type='text' 
                            id="search"
                            value={search} 
                            onChange={(event) => {handleSearch(event)}}
                    />
                    <FontAwesomeIcon 
                            className='lupa' 
                            id="searchBookButton"
                            icon={faMagnifyingGlass} 
                            onClick={(event)=>{searchBooks(event)}}
                    />
                </form>
                <h2>Libros</h2>
                {books.map((book, i) => <div key={i} className='searchOne'>
                    <Link to={`/book/${book.title}`} className='searchLink'>
                        <img src={book.image} alt='imagelibro' className="imageSearch"/>
                        <h2>{book.title} escrito por {book.author}</h2>
                    </Link>
                </div>)}
            </div>
        </div>
    )
}

export default SearchBook