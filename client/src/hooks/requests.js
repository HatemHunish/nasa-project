const API_URL='http://localhost:8000/v1'
// Load planets and return as JSON.
async function httpGetPlanets() {

  const res=await fetch(`${API_URL}/planets`);
  console.log(res)
 return await res.json();
}

// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {

const res=await fetch(`${API_URL}/launches`);
  const fetchedLaunches=await res.json();
  const sortedLaunches=fetchedLaunches.sort((a,b)=>{
    return a.flightNumber-b.flightNumber;
  })
  return sortedLaunches;
}

// Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {
try {
  return await fetch(`${API_URL}/launches`,{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify(launch)
  })
} catch (error) {
  return {ok:false}
}
}

async function httpAbortLaunch(id) {
  // TODO: Once API is ready.
  // Delete launch with given ID.
  try {
    return await fetch(`${API_URL}/launches/${id}`,{
      method:'DELETE'
    })
  } catch (error) {
    return{ok:false}
  }
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};