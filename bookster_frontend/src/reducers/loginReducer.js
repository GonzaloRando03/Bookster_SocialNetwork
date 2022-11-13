const loginReducer = (state = {username: '', name: '', followers:{number: 0}}, action) => {
    switch (action.type){
        case "SET_LOGIN":
            return action.data

        default: return state
    }   
}

export const setLogin = (data) => {
    return {
        type: "SET_LOGIN",
        data: data
    }
}



export default loginReducer