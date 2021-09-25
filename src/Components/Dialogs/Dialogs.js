import classes from "./Dialogs.module.css"
import Message from "./Message"
import DialogItem from "./DialogItem"
import React from "react"
import {Redirect} from "react-router-dom"
import {Field, Form, reduxForm} from "redux-form"
import {Textarea} from "../Common/FormControl/TextAreaControl"
import {maxLenght, required} from "../../Utils/Validators"

const maxLength100 = maxLenght(100)

const Dialogs = (props) => {

    let dialogs = props.dialogPage.dataMessages.map(d => <Message key={d.id} text={d.message} id={d.id}/>)

    let nameUsers = props.dialogPage.dataUsers.map(user => <DialogItem key={user.id} name={user.name} id={user.id}/>)

    let addNewMessage = (value) => {
        props.addMessage(value.newMessageText)
    }

    if (props.isAuth === false) {
        return <Redirect to={'/login'}/>
    }
    return (
        <div className={classes.dialogs}>
            <div className={classes.dialogItems}>
                <div>
                    {nameUsers}
                </div>
            </div>
            <div className={classes.messages}>
                {dialogs}
            </div>
            <div>
               <AddMessageReduxForm onSubmit={addNewMessage}/>
            </div>
        </div>
    )
}

const addMessageForm = (props) => {
    return (
        <Form onSubmit={props.handleSubmit}>
                <Field component={Textarea}
                       name='newMessageText'
                       placeholder='add message'
                       validate={[required, maxLength100]}/>
            <button>
                send
            </button>
        </Form>
    )
}

const AddMessageReduxForm = reduxForm ({form: 'newMessage'})(addMessageForm)

export default Dialogs