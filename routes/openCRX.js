const express = require('express')
const axios = require('axios');
const https = require("https");
const router = express.Router();
const httpsAgent = new https.Agent({ rejectUnauthorized: false });

const baseUrl = 'https://sepp-crm.inf.h-brs.de/opencrx-rest-CRX';
const credentials = {
  username: 'guest',
  password: 'guest'
};
const config = {
    headers: {
        'Accept': 'application/json'
    },
    httpsAgent: httpsAgent, // this was missing (for what is this)?
    auth: credentials,
};
router.get('/', async (req, res, next) => {

    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    const accounts = contacts.data.objects;
    res.send(accounts)
});

module.exports = router;