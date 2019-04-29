// implement your API here
const express = require('express')
const cors = require('cors')

const db = require('./data/db.js')

const server = express()

server.use(express.json())
server.use(cors())

server.get('/', (req, res) => {
    res.send('things are up and running!')
})

//Get list of all users
server.get('/api/users', (req, res) => {
    db
    .find()
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'The users information could not be retrieved.' })
    })
})

//Find user by ID
server.get('/api/users:id', (req, res) => {
    const userID = req.params.id
    console.log(userID);
    db
    .findByID(userID)
    .then(users => {
        res.json(users)
    })
    .catch(err => {
        res.status(404).json({ error: err, message: 'The user information could not be retrieved.' })
    })
})

//Add a new user to the list of users
server.post('/api/users', (req, res) => {
    const newUser = req.body;

    db
    .insert(newUser)
    .then(user => {
        res.status(201).json(user)
    })
    .catch(err => {
        res.status(500).json({ error: err, message: 'Error adding user' })
    })
})

//Update a user
server.put('/api/users/:id', (req, res) => {
    const userID = req.params.id
    const { name, bio } = req.body
    
    db
    .update(userID, req.body)
    .then(updated => {
        if (updated === 0) {
            res.status(404).json({ message: 'The user with the specific ID does not exist.' })
        }
        if ( !name && !bio ) {
            res.status(400).json({ message: 'Please provide name and bio for the user.'})
        }
        res.status(200).json(updated)
    })
    .catch(err => {
        res.status(500).json({ error: 'The user information could not be modified. '})
    })
})

//Delete a user

server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;

    db.remove(id)
        .then(user => {
            if (!user)
                return res.status(404).json({
                    message: "The user with the specified ID does not exist."
                });

            return res.status(200).json(user);
        })
        .catch(err => {
            res.status(500).json({ error: "The user could not be removed" });
        });
});


server.listen(5000, () => {
    console.log('server works')
});