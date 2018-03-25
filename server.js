const express=require ('express');
const hbs=require ('hbs');
const fs=require('fs');
const port=process.env.PORT || 3000;

const app=express();

app.get('/',(req,res)=>{

//res.send("Hello apparao");
    res.send({

        name:'appu',
        books:[
            'one','two'
        ]

    });
});
hbs.registerPartials(__dirname+'/views/partials');

hbs.registerHelper('getCurrentYear',()=>{
return new Date().getFullYear();
});

hbs.registerHelper('screamIt',(text)=>{
     return text.toUpperCase();
});


app.set('view engines','hbs');


app.use((req,res,next)=>{

    var now= new Date().toString();
    var log=`${now}: time :: ${req.url} : ${req.method}`;
    console.log(log);
    fs.appendFile('server.log',log+'\n',(err)=>{
        if(err){
            console.log('not able to save in server.log');
        }

    });
    console.log(`${now}: time :: ${req.url} : ${req.method}`);
    next();

});

app.use((req,res,next)=>{

    //res.send('about call');
    res.render('maintenance.hbs');
});
app.use(express.static(__dirname+'/publicfiles'));
app.get('/',(req,res)=>{

    //res.send('about call');
    res.render('home.hbs',{
        pageTile: 'This is About pagess',
        currentyear: new Date().getFullYear()
    });
});
app.get('/about',(req,res)=>{

    //res.send('about call');
    res.render('about.hbs',{
        pageTile: 'This is About pagess',
        currentyear: new Date().getFullYear()
    });
});

app.listen(3000,  ()=> {
    //console.log('Example VGood app listening on port 3000!')
    console.log(`Example VGood app listening on port: ${port}`);
});