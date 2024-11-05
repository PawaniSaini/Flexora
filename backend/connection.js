const mongoose=require('mongoose');

const url="mongodb://localhost:27017/"
//asynchronous function - Promise object
mongoose.connect(url)
.then((result) => {
    console.log('database connected');
})
.catch((err) => {
   console.log(err); 
});

module .exports=mongoose;