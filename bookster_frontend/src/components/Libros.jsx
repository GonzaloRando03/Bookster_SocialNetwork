import Libro from "./Libro"

function Libros ({libros}){

return(<>
        {libros.map((book, i) => <Libro key={i} libro={book}/>)}
    </>)
}

export default Libros