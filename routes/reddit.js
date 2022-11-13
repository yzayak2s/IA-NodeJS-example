const express = require('express');
const router = express.Router();
const request = require('request');

const options = {
    url: 'https://www.reddit.com/r/funny.json',
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Accept-Charset': 'utf-8',
        'User-Agent': 'my-reddit-client'
    }
};

/* GET funny.json from reddit. */
router.get('/', function(req, res, next) {
    res.send('Test')
});

/*request(options, (err,res,body) => {
    let json = JSON.parse(body);
    console.log(json);
} );*/

module.exports = router;