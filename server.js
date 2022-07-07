const express = require('express')
const app = express()
const cors = require('cors')
const {MongoClient, ObjectId } = require('mongodb')
const { response } = require('express')
const { request } = require('http')
require('dotenv').config()
const PORT = process.env.PORT || 8000

let db,
    dbConnectionStr = process.env.DB_STRING,
    dbName = 'wines',
    collection

MongoClient.connect(dbConnectionStr)
    .then(client => {
        console.log(`Connected to database`)
        db = client.db(dbName)
        collection = db.collection('basic')
    })

app.use(express.urlencoded({extended : true}))
app.use(express.json())
app.use(cors())
app.set('view engine', 'ejs')
app.use(express.static("index.html"))


app.get("/", (request, response)=>{
    response.sendFile(__dirname + "/index.html" + "/assets" + "/images")
})

// app.get("/", (request, response) => {
//     response.sendFile("index.html", { root: "public" });
// });

app.get("/search", async (request,response) => {
    try {
        let result = await collection.aggregate([
            {
                "$search" : {
                    "autocomplete" : {
                        "query": `${request.query.query}`,
                        "path": "name",
                        "fuzzy": {
                            "maxEdits":2,
                            "prefixLength": 3
                        }
                    }
                }
            }
        ]).toArray()
        //console.log(result)
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
        //console.log(error)
    }
})

app.get("/get/:id", async (request, response) => {
    try {
        let result = await collection.findOne({
            "_id" : ObjectId(request.params.id)
        })
        response.send(result)
    } catch (error) {
        response.status(500).send({message: error.message})
    }
}
)

app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running.Please get them`)
})  