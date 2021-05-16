const express = require('express');
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
const { MongoClient } = require('mongodb');

const dbURI = 'mongodb://localhost:27017';
const client = new MongoClient(dbURI);


app.get("/",(req, res)=>{
    res.send("hello");
});


app.post('/post',(req, res)=>{
    // console.log("this is the posted name: " + req.body.contact_name);
    (async function(){
        try {
        await client.connect();
        const db = client.db('imaginaries');
        const collection = db.collection('main-chars');

        let db_response = await collection.insertOne({
            "name" : req.body.char_name,
            "species" : req.body.species,
            "age" : req.body.age,
            "arcanetype" : req.body.arcanetype,
            "left_eye_color" :req.body.left_eye_color,
            "right_eye_color" : req.body.right_eye_color,
            "majik_color" : req.body.majik_color,
            "importance" : req.body.importance,
        })

        console.log("db output: " + db_response);
        res.json({"success" : true});
        } catch (error) {
            console.log("error in try block -- post: " + error);
        }
    })();
});

app.post("/filterData", (req, res) => {
    let name = req.body.char_name;
    (async function(){
        try {
        await client.connect();
        const db = client.db('imaginaries');
        const collection = db.collection('main-chars');

        const find_result = await collection.find({"name" : name}).toArray();
        console.log(find_result);
        res.json({"success" : true, "data" : find_result[0] });
        } catch (error) {
            console.log("error in try block -- filter data: " + error);
        }
    })();
});


app.get("/getAll", (req, res) => {
    (async function(){
        try {
        await client.connect();
        const db = client.db('imaginaries');
        const collection = db.collection('main-chars');

        const all_results = await collection.find({}).toArray();
        console.log(all_results);
        res.json({"success" : true, data: all_results});
        } catch (error) {
            console.log("error in try block -- getAll: " + error);
        }
    })();
});

app.listen(5000, function(){
    console.log("server running on port 5000");
});