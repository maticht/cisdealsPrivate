import axios from "axios";

const $host = axios.create({
    baseURL: 'http://localhost:8081'
})

//'http://localhost:8081'
//'http://bekend.server533906.nazwa.pl'

export {$host}
