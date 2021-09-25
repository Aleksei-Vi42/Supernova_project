import React from "react"
import classes from "./Header.module.css"
import {NavLink} from "react-router-dom"
import {Loader} from "../Common/Preloader/Preloader";
import userPhoto from "../../Assets/images/av2.png";

const Header = (props) => {
    return (
        <div className={classes.header}>
            <div>
                Logo
            </div>
            <div className={classes.login}>
                {props.isAuth
                    ? <div>{props.login}
                        <img src={props.users.photos != null ? props.users.photos: userPhoto}
                             className={classes.userPhoto}/>   <button onClick={props.logOut}>Log out</button>
                    </div>
                    : <NavLink to={'/login'}>
                       <div>
                        Login
                       </div>
                      </NavLink>
                }
            </div>
        </div>
    )
}

export default Header