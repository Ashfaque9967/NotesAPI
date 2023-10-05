const express = require("express");
const app = express();
const userRouter = require("./routes/userRoutes");
const noteRouter = require("./routes/noteRoutes");
const dotenv = require("dotenv");
const cors = require("cors");


dotenv.config({ path : "C:\Users\shaik\NoteAPI/.env"});

const mongoose = require("mongoose");

app.use(express.json());

app.use(cors());

app.use("/users", userRouter);
app.use("/notes", noteRouter);

const PORT = process.env.PORT || 3000;

mongoose.connect("mongodb+srv://admin:admin@mumbai.rtj7cio.mongodb.net/notes_db")
.then(()=>{

app.listen(PORT, ()=>{

    console.log("Server started on port no. " + PORT);

});

})
.catch((error)=>{
    console.log(error);
});

app.get("/", (req, res) =>{

    res.send("Notes API ASHDEV");

});

