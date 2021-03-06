import profileReduser from "./ProfileReduser";
import dialogReducer from "./DialogReducer";
import sideBarReducer from "./SideBarReducer";


let testStore = {

    _state: {
        profilePage: {
            dataPosts: [
                {id: 1, message: 'hi', likeCaunt: 20},
                {id: 2, message: 'Hello World', likeCaunt: 44}
            ],
            newPostText: ''
        },
        dialogPage: {
            dataUsers: [
                {id: '1', name: 'Rick'},
                {id: '2', name: 'Morty'},
                {id: '3', name: 'Jery'},
                {id: '4', name: 'Bet'},
            ],

            dataMessages: [
                {id: 1, message: 'Labu dabu dab'},
                {id: 2, message: 'Yo'}
            ],
            newMessageText: ''
        },
        sideBar: {}
    },
    _callSubscriber() {
        return console.log('Redux was change')
    },

    subscribe(subscriber) {
        this._callSubscriber = subscriber
    },
    getState() {
        return this._state
    },

    dispatch(action) {
        this._state.profilePage = profileReduser(this._state.profilePage, action)
        this._state.dialogPage = dialogReducer(this._state.dialogPage, action)
        this._state.sideBar = sideBarReducer(this._state.sideBar, action)
        this._callSubscriber(this._state)
    }
}





export default testStore