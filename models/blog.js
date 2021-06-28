var mongoose=require('mongoose');
var Schema=mongoose.Schema;

var blogschema=new Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true

    }
},{timestamps:true});

var Blog=mongoose.model('Blog',blogschema);



module.exports=Blog;