
const API_URL = "https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON";

async function getData() {

    let req = new Request(API_URL);
    let json = await req.loadJSON();

    try {
        console.log(json);
    } catch(error) {
        console.log(error);
        throw error;
    }

}


// if(config.runsInApp) {
//     listWidget.presentMedium();
// }

await getData();

