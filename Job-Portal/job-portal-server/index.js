const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 5000
require('dotenv').config()

// Middleware
app.use(cors())
app.use(express.json())
app.use('/image', express.static('image'))
const path = require("path")
const multer = require('multer')
app.use(express.urlencoded({ extended: false }))

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
        const registeredUsers = db.collection('registeredUsers')

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

        // Get Job by ID
        app.get('/all-jobs/:id', async (req, res) => {
            const id = req.params.id
            const jobs = await jobsCollections.findOne({
                _id: new ObjectId(id)
            })
            res.send(jobs)
        })

        // Get Profile Image By ID
        app.get('/get-profile/:id', async (req, res) => {
            const id = req.params.id
            try {
                const image = await registeredUsers.findOne({
                    _id: new ObjectId(id)
                })

                res.set('Content-type', 'image/jpeg').send(image)
            } catch (err) {
                res.send(err)
            }
        })

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

        // Update Method
        app.patch('/update-job/:id', async (req, res) => {
            const id = req.params.id
            const jobData = req.body
            const filter = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const updateDoc = {
                $set: {
                    ...jobData
                },
            }
            const result = await jobsCollections.updateOne(filter, updateDoc, options)
            res.send(result)
        })

        // Login
        app.post('/login', async (req, res) => {
            const { email, password } = req.body
            try {
                const result = await registeredUsers.findOne({
                    $or: [{
                        email: email,
                        password: password
                    }]
                })
                result ? res.status(200).send(result) : res.status(401).json({ message: 'Email and Password are Incorrect!!' })
            } catch (err) {
                console.log(err)
            }
        })

        // Image Upload Config's
        let imageName = "";
        const storage = multer.diskStorage({
            destination: path.join("./image"),
            filename: function (req, file, cb) {
                imageName = Date.now() + path.extname(file.originalname);
                cb(null, imageName);
            },
        });
        const upload = multer({
            storage: storage,
            limits: { fileSize: 3000000 },
        }).single("file");

        // Image Upload
        app.post('/upload-image', async (req, res) => {
            upload(req, res, (err) => {
                if (err) {
                    console.log(err);
                } else {
                    return res.status(201).json({
                        imageUrl: `http://localhost:5000/image/${imageName}`
                    })
                }
            })
        })

        // Sign-up
        app.post('/signup', async (req, res) => {
            const newUser = req.body
            const { email } = req.body
            try {
                const exitingUser = await registeredUsers.findOne({
                    $or: [{
                        email: email
                    }]
                })
                if (exitingUser) {
                    res.status(403).json({ message: 'Email already exists' })
                } else {
                    newUser.createAt = new Date()
                    const result = await registeredUsers.insertOne(newUser)
                    result.acknowledged ? res.status(200).send(result) : res.status(500).json({ message: 'Internal Server Error, Please try again!!' })
                }
            } catch (err) {
                console.log(err)
            }
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