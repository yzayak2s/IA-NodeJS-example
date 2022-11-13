const express = require('express');
const axios = require('axios');
const qs = require('querystring');
const https = require("https");
const router = express.Router();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const baseUrl = 'https://sepp-hrm.inf.h-brs.de/symfony/web/index.php';
let accessToken = null;

const body = qs.stringify({
    client_id: 'api_oauth_id',
    client_secret: 'oauth_secret',
    grant_type: 'password',
    username: 'demouser',
    password: '*Safb02da42Demo$'
});

const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Accept': 'application/json'
    },
    httpsAgent: httpsAgent, // this was missing (for what is this)?
};

router.get('/', async (req, res, next) => {

    const result = await axios.post(`${baseUrl}/oauth/issueToken`, body, config);
    if (result.data.error) {
        throw Error(res.data.error);
    }
    accessToken = result.data['access_token'];
    // res.send(accessToken)

    const config2 = {
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/x-www-form-urlencoded',
            'Accept': 'application/json'
        },
        httpsAgent: httpsAgent, // this was missing (for what is this)?
    };

    const response = await axios.get(`${baseUrl}/api/v1/employee/search`, config2);
    res.send(response.data)
});

module.exports = router;