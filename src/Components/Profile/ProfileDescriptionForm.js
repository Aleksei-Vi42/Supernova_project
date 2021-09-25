import React from "react"
import classes from "./Profile-info.module.css"
import {Field, reduxForm} from "redux-form"
import {Input} from "../Common/FormControl/InputControl"

const ProfileDescriptionForm = ({handleSubmit, profile, error}) => {
    return  <form onSubmit={handleSubmit}>
     <div><button>save</button></div>
        {error &&
        <div className={classes.contactFormError}>
            {error}
        </div>}
        <div>
            <b>My name:</b> <Field placeholder={'Full name'}
                                   name={'fullName'}
                                   component={'input'}/>
        </div>
        <div>
            <b>About me:</b><Field placeholder={'About me'}
                                   name={'aboutMe'}
                                   component={'input'}/>
        </div>
        <div>
            <b>Contacts</b>: {Object.keys(profile.contacts).map(key => {
            return <div>
            <d>{key}: <Field placeholder={key}
                                name={'contacts.' + key}
                                component={'input'}/>
            </d>
            </div>
        })}
        </div>
    </form>
}
const Contact = ({contactTitle, contactValue}) => {
    return <div><b>{contactTitle}:</b>  <Field placeholder={'contact'}
                                            name={'key'}
                                            component={'input'}/>
          </div>
}
export const ProfileDescriptionReduxForm = reduxForm({form: 'description'})(ProfileDescriptionForm)