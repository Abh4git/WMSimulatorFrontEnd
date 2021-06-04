import axios from 'axios';

class ApiService {

    API_URL = '';

    constructor() {
		this.API_URL = "http://vma48.scss.tcd.ie:8083/api/"; //For VM
        // this.API_URL = "http://localhost:8083/api/";
		
    }

    // Private function
    apiCall(method, endpoint, needsAuthentication = true, body = null, headers = null) {
        let tempHeaders = !!headers ? headers : {}
        if (needsAuthentication) tempHeaders['Authorization'] = `Bearer ${this.getToken()}`
        return axios({
            method,
            baseURL: this.API_URL,
            url: endpoint,
            headers: tempHeaders,
            data: body
        })
    }

    get(endpoint, needsAuthentication = true) {
        return this.apiCall('GET', endpoint, needsAuthentication)
    }

    post(endpoint, body, needsAuthentication = true) {
        return this.apiCall('POST', endpoint, needsAuthentication, body)
    }

    put(endpoint, body, needsAuthentication = true) {
        return this.apiCall('PUT', endpoint, needsAuthentication, body)
    }

    patch(endpoint, body, needsAuthentication = true) {
        return this.apiCall('PATCH', endpoint, needsAuthentication, body)
    }

    delete(endpoint, needsAuthentication = true) {
        return this.apiCall('DELETE', endpoint, needsAuthentication)
    }

    getToken() {
        const token = localStorage.getItem('accessToken')
        return !!token ? token : null
    }
}

export default new ApiService();