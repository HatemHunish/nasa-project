const launches=require('./launches.mongo');
const planets=require('./planets.mongo');
const axios=require('axios');

// const launches=new Map();
const DEFAULT_FLIGHT_NUMBER=100;
const SPACE_X_API_URL='https://api.spacexdata.com/v4/launches/query';

async function populateLaunches(){
    console.log('Loading launch data...')
//    const response= await axios.post(SPACE_X_API_URL,{
//         query:{},
//         options:{
//             pagination:false,
//             populate:[
//                 {
//                     path:'rocket',
//                     select:{
//                         name:1,

//                     }
//                 },
//                 {
//                     path:'payloads',
//                     select:{
//                         customers:1,
//                     }
//                 }
//             ]
//         }
//     })
//     if(response.status!==200){
//         console.error('Problem downloading launch data')
//         throw new Error('Launch data download failed')
//     }
    const launchDocs=response.data.docs;
    for(const launchDoc of launchDocs){
const launch={
    flightNumber:launchDoc.flight_number,
    mission:launchDoc.name,
    rocket:launchDoc.rocket.name,
    launchDate:launchDoc.date_local,
    upcoming:launchDoc.upcoming,
    success:launchDoc.success,
    customers:launchDoc.payloads.flatMap((payload)=>{return payload.customers}),

}
// console.log(`${launch.flightNumber} ${launch.mission}`)
await saveLaunch(launch);
    }
}
async function loadLaunchData(){
    const firstLaunch= await findLaunch({
         flightNumber:1,
         rocket:'Falcon 1',
         mission:'FlaconSat',
     });
     if(firstLaunch){
         console.log('Launch data already loaded')
         return
     }else{
        await populateLaunches();
     }
}
// launches.set(launch.flightNumber,launch);

async function getAllLaunches(skip,limit){
    console.log(skip,limit)
    return await launches.find({},{
        '_id':0,
        '__v':0,
    })
    .sort({flightNumber:'asc'})
    .skip(skip)
    .limit(limit);
}
async function findLaunch(filter){
    return await launches.findOne(filter);
}
async function getLatestFlightNumber(){
    // sort by flightNumber in descending order and return the first element
    
    const latestLaunch=await launches.findOne({}).sort('-flightNumber');
    if(!latestLaunch){
        return DEFAULT_FLIGHT_NUMBER;
    }
    return latestLaunch.flightNumber;
}
async function saveLaunch(launch){
  try{
    await launches.findOneAndUpdate({
        flightNumber:launch.flightNumber,
    },launch,{upsert:true})
  }catch(err){
        console.error(`Could not save launch ${err}`)
    
}
}
async function existsLaunchWithId(flightNumber){
    return await findLaunch({flightNumber});
}
async function sechduleNewLaunch(launch){
    const planet=await planets.findOne({keplerName:launch.target});
    if(!planet){
        throw new Error('Planet not found')
    }
const newFlightNumber=await getLatestFlightNumber()+1;
const newLaunch=Object.assign(launch,{
    upcoming:true,
    success:true,
    customers:['NASA','SpaceX'],
    flightNumber:newFlightNumber,
});
await saveLaunch(newLaunch);
return newLaunch;
}


async function abortLaunchById(flightNumber){
const aborted=await launches.updateOne({flightNumber},{
    upcoming:false,
    success:false,
})
    return aborted.ok===1 && aborted.nModified===1;
}
module.exports={
    getAllLaunches,
    existsLaunchWithId,
    abortLaunchById,
    sechduleNewLaunch,
    loadLaunchData
}