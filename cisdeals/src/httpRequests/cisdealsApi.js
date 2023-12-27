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


















export const createCountry = async (country) => {
    const {data} = await $host.post('api/country', country)
    return data
}

export const deleteCountry = async (id) => {
    const {data} = await $host.post('api/country/delete', id)
    return data
}

export const createLanguage = async (language) => {
    const {data} = await $host.post('api/language', language)
    return data
}

export const deleteLanguage = async (id) => {
    const {data} = await $host.post('api/language/delete', id)
    return data
}

export const getAllLanguages = async () => {
    const {data} = await $host.get('api/language')
    return data
}

export const createGenre = async (genre) => {
    const {data} = await $host.post('api/genre', genre)
    return data
}

export const getAllGenres = async () => {
    const {data} = await $host.get('api/genre',)
    return data
}

export const deleteGenre = async (id) => {
    const {data} = await $host.post('api/genre/delete', id)
    return data
}

export const createRadio = async (radio) => {
    const {data} = await $host.post('api/radio', radio)
    return data
}

export const getRadios = async (country_id, genre_id, page, limit, searchName, radio_id, bitrate) => {
    const {data} = await $host.get('api/radio', {
        params:
            {
                country_id, genre_id, page, limit, searchName, radio_id, bitrate
            }
    })
    return data
}

export const getFavoritesRadios = async(ids)=>{
    const {data} = await $host.post('api/radio/favorites', {ids})
    console.log('запрос отработал')
    return data
}

export const deleteRadio = async (id) => {
    const {data} = await $host.post('api/radio/delete/' + id, id)
    return data
}
export const incrementBitrate = async (link) => {
    const {data} = await $host.get('api/radio/incrementBitrate/' + link)
    return data
}
export const decrementBitrate = async (link) => {
    const {data} = await $host.get('api/radio/decrementBitrate/' + link)
    return data
}

export const updateRadio = async (radio) => {
    console.log('popal2')
    const {data} = await $host.post('api/radio/upd', radio)
    return data
}

export const fetchOneRadio = async (id) => {
    const {data} = await $host.get('api/radio/' + id)
    return data
}

export const fetchOneRadioByLink = async (link) => {
    const {data} = await $host.get('api/radio/link/' + link)
    return data
}

export const fetchCurrentMusicName = async (radio) => {
    const {data} = await $host.post('api/radio/musicName/' + radio.id, radio)
    return data
}

export const createCustomError = async (customError) => {
    const {data} = await $host.post('api/customError', customError)
    return data
}

export const deleteCustomError = async (id) => {
    const {data} = await $host.post('api/customError/delete', id)
    return data
}

export const getAllCustomErrors = async () => {
    const {data} = await $host.get('api/customError')
    return data
}

export const createCustomRating = async (customError) => {
    const {data} = await $host.post('api/customRating', customError)
    return data
}

export const deleteCustomRating = async (id) => {
    const {data} = await $host.post('api/customRating/delete', id)
    return data
}

export const getAllCustomRating = async () => {
    const {data} = await $host.get('api/customRating')
    return data
}

export const createCustomMessage = async (customError) => {
    const {data} = await $host.post('api/customMessage', customError)
    return data
}

export const deleteCustomMessage = async (id) => {
    const {data} = await $host.post('api/customMessage/delete', id)
    return data
}

export const getAllCustomMessages = async () => {
    const {data} = await $host.get('api/customMessage')
    return data
}
// export const calculateAudioBitrate = async (radio)=>{
//     const {data} = await $host.post('api/radio/bitrate/'+radio.id, radio)
//     return data
// }
