import React from "react"
import {connect} from "react-redux"
import Users from "./Users"
import {
    setCurrentPage,
    toggleIsFollowingProgress, getUsersThunkCreator, unFollowThunkCreator, followThunkCreator
} from "../Redux/UsersReducer"
import {Loader} from "../Common/Preloader/Preloader"
import {withAuthRedirect} from "../../HOC/withAuthRedirect"
import {compose} from "redux"
import {
    getCurrentPage,
    getIsAuth,
    getIsDisabled,
    getIsFetching,
    getPageSize,
    getTotalUsersCount,
    getUsers
} from "./UsersReselect"


class UsersContainer extends React.Component {

    componentDidMount() {
        this.props.requestUsers(this.props.currentPage, this.props.pageSize)
    }

    onPageChanged = (pageNumber) => {
        this.props.setCurrentPage(pageNumber)
        this.props.requestUsers(pageNumber)
    }

    render() {
        return <>
        {/*    {this.props.isFetching ? <Loader/> : null}*/}
            <Users totalUsersCount={this.props.totalUsersCount}
                   pageSize={this.props.pageSize}
                   currentPage={this.props.currentPage}
                   users={this.props.users}
                   unfollow={this.props.unFollowThunkCreator}
                   follow={this.props.followThunkCreator}
                   onPageChanged={this.onPageChanged}
                   toggleIsFollowingProgress={this.props.toggleIsFollowingProgress}
                   isDisabled={this.props.isDisabled}
                   isFetching={this.props.isFetching}

            />
        </>
    }
}

let mapStateToProps = (state) => {
    return {
        users: getUsers(state),
        pageSize: getPageSize(state),
        totalUsersCount: getTotalUsersCount(state),
        currentPage: getCurrentPage(state),
        isFetching: getIsFetching(state),
        isDisabled: getIsDisabled(state),
        isAuth: getIsAuth(state),
    }
}

export default compose(
    connect(mapStateToProps, {
            setCurrentPage,
            toggleIsFollowingProgress,
            unFollowThunkCreator,
            followThunkCreator,
            requestUsers: getUsersThunkCreator
        }
    ),
   /* withAuthRedirect*/
)(UsersContainer)

