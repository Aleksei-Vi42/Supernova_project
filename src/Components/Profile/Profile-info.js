import React, {useEffect, useState} from "react"
import classes from "./Profile-info.module.css"
import {Loader} from "../Common/Preloader/Preloader"
import userPhoto from "../../Assets/images/av2.png"
import ProfileStatusWithHook from "./ProfileStatusWithHooc"
import {ProfileDescriptionReduxForm} from "./ProfileDescriptionForm"
import {ProfileDescription} from "./ProfileDescription"

const ProfileInfo = (props) => {
    const mainPhotoChange = (e) => {
        props.savePhoto(e.target.files[0])
    }

    let [editMode, setEditMode] = useState(false)

    let toEditMode = () => {
        setEditMode(true)
    }

    const onSubmit = (formData) => {
        props.saveDescription(formData).then(
            () => {
                setEditMode(false)
            }
        )
    }
    if (!props.profile) {
        return <Loader/>
    }
    return (
        <div className={classes.profileInfo}>
            <div>
                {props.isOwner && <input type={'file'} onChange={mainPhotoChange}/>}
            </div>
            {editMode ?
                <ProfileDescriptionReduxForm initialValues={props.profile} profile={props.profile} onSubmit={onSubmit}/>
                : <ProfileDescription toEditMode={toEditMode} isOwner={props.isOwner} profile={props.profile}/>}
            <img className={classes.ava} src={props.profile.photos.large || userPhoto}/>

            <div className={classes.profileStatus}>
                <b>Status:</b><ProfileStatusWithHook status={props.status} updateStatus={props.updateStatus}/>
            </div>
        </div>
    )
}

export default ProfileInfo