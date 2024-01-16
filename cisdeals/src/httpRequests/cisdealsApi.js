import {$host} from "./index";

export const getAllUsers = async () => {
    const {data} = await $host.get('/getAllUsers')
    return data
}
export const signUp = async (userData) => {
    const {data} = await $host.post('/users', userData)
    return data
}
export const logIn = async (credentials) => {
    const {data} = await $host.post('/auth', credentials)
    return data
}
export const userProfile = async (userid) => {
    const {data} = await $host.get('/user-profile/' + userid)
    return data
}
export const updateProfile = async (userid, updateData) => {
    const {data} = await $host.put('/update/' + userid, updateData)
    return data
}
export const uploadPhoto = async (userid, formData) => {
    const {data} = await $host.put('/uploadPhoto/' + userid, formData,{
        headers: {
            "Content-Type": "multipart/form-data",
        }})
    return data
}
export const moveToFront = async (userid, imageUrl) => {
    const {data} = await $host.put('/moveToFront/' + userid, {imageUrl})
    return data
}
export const removeImage = async (userid, imageUrl) => {
    const {data} = await $host.put('/removeImage/' + userid, {imageUrl})
    return data
}
export const createService = async (serviceData) => {
    const {data} = await $host.post('/create', serviceData)
    return data
}
export const viewServices = async (userid) => {
    const {data} = await $host.get('/viewbyid',{
        params: {
            postedBy: userid
        }
    })
    return data
}
export const deleteService = async (userid) => {
    const {data} = await $host.delete('/post-delete/' + userid)
    return data
}
export const servProfile = async (userid) => {
    const {data} = await $host.get('/servProfile/' + userid)
    return data
}
export const updateServ = async (userid, updateData) => {
    const {data} = await $host.put('/updateServ/' + userid, updateData)
    return data
}
export const saveUserProfile = async (userid, updateData) => {
    const {data} = await $host.put('/saveUser/' + userid, {updateData: updateData})
    return data
}
export const unSaveUserProfile = async (userid, updateData) => {
    const {data} = await $host.put('/unSaveUser/' + userid, {updateData: updateData})
    return data
}
export const getFavoritesUsers = async (queryParams) => {
    const {data} = await $host.get('/getFavoritesUsers',{params: queryParams})
    return data
}