const booksReducer = (state = [], action) => {
    switch (action.type){
        case "SET_BOOKS":
            return action.data

        default: return state
    }   
}

export const setBooksRedux = (data) => {
    return {
        type: "SET_BOOKS",
        data: data
    }
}



export default booksReducer