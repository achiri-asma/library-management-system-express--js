const express = require ('express');

const app = express();

require('dotenv').config();

const database_connection = require('./config/database-connection');

const createUploadsDirectory = require('./config/create-image-folder');

const router = require('./routes/user/userRoute');

const routerr = require('./routes/book/bookRoute');

const routerrr = require('./routes/author/authorRoute');

const routerrrr = require('./routes/borrowBooks/borrowRoute');

const path = require('path');

database_connection();

createUploadsDirectory();

const PORT = process.env.PORT_SERVER;

app.use(express.json());

//routes used
app.use('/api', router);

app.use('/api', routerr);

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api', routerrr);

app.use('/api', routerrrr);

app.listen(PORT,()=>{
    console.log(`server started successfully on ${PORT}`);
});
