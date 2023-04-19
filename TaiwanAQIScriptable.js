
const API_URL = "https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON";
let demoData = {"records": [{"so2":"0.9","status":"普通","pm2.5":"21","pm10_avg":"35","siteid":"23","no2":"12.4","latitude":"24.74091408","wind_speed":"0.2","wind_direc":"89","o3_8hr":"60","sitename":"竹東","pollutant":"臭氧八小時","o3":"43.4","pm10":"35","nox":"13.1","no":"0.6","pm2.5_avg":"19","longitude":"121.08895493","county":"新竹縣","aqi":"67","co":"0.43","so2_avg":"0","publishtime":"2023/04/03 19:00:00","co_8hr":"0.3"}]}
const aqi = 67

// await getData()
// test json data
// console.log(demoData["records"][0])
  
if (config.runsInWidget) {
  
    Script.setWidget(createWidget())

} else {

    let widget = createSamllWidget()
    widget.presentMedium()

}

function createWidget() {

    const widgetSize = config.widgetFamily

    switch (widgetSize) {
        case 'small':
            return createSamllWidget()
            break
        
        case 'medium':
            return createSamllWidget()
        //       return createMediumWidget()
            break
        
        case 'large':
            return createSamllWidget()
        //       return createLargeWidget()
            break
        
        default:
            return createDefaultWidget()
        
    }

}
  
function createSamllWidget() {

    let widget = new ListWidget()
    
    widget.backgroundGradient = aqiBackgroundColor(aqi)

    let titleStack = widget.addStack()
    titleStack.size = new Size(0, 16)
    //   titleStack.setPadding(0, 10, 0, 10)
    titleStack.bottomAlignContent()
    let titleText = titleStack.addText("AQI 湖口")
    titleText.font = Font.boldSystemFont(12)
    titleText.leftAlignText()
    titleText.textOpacity = 0.7
    titleStack.addSpacer()
    let locationText = titleStack.addText("☀️")
    locationText.font = Font.boldSystemFont(12)
    locationText.rightAlignText()

    //   widget.addSpacer()

    let aqiStack = widget.addStack()
    aqiStack.size = new Size(0, 66)
    //   aqiStack.setPadding(0, 10, 0, 0)
    aqiStack.topAlignContent()
    let aqiText = aqiStack.addText(String(aqi))
//     aqiText.font = Font.boldSystemFont(60)
    aqiText.font = Font.heavySystemFont(60)
    aqiText.leftAlignText()

//     widget.addSpacer()

    let pollutantStack = widget.addStack()
    pollutantStack.size = new Size(0, 20)
    
    //   pollutantStack.setPadding(0, 10, 0, 10)
    pollutantStack.addSpacer(4)
    let pollutantText = pollutantStack.addText("PM2.5")
    pollutantText.font = Font.boldSystemFont(18)
    pollutantText.leftAlignText()
    pollutantStack.addSpacer()

//     widget.addSpacer()

    let otherTitleStack = widget.addStack()
    otherTitleStack.size = new Size(0, 35)
    //   otherTitleStack.setPadding(0, 10, 0, 10)

    let windStack = otherTitleStack.addStack()
//     windStack.size = new Size(0, 10)
    windStack.bottomAlignContent()
    windStack.layoutVertically()
    let windText = windStack.addText("東南風 ↖")
    windText.font = Font.boldSystemFont(10)
    windText.textOpacity = 0.7

    let windText2 = windStack.addText("2.5 m/s")
    windText2.font = Font.boldSystemFont(10)
    windText2.textOpacity = 0.7

    otherTitleStack.addSpacer()

    let updateTimeText = otherTitleStack.addText("14:30");
    updateTimeText.font = Font.boldSystemFont(10)
    updateTimeText.textOpacity = 0.7
    otherTitleStack.bottomAlignContent()

    return widget

}

function createMediumWidget() {

}

function createLargeWidget() {

}

function createDefaultWidget() {

}
/**
 * 藉由aqi數值，生成對應空氣品質的背景。
 * 
 * @param {Number} aqi aqi的數值。
 * @returns Scriptable 的漸層色彩物件。
 */
function aqiBackgroundColor(aqi) {
  
    const aqiLevel = new Array(
        [50, {
            lightTopColorCode: "#018d81", 
            lightBottomColorCode: "#139a3a",
            darkTopColorCode: "#064e54",
            darkBottomColorCode: "#085730"
        }],
        [100, {
            lightTopColorCode: "#c7cc35", 
            lightBottomColorCode: "#f2b844",
            darkTopColorCode: "#4d4d02",
            darkBottomColorCode: "#664705"
        }],
        [150, {
            lightTopColorCode: "#e3a00e", 
            lightBottomColorCode: "#e05924",
            darkTopColorCode: "#804c09",
            darkBottomColorCode: "#802b09"
        }],
        [200, {
            lightTopColorCode: "#ed5826", 
            lightBottomColorCode: "#c70606",
            darkTopColorCode: "#701303",
            darkBottomColorCode: "#70031d"
        }],
        [300, {
            lightTopColorCode: "#c71e7a", 
            lightBottomColorCode: "#960aa6",
            darkTopColorCode: "#52094f",
            darkBottomColorCode: "#460966"
        }],
        [500, {
            lightTopColorCode: "#6b5463", 
            lightBottomColorCode: "#7d3736",
            darkTopColorCode: "#36252b",
            darkBottomColorCode: "#33150d"
        }]
    )

    const aqiGradient = aqiLevel.find(([aqiThreshold, colors]) => {
        return aqi <= aqiThreshold
    })[1] // resoult array[0] is aqi value, array[1] is colorCodes.
    
    const lightColorCodes = [aqiGradient.lightTopColorCode, aqiGradient.lightBottomColorCode]
    const darkColorCodes = [aqiGradient.darkTopColorCode, aqiGradient.darkBottomColorCode]

    return getGradient(lightColorCodes, darkColorCodes)

}

/**
 * 生成 Scritable 的漸層背景。
 * 
 * @param {[String]} lightColorCodes 輸入一到兩組RGB色碼，ex. ["#ffffff"]、["#dd0000", "#bb3300"]。
 * @param {[String]} darkColorCodes 輸入一到兩組RGB色碼，ex. ["#ffffff"]、["#dd0000", "#bb3300"]。如果不輸入即套用 lightColorCodes。
 * @param {[Number]} location 輸入數字來表示間曾範圍。
 * @returns Scritable 漸層色彩物件。
 */
function getGradient(lightColorCodes = undefined, darkColorCodes = undefined, location = [0, 0.6]) {
  
    const gradient = new LinearGradient()
    gradient.locations = location

    lightColorCodes = lightColorCodes || darkColorCodes
    darkColorCodes = darkColorCodes || lightColorCodes

    lightTopColor = new Color(lightColorCodes[0])
    lightBottomColor = new Color(lightColorCodes[1] || lightColorCodes[0])
    darkTopColor = new Color(darkColorCodes[0])
    darkBottomColor = new Color(darkColorCodes[1] || darkColorCodes[0])

    gradient.colors = [
        Color.dynamic(lightTopColor, darkTopColor),
        Color.dynamic(lightBottomColor, darkBottomColor)
    ]

    return gradient
  
}

  
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

  
  