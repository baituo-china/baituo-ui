import axios from 'axios';
var jsonMimeType = 'application/json';
var instance = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': jsonMimeType,
        Accept: jsonMimeType,
        'X-Requested-With': 'XMLHttpRequest'
    }
});
// http response 拦截器
instance.interceptors.response.use(function (response) {
    var status = response.status,
        data = response.data;

    if (status === 204) {
        return response;
    }
    if (data.success === false) {
        throw data;
    } else {
        return data;
    }
});
export default instance;