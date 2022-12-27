const express = require('express');
const path = require('path');
const app = express();

const webRoot = path.join(process.env.HOME, 'Desktop', 'Card-Game');    //states webroot is a location on my personal pc env

app.use(express.static(webRoot));                                       //serves static files from the webroot


const directory = function(file) {                                      //function, avoids writing webroot each time, converts argument into string for location
    return path.join(webroot, `'${file}'`)
}

app.get('/', (req, res) => {
    res.sendFile(directory(index.html))
});

app.listen(3000, () => {
    console.log('Listening on port 3000')
})

