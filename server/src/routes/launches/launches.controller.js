const {getAllLaunches,existsLaunchWithId,abortLaunchById, sechduleNewLaunch}=require('../../models/launches.model');
const {getPagination}=require('../../services/query');
async function httpGetAllLaunches(req,res){
    const {skip,limit}=getPagination(req.query);
    const launches=await getAllLaunches(skip,limit);
    // console.log('launches',launches)
    return await res.status(200).json(launches);
}


async function httpAddNewLaunch(req,res){
    const launch=req.body;
    // console.log('here ---> launch',launch)
    if(!launch.mission || !launch.rocket || !launch.launchDate || !launch.target){
        return res.status(400).json({
            error:'Mission, rocket, launchDate and target are required'
        })
    }
    launch.launchDate=new Date(launch.launchDate);

    if(isNaN(launch.launchDate)){
        return res.status(400).json({
        error:'Invalid launch date'})
    }
    const createdLaunch=await sechduleNewLaunch(launch);
    console.log('createdLaunch',createdLaunch)
    return res.status(201).json(createdLaunch);
}
async function httpAbortLaunch(req,res){
    const launchId=Number(req.params.id);
    const existLaunch=await existsLaunchWithId(launchId);
    if(!existLaunch){
        return res.status(404).json({
            error:'Launch not found'
        })
    }
    const abortedLaunch=abortLaunchById(launchId);
    if(!abortedLaunch){
        return res.status(400).json({
            error:'Launch not aborted'
        })
    }else{
        return res.status(200).json({
            ok:true
        })
    }
}


module.exports={
    httpGetAllLaunches,
    httpAddNewLaunch,
    httpAbortLaunch
}