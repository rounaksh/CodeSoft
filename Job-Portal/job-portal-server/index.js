const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

// Middleware
app.use(express.json())
app.use(cors())

// user: rounak0734
// pss: aBSlkCktNomLUhqd

const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@mern-job-portal.yk9syjv.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Create Database
        const db = client.db('mernJobPortal')
        const jobsCollections = db.collection('demoJobs')

        // Post Method
        app.post('/post-job', async (req, res) => {
            const body = req.body
            body.createAt = new Date()
            const result = await jobsCollections.insertOne(body)
            if (result.insertedId) return res.status(200).send(result)
            else return res.status(500).send({
                message: 'Something went wrong! try again later',
                status: false
            })
        })

        // Get Method
        app.get('/all-jobs', async (req, res) => {
            const jobs = await jobsCollections.find({}).toArray()
            res.send(jobs)
        })

        // Get Jobs by email
        app.get('/myJobs/:email', async (req, res) => {
            const email = req.params.email
            const jobs = await jobsCollections.find({ postedBy: email }).toArray()
            res.send(jobs)
        })

        // Delete Method
        app.delete('/job/:id', async (req, res) => {
            const id = req.params.id
            const filter = { _id: new ObjectId(id) }
            const result = await jobsCollections.deleteOne(filter)
            res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
    res.send('hello world')
})

app.listen(port, () => {
    console.log(`listning on port ${port}`)
})