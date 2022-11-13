import axios from 'axios'

const url = 'http://localhost:3637/api/login/'

function sendUser(user){
    const request = axios.post(url, user)
    return request.then(response => response.data)
}

export default { sendUser }