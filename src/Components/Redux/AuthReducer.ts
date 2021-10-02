import {authApi, securityApi} from "../../Api/Api"
import {stopSubmit} from "redux-form"

const SET_USER_DATA = 'authReducer/SET_USER_DATA'
const GET_CAPTCHA_URL = 'authReducer/GET_CAPTCHA_URL'


type setAuthUserDataType = {
    type: typeof SET_USER_DATA
    data:{id: number | null, login: string | null, email: string | null, isAuth: boolean}
}
export const setAuthUserData = (id: number | null, login: string | null, email: string | null, isAuth: boolean):setAuthUserDataType => {
    return {type: SET_USER_DATA, data: {id, login, email, isAuth}}
}

type getCaptchaSuccessType = {
    type: typeof GET_CAPTCHA_URL
    data: {captchaUrl:string}
}
export const getCaptchaSuccess = (captchaUrl: string):getCaptchaSuccessType => {
    return {type: GET_CAPTCHA_URL, data: {captchaUrl}}
}


export const authMeThunkCreator = () => async (dispatch: any) => {
let data = await authApi.getAuthMe()
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
}

export const loginUserThunkCreator = (email: string, password: string, isRememberMe: boolean,  captcha: any) => async (dispatch: any) => {
  const response = await authApi.loginUser(email, password, isRememberMe, captcha)
            if (response.data.resultCode === 0) {
                dispatch(authMeThunkCreator())
            } else {
                if (response.data.resultCode === 10) {
                    dispatch(getCaptchaThunkCreator())
                }
                const errorMessage = response.data.messages
                dispatch(stopSubmit('login', {_error: errorMessage}))
            }
}

export const logoutUserThunkCreator = () => async (dispatch: any) => {
   const response = await authApi.logoutUser()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export const getCaptchaThunkCreator = () => async (dispatch: any) => {
    const response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url
        dispatch(getCaptchaSuccess(captchaUrl))
}
type initialStateType = typeof initialState
let initialState = {
    id: null as null | number,
    login: null as null | string,
    email: null as null | string,
    password: null as null | string,
    isFetching: false as false | true,
    isAuth: false,
    isRememberMe: false,
    captchaUrl: null
}


const authReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case   SET_USER_DATA :
        case   GET_CAPTCHA_URL :
            return {
                ...state,
                ...action.data,
            }
        default:
            return state
    }
}

export default authReducer