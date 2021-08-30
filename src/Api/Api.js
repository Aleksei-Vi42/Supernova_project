import * as axios from "axios";

const instance = axios.create({
    baseURL : `https://social-network.samuraijs.com/api/1.0/`,
    withCredentials : true,
    headers: {
        'API-KEY': '9a67c6e1-af78-4de5-a37a-dd0a4cf2b48d'
    }
})

export const usersApi = {
    getUsers(currentPage = 1, pageSize = 10)  {
        return instance.get(`users?page=${currentPage}&count${pageSize}`, {
        }).then(response => response.data)
    },
    unFollowUsers(userId) {
    return instance.delete(`follow/${userId}`,{
        }).then(response => response.data)
    },
    followUsers(userId) {
        return instance.post (`follow/${userId}`,{},{
        }).then(response => response.data)
    },
    getProfile(userId) {
        debugger
        return instance.get(`profile/` + userId,{
        }).then(response => response.data)
    }

}
export const authApi = {
    getAuthMe() {
        return instance.get(`auth/me`,{
        }).then(response => response.data)
    },
}
