import { Link } from 'react-router-dom'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBook } from '@fortawesome/free-solid-svg-icons'

//componente principal con el header y el footer
function Main(props) {


    return (
      <div>
        <header className="center">
            <div className="headerContainer">
                <FontAwesomeIcon icon={faBook} className='iconBook' />
                <h2>Bookster</h2>
                <div>
                    <Link className='headerLink' id='home' to={'/'}>Home</Link>
                    <Link className='headerLink' id='books' to={'/books'}>Libros</Link>
                    <Link className='headerLink' id='me' to={'/me'}>Yo</Link>
                </div>
            </div>
        </header>
        {props.children}
        <footer>
            Developed and desinged by Gonzalo Rando Serna. gonzalorando03@gmail.com
        </footer>
      </div>
    );
}
  
export default Main;