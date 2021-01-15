const axios = require("axios");

const requestService = {
    get: (url) => {
       return axios.get(url)
            .then((res) => {
                return res.data;
            })
            .catch((err) => {
                throw err;
            })
    }
}

module.exports = requestService;