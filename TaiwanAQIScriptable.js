
const API_URL = "https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON";
let demoData = {"records": [{"so2":"0.9","status":"普通","pm2.5":"21","pm10_avg":"35","siteid":"23","no2":"12.4","latitude":"24.74091408","wind_speed":"0.2","wind_direc":"89","o3_8hr":"60","sitename":"竹東","pollutant":"臭氧八小時","o3":"43.4","pm10":"35","nox":"13.1","no":"0.6","pm2.5_avg":"19","longitude":"121.08895493","county":"新竹縣","aqi":"67","co":"0.43","so2_avg":"0","publishtime":"2023/04/03 19:00:00","co_8hr":"0.3"}]}

// await getData()
// test json data
console.log(demoData["records"][0])

async function getData() {

    let req = new Request(API_URL)
    let json = await req.loadJSON()

    try {
        console.log(json)
    } catch(error) {
        console.log(error)
        throw error
    }

}






