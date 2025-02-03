const mongoose = require("mongoose")
const { MONGODB_URI, PORT } = require("./utils/config")
const app = require("./utils/app")


console.log('database is connecting.....')

mongoose.connect(MONGODB_URI)
    .then(()=>{
        console.log('database connected successfully..')

        app.listen(PORT,  ()=>{
            console.log(`The server is running on http://localhost:${PORT}`)
        })

    })
    .catch((error) =>{
        console.log(`error connecting to the db:${error}`)
    })