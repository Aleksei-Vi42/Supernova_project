import React from "react"
import {addPostAction} from "../../Redux/ProfileReduser"
import MyPosts from "./MyPosts"
import {connect} from "react-redux"

let mapStateToProps = (state) => {
    return {
        dataPosts: state.profilePage.dataPosts,
        newPostText: state.profilePage.newPostText,
        profile: state.profile
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        addPost: (newPostText) => {
            dispatch(addPostAction(newPostText))
        },
    }
}
const MyPostsContainer = connect(mapStateToProps, mapDispatchToProps)(MyPosts)

export default MyPostsContainer