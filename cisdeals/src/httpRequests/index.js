import axios from "axios";

const $host = axios.create({
    baseURL: 'https://backend.nashedelo.pl'
})
// https://backend.nashedelo.pl
// https://backend.nashedelo.pl
//'http://localhost:8081'
//'http://bekend.server533906.nazwa.pl'

export {$host}
