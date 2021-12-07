const express = require('express');
const app = express();
const bodyparser = require('body-parser')
const mongoose = require('mongoose');
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));
const Usermodal = require('./src/modals/UserModal')
const autherModal = require('./src/modals/author')
const bookModal = require('./src/modals/book');
const bookingModal = require('./src/modals/booking');
const roommodal = require('./src/modals/room');


//database connection
 mongoose.connect('mongodb://localhost:27017/student',()=>{
     console.log("Database Connected")
});


//POST :/create
app.post('/createUser' , (req , res)=>{
   
    Usermodal.create(req.body).then((user)=>{
    if(!user){
        res.send("Empty user")
        //checking user
    }else{
        res.send(user)   
    }

      

    }).catch((err)=>{
        console.log(err);
        res.send("error")
    });

});

// //find a user
// app.get('/:id' , (req , res)=>{
//     console.log(req)
//     Usermodal.findOne({_id:req.params.id}).then((user)=>{
//          res.send(user)

//     }).catch((err)=>{
//         console.log(err)
//         res.send("err")
//     })
// })

// /get all users
// app.get('/' , (req , res)=>{
  
//     Usermodal.find().then((users)=>{
//         res.send(users)


//     }).catch((err)=>{
//         console.log(err)
//         res.send("err")
//     })

// })

// //delete
// app.delete('/:id',(req,res)=>{
//     Usermodal.deleteOne({_id:req.params.id}).then((user)=>{
//         console.log(user)
//         res.send("deleted "+req.params.id);
//     }).catch((err)=>{
//         console.log(err)
//         res.send("err")
//     })
// })

// //upfated
// app.put('/:id', (req ,res)=>{
//     Usermodal.updateOne({_id:req.params.id}, {$set:{email:req.body.email , password:req.body.password}})
//     .then((updated)=>{
//            res.send(updated)     
//     }).catch((err)=>{
//         console.log(err)
//         res.send("err")
//     })
// })

// //==================================== one to many ================================ //

// app.post('/createAuthor' , async (req , res)=>{
    
//      const createAuthor = await autherModal.create(req.body);
//      if(createAuthor){
//          res.send(createAuthor)
//      }
//      else{
//         res.send("error")
//      }

  
//})

// app.post('/addBook' ,async(req , res)=>{
    
//     const Createdbook = await book.create({"Bookname":req.body.Bookname});
//     const getauthor = await autherModal.findByIdAndUpdate(req.body.authorId,{$push:{books:Createdbook._id}});

//     const findUpdatedModal = await autherModal.findOne({_id:req.body.authorId});

//     if(findUpdatedModal){
//         res.send(findUpdatedModal)
//     }
//     else{
//         res.send("no data found")
//     }


// })

app.post('/addAuthor' ,async (req , res)=>{

        const author = await autherModal.create(req.body);

        if(author){
            res.send(author)
        }
        else{
            res.send("error")
        }
  

})

app.post('/addBook' ,async (req , res)=>{

        const authorId = req.body.authorId;
        const Bookname = req.body.Bookname;
    
        //create book
        const createdBook = await bookModal.create({"Bookname":Bookname});
    
        //find autor and update schama
        const updatedAuthor = await autherModal.findByIdAndUpdate(authorId,{$push:{"books":createdBook._id}});
        
        const author = autherModal.findOne({_id:updatedAuthor._id});
        res.send(author);

   
     

})

//one booking have meny rooms
//===add ADD booking==========
app.post('/room',async (req,res)=>{
    const room = await roommodal.create(req.body);
    if(room){
        res.send(room)
    }else{
        res.send("error")
    }
})



//=======ADD Rbooking===========
app.post('/booking' ,async (req , res)=>{
try {
    const  bookedID = req.body.bookedID;
    const roomNo = req.body.roomNo;
    
    //create new booking
    const booked = await book.create({"roomNo":roomNo});

    //find room and update bookingschama
    const updatedBooking = await bookingModal.findByIdAndUpdate(bookedID ,{$push:{"room":createdRoom._id}});
    
    const booking = bookingModal.findOne({_id:updatedBooking._id});
    res.send(booking);
    
} catch (error) {
    console.log(error)
    res.send("Error"+error)
}        
    
});




//connection port
app.get('/',(req,res)=>{
    try {
        res.send('Connected 4000 ')
    } catch (error) {
        console.log(error)
        res.send("err")
    }

})


//========================  Server  ================== //
app.listen('4000',()=>{
    console.log("Server running on port 4000")
})


