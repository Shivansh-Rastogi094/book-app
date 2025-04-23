const express=require('express')
const cors=require('cors')
const mongoose=require('mongoose')
const dotenv=require('dotenv')
const app=express();
app.use(express.json());
app.use(cors())
dotenv.config()
// connect mongoDB
mongoose
    .connect(process.env.MONGODB_URI)
    .then(()=>console.log("connected to Mongo db"))
    .catch((error)=> console.log("error in connection",error));

    // design book schema

const BookSchema=new mongoose.Schema({
    title:String,
    author:String,
    date:String,
    image:String
})

// design model
const Book=mongoose.model('MyBook',BookSchema)

app.post('/books', async (req, res) => {
    try {
        const newBook = new Book(req.body);
        await newBook.save();
        res.status(200).send('book added');
    } catch (error) {
        console.error("Error saving book:", error.message);
        res.status(500).send('Server Error');
    }
});


app.listen(9000,()=>{
    console.log('Server is running on port 9000')
})


app.get('/books', async(req,res)=>{
    try{
        const Books=await Book.find();
        res.json(Books);
    }catch(error){
        console.log(error);
        res.status(500).send('Server Error')
    }
})