import {authApi, securityApi} from "../../Api/Api"
import {stopSubmit} from "redux-form"


const SET_USER_DATA = 'authReducer/SET_USER_DATA'
const GET_CAPTCHA_URL = 'authReducer/GET_CAPTCHA_URL'

export const setAuthUserData = (id, login, email, isAuth) => {
    return {type: SET_USER_DATA, data: {id, login, email, isAuth}}
}

export const getCaptchaSuccess = (captchaUrl) => {
    return {type: GET_CAPTCHA_URL, data: {captchaUrl}}
}


export const authMeThunkCreator = () => async (dispatch) => {
let data = await authApi.getAuthMe()
            if (data.resultCode === 0) {
                let {id, login, email} = data.data
                dispatch(setAuthUserData(id, login, email, true))
            }
}


export const loginUserThunkCreator = (email, password, isRememberMe,  captcha) => async (dispatch) => {
  const response = await authApi.loginUser(email, password, isRememberMe,  captcha)
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

export const logoutUserThunkCreator = () => async (dispatch) => {
   const response = await authApi.logoutUser()
            if (response.data.resultCode === 0) {
                dispatch(setAuthUserData(null, null, null, false))
            }
}

export const getCaptchaThunkCreator = () => async (dispatch) => {
    const response = await securityApi.getCaptcha()
    const captchaUrl = response.data.url
        dispatch(getCaptchaSuccess(captchaUrl))
}

let initialState = {
    id: null,
    login: null,
    email: null,
    isFetching: false,
    isAuth: false,
    password: null,
    isRememberMe: false,
    captchaUrl: null
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case   SET_USER_DATA :
        case   GET_CAPTCHA_URL :
            return {
                ...state,
                ...action.data
            }
        default:
            return state
    }
}

export default authReducer