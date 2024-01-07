require('dotenv').config()
let port = 8080;
let express = require('express');
const cors = require("cors");
const WebSocket = require('ws');
const jwt = require("jsonwebtoken");

const DBConnect = require('./config/database');
const { isAuthenticated, checkAdminAuth } = require('./middleware/user_auth.js');

let app = express();

const path = require("path");
const bodyParser = require('body-parser');
const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,
};

app.use(cors(corsOptions));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static(path.join(__dirname, './public')));

const server = require('http').createServer(app);

const wss = new WebSocket.Server({ server });

DBConnect();

wss.on('connection', function connection(ws, request) {
    console.log('A new client Connected!');
    const token = request.url.substr(1);

    jwt.verify(token, process.env.SECRET, (err, user) => {
        if (err) {
            ws.close();
        }
    })

    ws.on('message', function incoming(message) {
        wss.clients.forEach(function each(client) {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                const userMessage = JSON.parse(message);
                client.send(JSON.stringify({ text: userMessage.text, name : userMessage.name}));
            }
        });

    });
});

server.listen(port, () => {
    console.log('Running on port: ' + port);
});


app.use('/auth', require('./routes/auth.js'));
app.use('/workout', require('./routes/workout_route.js'));
app.use('/admin', require('./routes/admin.js'));


app.get('/dashboard', isAuthenticated, checkAdminAuth, (req, res) => {
    res.send(`AUTHORIZED! Dashboard - User ID: ${req.user.uid}`);
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.html'));
});





