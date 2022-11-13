const express = require('express');
const {MongoClient} = require("mongodb");

//  Connection URL
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);

//  DB Name
const dbName = 'MovieDB'


const router = express.Router();

/* GET movies listing. */
router.get('/:name', (req,res,next) => {
    client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('movies');

    collection.find({title: req.params.name}).toArray((err,results) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        res.send(results);
        // db.close();
    });
    // client.close();

/*    MongoClient.connect(url, (err,db) => {
        if (err) throw err;

        var dbo = db.db(dbName);
        var collection = dbo.collection('movies');

        collection.find({title: req.params.name}).toArray((err,results) => {
            if (err) {
                console.log(err);
                process.exit(0);
            }
            res.send(results);
            db.close();
        });
    });*/
});

router.get('/', function(req, res, next) {
    // res.send('respond with movies');
    client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('movies');

    collection.find({}).toArray((err,results) => {
        if (err) {
            console.log(err);
            process.exit(0);
        }
        res.send(results);
    });
});

module.exports = router;