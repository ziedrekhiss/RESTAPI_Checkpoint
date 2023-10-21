const express = require ("express")
const app = express()
require('dotenv').config();
const connectDB = require ("./config/database.js")
const userRouter = require ("./routes/user.js")
app.use(express.json());

const port = 3000

connectDB();


app.use("/api/user", userRouter)

app.listen(port, (err)=>{
    err? console.log(err,'error'): console.log(`server run on port ${port}`);
    
})