import {profileApi, usersApi} from "../../Api/Api";
import {stopSubmit} from "redux-form";

const ADD_POST = 'profileReducer/ADD-POST'
const SET_USERS_PROFILE = 'profileReducer/SET_USER_PROFILE'
const SAVE_PHOTO = 'profileReducer/SAVE_PHOTO '
const GET_USER_STATUS = 'profileReducer/GET_USER_STATUS'
const UPDATE_USER_STATUS = 'profileReducer/UPDATE_STATUS'

export const getUserStatus = (status) => {
    return {type: GET_USER_STATUS, status}
}

export const addPostAction = (newPostText) => {
    return {type: ADD_POST, text: newPostText}
}

export const setUsersProfile = (profile) => {
    return {type: SET_USERS_PROFILE, profile}
}

export const saveUserPhoto = (photos) => {
    return {type: SAVE_PHOTO, photos}
}


export const getProfileThunkCreator = (userId) => {
    return (dispatch) => {
        usersApi.getProfile(userId)
            .then(data => {
                dispatch(setUsersProfile(data))
            })
    }
}
export const getStatusThunkCreator = (userId) => async (dispatch) => {
    let data = await profileApi.getProfileStatus(userId)
    dispatch(getUserStatus(data))
}

export const updateStatusThunkCreator = (status) => async (dispatch) => {
    let data = await profileApi.putUserStatus(status)
    if (data.resultCode === 0)
        dispatch(getUserStatus(status))
}

export const savePhotoThunkCreator = (file) => async (dispatch) => {
    let response = await profileApi.putUserPhoto(file)
    if (response.resultCode === 0) {
        dispatch(saveUserPhoto(response.data.photos))
    }
}

export const saveDescriptionThunkCreator = (profile) => async (dispatch, getState) => {
    const userId = getState().auth.userId
    let response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId))
    } else {
        dispatch(stopSubmit('description', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

let initialState = {
    dataPosts: [
        {
            id: 1,
            message: "Hey World",
            likeCount: 2
        }
    ],
    newPostText: '',
    profile: null,
    status: null
}

const profileReduser = (state = initialState, action) => {
    switch (action.type) {
        case ADD_POST: {
            let newPost = {
                id: 1,
                message: action.text,
                likeCount: 0
            }
            return {
                ...state,
                dataPosts: [newPost, ...state.dataPosts]
            }
        }
        case SET_USERS_PROFILE:
            return {
                ...state,
                profile: action.profile
            }
        case GET_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case UPDATE_USER_STATUS:
            return {
                ...state,
                status: action.status
            }
        case SAVE_PHOTO:
            return {
                ...state,
                profile: {...state.profile, photos: action.photos}
            }
        default:
            return state
    }

}


export default profileReduser