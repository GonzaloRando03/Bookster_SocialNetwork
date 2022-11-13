import axios from 'axios'

const url = 'http://localhost:3637/api/books/'

let token = null

//función para añadir  el token
const setToken = newToken => {
  token = `bearer ${newToken}`
}


function getBooks(){
    const request = axios.get(url)
    return request.then(response => response.data)
}

function getLastBooks(){
    const request = axios.get(url+'last')
    return request.then(response => response.data)
}

function getMyBooks(user){
    const request = axios.get(url+`my/${user}`)
    return request.then(response => response.data)
}

function getBookOne(title){
    const request = axios.get(url+`book/${title}`)
    return request.then(response => response.data)
}

function postBook(libro){
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.post(url, libro, config)
    return request.then(response => response.data)

}

function likeBook(libro, username){
    const config = {
        headers: { Authorization: token },
    }

    const request = axios.put(url+`like/${libro}`, {name: username}, config)
    return request.then(response => response.data)
}

function postComment(libro, comment){
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.put(url+`comment/${libro}`, comment, config)
    return request.then(response => response.data)
}

function searchBook(search){
    const request = axios.get(url+`search/${search}`)
    return request.then(response => response.data)
}

function delBook(book){
    const config = {
        headers: { Authorization: token },
    }
    const request = axios.delete(url+book, config)
    return request.then(response => response.data)
}

export default { 
    getBooks, 
    getLastBooks, 
    getMyBooks, 
    getBookOne, 
    postBook, 
    setToken, 
    likeBook, 
    postComment, 
    searchBook, 
    delBook 
}