const express = require('express');
const app = express();
const quotes = require("./quotes.json");
const userRoute = require('./routes/userRoute');
const noteRoute = require('./routes/noteRoute');
const mongoose = require("mongoose");
mongoose.set('strictQuery', false);

//middleware

app.use(express.json());
app.use((req,res,next) => {
    console.log("http method: " + req.method + "; URL - " + req.url);
    next();
})

app.use("/users", userRoute);
app.use("/note", noteRoute);

mongoose.connect("mongodb+srv://aviral:aviral@cluster0.czfjvmb.mongodb.net/?retryWrites=true&w=majority")
.then(() => {
    app.listen(8000,()=>{
        console.log("server started @ 8000")
    })
})
.catch((err) => {
    console.log("error hai db connect mein- ", err);
})
