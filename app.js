const express = require('express');

const path = require('path');

const fs = require('fs');

const app = express();

app.set('view engine','ejs');

app.use(express.static('./public'));

app.use(express.urlencoded({ extended: true }));




app.get('/', function(req, res){

    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
    res.render('dashboard',{users});

});

app.get('/create', function(req, res){

    res.render('adduser');

});



app.post('/create-data', function(req, res){

   

    fs.readFile('data/users.json', 'utf8', function readFileCallback(err, data){
        if (err){
            console.log(err);
        } else {
        obj = JSON.parse(data);
        obj.push(req.body); 
        json = JSON.stringify(obj); 
        fs.writeFile('data/users.json', json, 'utf8', function readFileCallback(err, data)
        {
            if (err)
            {
                console.log(err);
            } else 
            {
                console.log('data added');
                const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
                res.render('dashboard',{users});
            }
        }); 
    }});

  

});




app.get('/dashboard',function(req,res){ 
    const users = JSON.parse(fs.readFileSync(path.join(__dirname, 'data/users.json').toString()));
    res.render('dashboard',{users});

});

















app.listen(3000);