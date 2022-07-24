// request -> routes -> controller -> model
import * as dotenv from 'dotenv'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'

dotenv.config()
const PORT = 5000
const dbConn = process.env.MONGODB_ATLAS
const app = express()

mongoose.connect(dbConn, 
  {}, 
  err => {
    if (err){
      console.log(err, "Database error!")
    } else {
      console.log("Connected to the database!")
    }
  }
  )

app.use(cors())
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.listen(PORT, () => {console.log(`Server is running on port: ${PORT}`)})