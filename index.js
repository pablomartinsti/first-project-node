const express = require('express')
const uuid = require('uuid')
const cors = require('cors')


const port = 3001

const app = express()
app.use(express.json())
app.use(cors())

const users = []

const checkUserId = (resquest,response ,next) =>{
    const {id} = resquest.params

    const index = users.findIndex(user => user.id === id)

    if(index < 0){
        return response.status(404).json({erro : "user not found"})
    }


    resquest.UserIndex = index
    resquest.userId = id

    next()
}





app.get('/users', (resquest, response) => {

    return response.json(users)
})

app.post('/users', (resquest, response) => {
    const { name, age } = resquest.body
    

    const user = { id: uuid.v4(), name, age }

    users.push(user)

    return response.status(201).json(user)
})

app.put('/users/:id',checkUserId, (resquest, response) => {
    
    const {name ,age} = resquest.body
    const index = resquest.UserIndex
    const id =resquest.userId

    const updatedUser = {id ,name ,age}

   

    users [index] = updatedUser

    return response.json(updatedUser)
})

app.delete('/users/:id',checkUserId, (resquest, response) => {
    const index = resquest.UserIndex
   

   
        users.splice(index, 1)

    return response.status(204).json(users)
})


app.listen(port, () => {
    console.log(`🚀🚀 server started on port ${port}`)
})