let port = 8080;
let express = require('express');
let app = express();

const path = require("path");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname,'./public')));

app.get('/', (req, res) => {
 res.sendFile(path.join(__dirname,'/views/index.html'));
//  res.send('Hello there!!');
});

app.listen(port, () => {
 console.log('Running on port: ' + port);
});
