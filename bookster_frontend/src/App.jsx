//imports
import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router";
import { connect } from "react-redux";
import { setLogin } from "./reducers/loginReducer";

//componentes
import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";
import Me from "./components/Me";
import CreateUser from "./components/CreateUser";
import bookService from "./services/bookService";
import UserBook from "./components/UserBook";
import User from "./components/User";
import SearchBook from "./components/SearchBook";

function App(props) {
  const navigate = useNavigate()

  useEffect(() => {
    let userJSON = window.localStorage.getItem('user')
    let user = JSON.parse(userJSON)


    if (userJSON !== null){
      console.log(user)
      props.setLogin(user)
      bookService.setToken(user.token)

    }else{
      navigate('/login')
    }
  }, [])

  return (
    <div>
        <Routes>
          <Route path="/" element={<Main><Home/></Main>} />
          <Route path="/home" element={<Main><Home/></Main>} />
          <Route path="/me" element={<Main><Me/></Main>} />
          <Route path="/book/:title" element={<Main><UserBook/></Main>} />
          <Route path="/user/:username" element={<Main><User/></Main>} />
          <Route path="/books" element={<Main><SearchBook/></Main>} />
          <Route path="/login" element={<Login/>} />
          <Route path="/create-user" element={<CreateUser/>} />
        </Routes>
    </div>
  );
}

//función para pasar los estados como props
const mapStateToProps = (state) => {
  return {
    login: state.login
  }
}

//función para pasar las funciones del reducer como props
const mapDispatchToProps = {
  setLogin
}

//componentes con props
const ConnectApp = connect(
mapStateToProps,
mapDispatchToProps
)(App)

export default ConnectApp