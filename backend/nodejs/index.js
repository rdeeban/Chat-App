const express = require('express');
const cors = require('cors');

const app = express();
app.use(cors({
    origin: 'http://localhost:3000' // Replace with your React app's origin
}));
const port = 3001;

app.use(express.json());

//TODO: add socket.io code here

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});