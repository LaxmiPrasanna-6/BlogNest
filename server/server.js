const exp=require('express')
const app=exp();
require('dotenv').config();
const mongoose=require('mongoose')
const userApp=require('./APIs/userApi');
const adminApp=require('./APIs/adminApi');
const authorApp=require('./APIs/authorApi');
const port=process.env.PORT || 4000
const cors=require('cors')
app.use(cors())
//db connection
app.set("trust proxy", true);
mongoose.connect(process.env.DBURL)
.then(()=>{
    app.listen(port,"0.0.0.0",()=>console.log('Connected to server',port))
    console.log("Database connection successful")
})
.catch(err=>{
    console.log("Error in db connection",err)
}
)

app.use(exp.json())
//handling requests sending to API
app.use('/user-api',userApp);
app.use('/admin-api',adminApp);
app.use('/author-api',authorApp);
app.use((err, req, res, next) => {
    console.log("err object in express error handler :", err)
    res.send({ message: err.message })
})
