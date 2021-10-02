import {authMeThunkCreator} from "./AuthReducer";

let USER_INITIALIZING: string = 'authReducer/USER_INITIALIZING'
type userInitializingType = {
    type: typeof USER_INITIALIZING
}
export const userInitializing = ():userInitializingType => {
    return {type: USER_INITIALIZING}
}

type initialStateType = {
    initialized: boolean
}

let initialState: initialStateType = {
    initialized: false
}

export const initializingApp = () => (dispatch: Function) => {
    let promise = dispatch(authMeThunkCreator())
    Promise.all([promise])
        .then(() => {
            dispatch(userInitializing())
        })
}


const appReducer = (state = initialState, action:userInitializingType): initialStateType => {
    switch (action.type) {
        case   USER_INITIALIZING :
            return {
                ...state,
                initialized: true
            }
        default:
            return state
    }
}

export default appReducer