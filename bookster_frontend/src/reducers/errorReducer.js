const errorReducer = (state = {error: false, msg: ''}, action) => {
    switch (action.type){
        case "SET_ERROR":
            return {
                error: true,
                msg: action.data
            }

        case "UNSET_ERROR":
            return {
                error: false,
                msg: ''
            }

        default: return state
    }   
}

export const setError = (data) => {
    return {
        type: "SET_ERROR",
        data: data
    }
}

export const unsetError = () => {
    return {
        type: "UNSET_ERROR"
    }
}



export default errorReducer