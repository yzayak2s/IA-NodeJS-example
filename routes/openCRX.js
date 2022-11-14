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

router.get('/account', async (req, res, next) => {

    const contacts = await axios.get(`${baseUrl}/org.opencrx.kernel.account1/provider/CRX/segment/Standard/account`, config);
    const accounts = contacts.data.objects

    var salesMenArray = []
    var customersArray = []

    accounts.map((value) => {
        if (value['@type'].endsWith('LegalEntity')) {
            customersArray.push(value);
        }
        if (value['jobTitle'] && value['jobTitle'] === 'Senior Salesman') {
            salesMenArray.push(value);
        }
    });

    res.send([customersArray,salesMenArray])
});

router.get('/product', async (req, res, next) => {

    const response = await axios.get(`${baseUrl}/org.opencrx.kernel.product1/provider/CRX/segment/Standard/product`, config);
    const products = response.data.objects;

    res.send(products)
});

router.get('/salesOrder', async (req, res, next) => {

    const response = await axios.get(`${baseUrl}/org.opencrx.kernel.contract1/provider/CRX/segment/Standard/salesOrder`, config);
    const salesOrders = response.data.objects;

    res.send(salesOrders)
});

module.exports = router;