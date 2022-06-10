const express = require('express');
const app = express();
const mongoose = require('mongoose')
const bodyParser  = require('body-parser')
const cors = require('cors')
const Book = require('./models/Book');
//const Book = require('./models/Book');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/book')
mongoose.connection.on('connected',()=>{
    console.log('Database is connected')
})
mongoose.connection.on('error',()=>{
    console.log('error occured')
})
//middleware
app.use(cors())
app.use(express.json())

app.get('/',(req,res)=>{
    Book.find()
    .exec()
    .then(result=>{
        console.log(result);
        res.status(200).send(result)
    })
    .catch(err=>{
        res.status(500).send(err);
    })
})
app.post('/books',(req,res)=>{
     console.log(req.body.bookName)
     console.log(req.body.author)
     console.log(req.body.description)
     console.log(req.body.feedback)
     //res.send(req.body)
     const book = new Book({
       _id : new mongoose.Types.ObjectId,
       bookName:req.body.bookName,
       author:req.body.author,
       description:req.body.description,
       feedback:req.body.feedback
    })
    book.save()
    .then(result=>{
        console.log(result);
        res.status(200).json({msg:"successfully submitted"})
    }).catch(err=>{
        console.log(err);
        res.status(500).json({msg:"Error occured"})
    })

})

app.delete('/book/:id',(req,res)=>{
    const id = req.params.id;
    Book.remove({_id:id},(err,result)=>{
          if(err){
              console.log(err);
              res.status(500).send('error occured')
          }
          else{
              res.status(200).json({msg:"successfully deleted"})
          }
    })
})

app.put('/book/:id',(req,res)=>{
      const bookName = req.body.bookName;
      const author = req.body.author;
      const description = req.body.description;
      const feedback = req.body.feedback;
      const id = req.params.id;
      console.log(req.body)
      Book.updateMany({_id:id},{$set:{bookName:bookName,author:author,description:description,feedback:feedback}})
      .then(result=>{
            console.log(result);
            res.status(200).json({msg:"successfully updated"})
            //res.send("successfully updated")
            console.log("done")
      })
      .catch(err=>{
            console.log(err);
            res.status(500).json({msg:"error occurred"})
      })

})

app.listen(5000,()=>{
    console.log('server was connected on port:5000')
})
