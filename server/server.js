const express = require('express');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();

app.use((req, res, next) => {
    console.log(req.originalUrl);
    next();
});

app.use(express.static(path.join(__dirname, '../public')));

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    res.send('Hello from the web server side...');
});

app.post('/formsubmissions', (req, res) => {
    const data = {
        name: req.body.name,
        email: req.body.email
    };
    fs.appendFileSync('formdata.txt', JSON.stringify(data));
    res.json(req.body);
});

app.listen(3000);