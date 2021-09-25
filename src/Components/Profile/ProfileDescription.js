import classes from "./Profile-info.module.css"
import React, {useEffect} from "react"

export const ProfileDescription = ({profile, isOwner, toEditMode}) => {

    return   <div className={classes.description}>
        {isOwner && <div><button onClick={toEditMode}>edit</button></div>}
        <div>
            <b>My name:</b> {profile.fullName}
        </div>
        <div>
            <b>About me:</b> {profile.aboutMe}
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <Contact key={key} contactTitle={key} contactValue={profile.contacts[key]}/>
        })}
        </div>
     {/*   <div>
            <b>Loocking for job:</b> {profile.profilelookingForAJob ? 'Yes' : 'Not yet'}
        </div>*/}
    </div>
}
const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}</b>:{contactValue}</div>
}