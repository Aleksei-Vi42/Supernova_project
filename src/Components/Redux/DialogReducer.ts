const ADD_MESSAGE = 'ADD-MESSAGE'
type addMessageActionType = {
    type: typeof ADD_MESSAGE
    text: string
}
export const addMessageAction = (newMessageText: string):addMessageActionType => {
    return {type: ADD_MESSAGE, text: newMessageText}
}
type dataUsersType = {
    id: number
    name: string
}
type dataMessagesType = {
    id: number
    message: string
}
type initialStateType = typeof initialState
let initialState = {
    dataUsers: [
        {id: 1, name: 'Rick'},
        {id: 2, name: 'Morty'},
        {id: 3, name: 'Jery'},
        {id: 4, name: 'Bet'},
    ] as Array<dataUsersType>,
    dataMessages: [
        {id: 1, message: 'Labu dabu dab'},
        {id: 2, message: 'Yo'}
    ]as Array<dataMessagesType>,
}

const dialogReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case ADD_MESSAGE:
            let newMessage = {
                id: 3,
                message: action.text
            }
            return {
                ...state,
                dataMessages: [newMessage, ...state.dataMessages],
            }
        default:
            return state
    }
}
export default dialogReducer