const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const MongoClient = require('mongodb').MongoClient;
const ObjectId = require('mongodb').ObjectId;
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.sioj4.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

const app = express()
app.use(bodyParser.json());
app.use(cors());


const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(err => {
    const dataCollection = client.db("visualizationDashboard").collection("data");

    app.post("/addAllData", (req, res) => {
        const data = req.body;
        dataCollection.insertMany(data)
            .then(result => {
                console.log(result);
                res.send(result.insertedCount > 0);
            })
    })

    app.get('/allData', (req, res) => {
        dataCollection.find({})
            .toArray((err, data) => {
                res.send(data)
            })
    })

});




app.get('/', function (req, res) {
    res.send('hello world')
})
app.listen(process.env.PORT || 5000);
