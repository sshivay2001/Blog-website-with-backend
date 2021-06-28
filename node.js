var express=require('express');
var app=express();
var morgan=require('morgan');
var mongoose=require('mongoose');
var Blog=require('./models/blog');


var mongo='mongodb+srv://shivay:blog1234@cluster0.g2zwh.mongodb.net/blogs?retryWrites=true&w=majority';

mongoose.connect(mongo,{useNewUrlParser:true,useUnifiedTopology:true})
.then((result)=>console.log("connected!"))
.catch((err)=>console.log(err));


app.set('view engine','ejs');
app.listen(3000);

app.use(express.static('public'));

app.use(morgan('dev'));
app.use(express.urlencoded({extended:true}));

app.get('/', (req,res)=>{
   
    res.redirect('blogs');
});
app.get('/about', (req,res)=>{
    res.render('about',{title:'About'});
});

//Just to check whether all blogs are logged or not
/*app.get('/all-blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
  
    });
})*/

app.get('/blogs',(req,res)=>{
    Blog.find()
    .then((result)=>{
        res.render('home',{title:'Blogs',blogs:result})
    })
    .catch((err)=>{
        console.log(err);
  
    });
})

app.get('/create',(req,res)=>{
    res.render('create',{title:"Create Blog"});
});

app.post('/blogs',(req,res)=>{
    var blogs=new Blog(req.body);

    blogs.save()
    .then((result)=>{
        res.redirect('/blogs');
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.get('/blogs/:id',(req,res)=>{
    var id = req.params.id;
    Blog.findById(id)
    .then((result)=>{
        res.render('Blog Details',{blog:result,title:'Blog Page'});
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.delete('/blogs/:id',(req,res)=>{
    var id=req.params.id;

    Blog.findByIdAndDelete(id)
    .then((result)=>{
        res.json({redirect:'/blogs'})
    })
    .catch((err)=>{
        console.log(err);
    });
});

app.use((req,res)=>{
    res.status(404).render('4O4',{title:"404"});
});