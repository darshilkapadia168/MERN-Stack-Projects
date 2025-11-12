const dotenv = require('dotenv');
dotenv.config();

const app = require('./src/app')



app.listen(3000, () => {
    console.log("serever running on http://localhost:3000");
})