let express = require("express");
let cors = require('cors');

const apiRouter = require('./routes');

const dotenv = require('dotenv')
dotenv.config()

const app = express();
app.use(cors());

//Serves resources from public folder
app.use(express.static(__dirname + '\\images')); 

// Parse incoming form data
app.use(express.json());

app.use('/v1/', apiRouter);

const PORT = process.env.PORT ?? 3000;
    

//listening at port 3000
app.listen(PORT, function () {
    console.log(`App listening on port ${PORT} !!!`);
});