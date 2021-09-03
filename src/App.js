import './App.css'
import React from 'react'
import {BrowserRouter, Route} from "react-router-dom";
import NavBar from './Components/NavBar/NavBar'
import ProfileContainer from './Components/Profile/ProfileContainer'
import News from "./Components/News/News";
import Music from "./Components/Music/Music";
import Setting from "./Components/Setting/Setting";
import DialogsContainer from "./Components/Dialogs/DialogsContainer";
import UsersContainer from "./Components/Users/UsersContainer";
import HeaderContainer from "./Components/Header/HeaderContainer";
import LoginPage from "./Components/Login/LoginPage";
import {connect} from "react-redux";
import {authMeThunkCreator} from "./Components/Redux/AuthReduser";
import {initializingApp} from "./Components/Redux/AppReduser";
import {Loader} from "./Components/Common/Preloader/Preloader";


class App extends React.Component {
    componentDidMount() {
        this.props.initializingApp()
    }

    render() {
        if (!this.props.initialized) {
            return <Loader/>
        }
        return (
            <BrowserRouter>
                <div className='app-wrapper'>
                    <HeaderContainer/>
                    <NavBar/>
                    <div className='app-wrapper-content'>
                        <Route path='/login' render={() => <LoginPage/>}/>
                        <Route path='/dialogs' render={() => <DialogsContainer/>}/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>}/>
                        <Route path='/news' render={() => <News/>}/>
                        <Route path='/music' render={() => <Music/>}/>
                        <Route path='/setting' render={() => <Setting/>}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                    </div>
                </div>
            </BrowserRouter>

        )
    }
}

const mapStateToProps = (state) => ({
    initialized: state.app.initialized
})


export default connect(mapStateToProps, {initializingApp})(App);
