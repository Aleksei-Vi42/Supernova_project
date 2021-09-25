import {Field, reduxForm} from "redux-form"
import React from "react"
import {maxLenght, required} from "../../Utils/Validators"
import {Input} from "../Common/FormControl/InputControl"
import classes  from '../Common/FormControl/FormControl.module.css'

const maxLength30 = maxLenght(30)

const LoginForm = (props) => {
    return (
        <form onSubmit={props.handleSubmit}>
            <div>
                <Field placeholder={'email'}
                       name={'email'}
                       component={Input}
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <Field placeholder={'Password'}
                       type={'password'}
                       name={'password'}
                       component={Input}
                       validate={[required, maxLength30]}/>
            </div>
            <div>
                <Field component={'input'}
                       name={'rememberMe'}
                       type={'checkbox'}
                /> remember me
            </div>
            { props.error &&
                <div className={classes.loginFormError}>
                    {props.error}
            </div>}
            <div>
                <button>Login</button>
            </div>
            {props.captchaUrl && <img src={props.captchaUrl}/>}
            {props.captchaUrl &&  <Field placeholder={'symbols from image'}
                                         name={'captcha'}
                                         component={Input}
                                         validate={[required]}/>
            }
        </form>
    )
}

export const LoginReduxForm = reduxForm({form: 'login'})(LoginForm)

