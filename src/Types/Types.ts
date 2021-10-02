export type photosType = {
    small: string | null
    large: string | null
}
export type contactsType = {
    github: string
    vk: string
    facebook: string
    instagram: string
    twitter: string
    website: string
    youtube: string
    mainLink: string
}
export type dataPostsType = {
    id: number
    message: string
    likeCount: number
}
export type profileType = {
    userId: number
    lookingForAJob: string
    lookingForAJobDescription: string
    fullName: string
    contacts: contactsType
    photos: photosType
}
export type usersType = {
    id: number
    name: string
    status: string
    photos: photosType
    followed: boolean
}