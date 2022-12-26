const express = require('express');
const path = require('path');
const app = express();

const webRoot = path.join(process.env.HOME, 'Desktop', 'Card-Game');

app.use(express.static(webRoot));

app.get('/', (req, res) => {
    res.sendFile(path.join(webRoot, 'index.html'))
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})