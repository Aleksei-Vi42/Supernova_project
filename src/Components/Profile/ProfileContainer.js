import React from "react"
import Profile from "./Profile"
import {connect} from "react-redux"
import {
    getProfileThunkCreator,
    getStatusThunkCreator,
    updateStatusThunkCreator,
    savePhotoThunkCreator,
    saveDescriptionThunkCreator
} from "../Redux/ProfileReduser"
import {Redirect, withRouter} from "react-router-dom"
import {authMeThunkCreator} from "../Redux/AuthReducer"
import {compose} from "redux"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"


class ProfileContainer extends React.Component {
    refreshProfile = () => {
        let userId = this.props.match.params.userId
        if (!userId) {
            userId = this.props.authId
        }
        this.props.getProfile(userId)
        this.props.getStatus(userId)
    }

    componentDidMount() {
        this.refreshProfile()
    }

    componentDidUpdate(prevProps, prevState) {
        if (this.props.match.params.userId != prevProps.match.params.userId) {
            this.refreshProfile()
        }
    }

    render() {
        return (
            <Profile {...this.props}
                     isOwner={!this.props.match.params.userId}
                     profile={this.props.profile}
                     status={this.props.status}
                     updateStatus={this.props.updateStatus}
                     savePhoto={this.props.savePhoto}
                     saveDescription={this.props.saveDescription}/>
        )
    }
}


let mapStateToProps = (state) => ({
    profile: state.profilePage.profile,
    isAuth: state.auth.isAuth,
    status: state.profilePage.status,
    authId: state.auth.id
})


export default compose(
    connect(mapStateToProps, {
        getProfile: getProfileThunkCreator,
        authMe: authMeThunkCreator,
        getStatus: getStatusThunkCreator,
        updateStatus: updateStatusThunkCreator,
        savePhoto: savePhotoThunkCreator,
        saveDescription: saveDescriptionThunkCreator
    }),
    withRouter,
    withAuthRedirect
)(ProfileContainer)