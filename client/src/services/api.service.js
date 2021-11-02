import axios from 'axios';

class ApiService {

    API_URL = '';

    constructor() {
	
        this.API_URL = "http://localhost:5000/api/";
		
    }

    // Private functions
    async apiCall(method, endpoint, needsAuthentication = true, body = null, headers = null) {
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

    async get(endpoint, needsAuthentication = true) {
        return this.apiCall('GET', endpoint, needsAuthentication)
    }

    async post(endpoint, body, needsAuthentication = true) {
        return this.apiCall('POST', endpoint, needsAuthentication, body)
    }

    async put(endpoint, body, needsAuthentication = true) {
        return this.apiCall('PUT', endpoint, needsAuthentication, body)
    }

    async patch(endpoint, body, needsAuthentication = true) {
        return this.apiCall('PATCH', endpoint, needsAuthentication, body)
    }

    async delete(endpoint, needsAuthentication = true) {
        return this.apiCall('DELETE', endpoint, needsAuthentication)
    }

    getToken() {
        const token = localStorage.getItem('accessToken')
        return !!token ? token : null
    }
}

export default new ApiService();