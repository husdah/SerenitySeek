const express=require('express');
const dbConnect=require('./config/dbcon')

require('dotenv').config();

const app=express();

app.use(express.json())

app.get('/',(req,res)=>{
    res.json({mssg:"welcome to the app"})
})

dbConnect().then(()=>{
app.listen(process.env.PORT,()=>{
    console.log('app listen on port 4000')
})
}
)

