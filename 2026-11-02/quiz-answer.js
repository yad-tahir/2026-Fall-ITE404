//Q1: Write nodejs code to store a cookie on the client side. The cookie should expire after 3 weeks and it should hold all the numbers between -200 and 2000.



const express = require('express');
const cookieParser = require('cookie-parser'); // Import cookie-parser
const app = express();
const port = 3000;

app.use(cookieParser());
app.use(express.json());

app.get('/', function (req,res){
    let data =  [];

    for(let i=-200; i < 2001; i++){
	// data[i+200] = i;
	data.push(i);
    }
    const dataJSON = JSON.stringify(data);

    res.cookie('data', dataJSON, {
	maxAge: 1000 * 60 * 60 * 24 * 7 * 3
    });

});

app.listen(port, function () {
	console.log(`Server is running on http://localhost:${port}`);
});
