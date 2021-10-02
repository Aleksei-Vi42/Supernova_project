import {usersApi} from "../../Api/Api";
import {usersType} from "../../Types/Types";

const FOLLOW = 'userReducer/FOLLOW '
const UNFOLLOW = 'userReducer/UNFOLLOW'
const SET_USERS = 'userReducer/SET_USERS'
const SET_CURRENT_PAGE = 'userReducer/SET_CURRENT_PAGE'
const SET_TOTAL_USERS_COUNT = 'userReducer/SET_TOTAL_USERS_COUNT'
const TOGGLE_IS_FETCHING = 'userReducer/TOGGLE_IS_FETCHING '
const TOGGLE_IS_FOLLOWING_PROGRESS = 'userReducer/TOGGLE_IS_FOLLOWING_PROGRESS'

type followType = {
    type: typeof FOLLOW
    userId: number
}
export const follow = (userId: number): followType => {
    return {type: FOLLOW, userId}
}
type unfollowType = {
    type: typeof UNFOLLOW
    userId: number
}
export const unfollow = (userId: number): unfollowType => {
    return {type: UNFOLLOW, userId}
}
type setUsersType = {
    type: typeof SET_USERS
    users: object
}
export const setUsers = (users: object): setUsersType => {
    return {type: SET_USERS, users}
}
type setCurrentPageType = {
    type: typeof SET_CURRENT_PAGE
    currentPage: number
}
export const setCurrentPage = (currentPage: number): setCurrentPageType => {
    return {type: SET_CURRENT_PAGE, currentPage}
}
type setTotalUsersCount = {
    type: typeof SET_TOTAL_USERS_COUNT
    totalUsersCount: number
}
export const setTotalUsersCount = (totalUsersCount: number): setTotalUsersCount => {
    return {type: SET_TOTAL_USERS_COUNT, totalUsersCount}
}
type setToggleIsFetching = {
    type: typeof TOGGLE_IS_FETCHING
    isFetching: boolean
}
export const setToggleIsFetching = (isFetching: boolean): setToggleIsFetching => {
    return {type: TOGGLE_IS_FETCHING, isFetching}
}
type toggleIsFollowingProgress = {
    type: typeof TOGGLE_IS_FOLLOWING_PROGRESS
    isFetching: boolean
    userId: number
}
export const toggleIsFollowingProgress = (isFetching: boolean, userId: number): toggleIsFollowingProgress => {
    return {type: TOGGLE_IS_FOLLOWING_PROGRESS, isFetching, userId}
}

export const getUsersThunkCreator = (currentPage: number, pageSize: number) => async (dispatch: any) => {
    dispatch(setToggleIsFetching(true))
    const data = await usersApi.getUsers(currentPage, pageSize)
    dispatch(setToggleIsFetching(false))
    dispatch(setUsers(data.items))
    dispatch(setTotalUsersCount(data.totalCount))
}

export const unFollowThunkCreator = (userId: number) => async (dispatch: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const data = await usersApi.unFollowUsers(userId)
    if (data.resultCode === 0) {
        dispatch(unfollow(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}

export const followThunkCreator = (userId: number) => async (dispatch: any) => {
    dispatch(toggleIsFollowingProgress(true, userId))
    const data = await usersApi.followUsers(userId)
    if (data.resultCode === 0) {
        dispatch(follow(userId))
    }
    dispatch(toggleIsFollowingProgress(false, userId))
}
type initialStateType = typeof initialState
let initialState = {
    users: [] as Array<usersType>,
    pageSize: 10,
    totalUsersCount: 100,
    currentPage: 1,
    isFetching: true,
    isDisabled: [] as Array<number>// array of users id
}

const usersReducer = (state = initialState, action: any):initialStateType => {
    switch (action.type) {
        case  FOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: true}
                    }
                    return user
                })
            }
        case UNFOLLOW:
            return {
                ...state,
                users: state.users.map(user => {
                    if (user.id === action.userId) {
                        return {...user, followed: false}
                    }
                    return user
                })
            }
        case SET_USERS: {
            return {...state, users: [...action.users]}
        }
        case SET_CURRENT_PAGE: {
            return {...state, currentPage: action.currentPage}
        }
        case SET_TOTAL_USERS_COUNT: {
            return {...state, totalUsersCount: action.totalUsersCount}
        }
        case TOGGLE_IS_FETCHING: {
            return {...state, isFetching: action.isFetching}
        }
        case TOGGLE_IS_FOLLOWING_PROGRESS: {
            return {
                ...state,
                isDisabled: action.isFetching
                    ? [...state.isDisabled, action.userId]
                    : state.isDisabled.filter(id => id != action.userId)
            }
        }
        default:
            return state
    }
}


export default usersReducer