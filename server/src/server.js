require('dotenv').config();

const http=require('http');
const app = require('./app');
const {loadPlanetData}=require('./models/planets.model');
const { mongoConnect } = require('./services/mongo');
const {loadLaunchData}=require('./models/launches.model');
// server configrations for port and host
const PORT=process.env.PORT || 8000;
console.log('PORT',PORT);






// mount express app on the http server
const server=http.createServer(app);

async function startServer(){
    await mongoConnect()
    await loadLaunchData();
    await loadPlanetData();   
    server.listen(PORT,()=>{
        console.log(`Server is running on port ${PORT}`);
    })
}
startServer();