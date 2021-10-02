import {profileApi, usersApi} from "../../Api/Api";
import {stopSubmit} from "redux-form";
import {dataPostsType, photosType, profileType} from "../../Types/Types";

const ADD_POST = 'profileReducer/ADD-POST'
const SET_USERS_PROFILE = 'profileReducer/SET_USER_PROFILE'
const SAVE_PHOTO = 'profileReducer/SAVE_PHOTO '
const GET_USER_STATUS = 'profileReducer/GET_USER_STATUS'
const UPDATE_USER_STATUS = 'profileReducer/UPDATE_STATUS'
const DELETE_POST = 'profileReducer/DELETE_POST'
type delelePostType = {
    type: typeof DELETE_POST
    id: number
}
export const deletePostAction = (id: number):delelePostType => {
    return {type:DELETE_POST, id}
}
type getUserStatusType = {
    type: typeof GET_USER_STATUS
    status: string
}
export const getUserStatus = (status: string): getUserStatusType => {
    return {type: GET_USER_STATUS, status}
}
type addPostActionType = {
    type: typeof ADD_POST
    text: string
}
export const addPostAction = (newPostText: string): addPostActionType => {
    return {type: ADD_POST, text: newPostText}
}
type setUsersProfileType = {
    type: typeof SET_USERS_PROFILE
    profile: profileType
}
export const setUsersProfile = (profile: profileType): setUsersProfileType => {
    return {type: SET_USERS_PROFILE, profile}
}
type saveUserPhotoType = {
    type: typeof SAVE_PHOTO
    photos: photosType
}
export const saveUserPhoto = (photos: photosType): saveUserPhotoType => {
    return {type: SAVE_PHOTO, photos}
}


export const getProfileThunkCreator = (userId: string) => async (dispatch: any) => {
    const response = await usersApi.getProfile(userId)
    dispatch(setUsersProfile(response.data))
}
export const getStatusThunkCreator = (userId: number) => async (dispatch: any) => {
    let data = await profileApi.getProfileStatus(userId)
    dispatch(getUserStatus(data))
}

export const updateStatusThunkCreator = (status: string) => async (dispatch: any) => {
    let data = await profileApi.putUserStatus(status)
    if (data.resultCode === 0)
        dispatch(getUserStatus(status))
}

export const savePhotoThunkCreator = (file: any) => async (dispatch: any) => {
    let response = await profileApi.putUserPhoto(file)
    if (response.resultCode === 0) {
        dispatch(saveUserPhoto(response.data.photos))
    }
}

export const saveDescriptionThunkCreator = (profile: profileType) => async (dispatch: any, getState: Function) => {
    const userId = getState().auth.userId
    let response = await profileApi.saveProfile(profile)
    if (response.data.resultCode === 0) {
        dispatch(getProfileThunkCreator(userId))
    } else {
        dispatch(stopSubmit('description', {_error: response.data.messages[0]}))
        return Promise.reject(response.data.messages[0])
    }
}

type initialStateType = typeof initialState
let initialState = {
    dataPosts: [
        {
            id: 1,
            message: "Hey World",
            likeCount: 2
        }
    ] as Array<dataPostsType>,
    newPostText: '',
    profile: null as profileType | null,
    status: ""
}

const profileReduser = (state = initialState, action: any): initialStateType => {
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
                profile: {...state.profile, photos: action.photos} as profileType
            }
        case DELETE_POST:
            return {
                ...state, dataPosts: state.dataPosts.filter(p => p.id != action.post)}
        default:
            return state
    }

}


export default profileReduser