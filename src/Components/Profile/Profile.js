import React from "react"
import classes from "./Profile.module.css"
import ProfileInfo from "./Profile-info"
import MyPostsContainer from "./MyPosts/MyPostsContainer"


const Profile = (props) => {
    return (
        <div className={classes.profile}>
            <ProfileInfo isOwner={props.isOwner}
                         profile={props.profile}
                         status={props.status}
                         updateStatus={props.updateStatus}
                         saveDescription={props.saveDescription}
                         savePhoto={props.savePhoto}/>
            <MyPostsContainer profile={props.profile}/>
        </div>
    )
}

export default Profile