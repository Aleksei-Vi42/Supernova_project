import React from "react"
import Header from "./Header"
import  {logoutUserThunkCreator} from "../Redux/AuthReducer"
import {connect} from "react-redux"
import {getUsers} from "../Users/UsersReselect";

class HeaderContainer extends React.Component {
    render() {
        return <Header {...this.props}/>
    }
}

let mapStateToProps = (state) => ({
    isAuth: state.auth.isAuth,
    login: state.auth.login,
    users: getUsers(state)
})

export default connect(mapStateToProps, {logOut: logoutUserThunkCreator})(HeaderContainer)