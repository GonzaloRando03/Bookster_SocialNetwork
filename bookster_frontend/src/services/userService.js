import axios from 'axios'

const url = 'http://localhost:3637/api/user/'

function sendUser(user){
    const request = axios.post(url, user)
    return request.then(response => response.data)
}

function getUser(user){
    const request = axios.get(url+user)
    return request.then(response => response.data)
}

function followUser(user, username){
    const request = axios.put(url+`follow/${user}`, {name: username})
    return request.then(response => response.data)
}

export default { sendUser, getUser, followUser }