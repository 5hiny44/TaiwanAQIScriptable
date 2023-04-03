
const API_URL = "https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON";
let demoData = {"records": [{"so2":"0.9","status":"普通","pm2.5":"21","pm10_avg":"35","siteid":"23","no2":"12.4","latitude":"24.74091408","wind_speed":"0.2","wind_direc":"89","o3_8hr":"60","sitename":"竹東","pollutant":"臭氧八小時","o3":"43.4","pm10":"35","nox":"13.1","no":"0.6","pm2.5_avg":"19","longitude":"121.08895493","county":"新竹縣","aqi":"67","co":"0.43","so2_avg":"0","publishtime":"2023/04/03 19:00:00","co_8hr":"0.3"}]}

// await getData()
// test json data
console.log(demoData["records"][0])
  
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
    let gradient = new LinearGradient()
    gradient.locations = [0, 1]
    gradient.colors = [
        new Color("#050010"),
        new Color("#660000")
    ]
    //   gradient.colors = [
    //     new Color("#992244"),
    //     new Color("#990011")
    //   ]
    //   widget.backgroundColor = new Color("#000000")
    widget.backgroundGradient = gradient

    let titleStack = widget.addStack()
    titleStack.size = new Size(0, 12)
    //   titleStack.setPadding(0, 10, 0, 10)
    let titleText = titleStack.addText("AQI 湖口")
    titleText.font = Font.boldSystemFont(12)
    titleText.leftAlignText()
    titleText.textOpacity = 0.5
    titleStack.addSpacer()
    let locationText = titleStack.addText("☁️")
    locationText.font = Font.boldSystemFont(12)
    locationText.rightAlignText()

    //   widget.addSpacer()

    let aqiStack = widget.addStack()
    //   aqiStack.setPadding(0, 10, 0, 0)
    let aqiText = aqiStack.addText("164")
    aqiText.font = Font.boldSystemFont(50)
    aqiText.leftAlignText()

    //   widget.addSpacer()

    let pollutantStack = widget.addStack()
    pollutantStack.size = new Size(0, 18)
    //   pollutantStack.setPadding(0, 10, 0, 10)
    //   pollutantStack.addSpacer(50)
    let pollutantText = pollutantStack.addText("PM2.5")
    pollutantText.font = Font.boldSystemFont(18)
    pollutantText.leftAlignText()
    pollutantStack.addSpacer()

    widget.addSpacer()

    let otherTitleStack = widget.addStack()
    //   otherTitleStack.size = new Size(0, 12)
    //   otherTitleStack.setPadding(0, 10, 0, 10)

    let windStack = otherTitleStack.addStack()
    windStack.layoutVertically()
    let windText = windStack.addText("東南風 ↖")
    windText.font = Font.boldSystemFont(10)
    windText.textOpacity = 0.5

    let windText2 = windStack.addText("2.5 m/s")
    windText2.font = Font.boldSystemFont(10)
    windText2.textOpacity = 0.5

    otherTitleStack.addSpacer()

    let updateTimeText = otherTitleStack.addText("14:30");
    updateTimeText.font = Font.boldSystemFont(10)
    updateTimeText.textOpacity = 0.5
    otherTitleStack.bottomAlignContent()

    return widget

}

function createMediumWidget() {

}

function createLargeWidget() {

}

function createDefaultWidget() {

}

function dynamicBackground() {
//   let gradient = new LinearGradient()
//   gradient.locations = [0, 1]
//   gradient.colors = [
//     new Color("#b00a0fe6"),
//     new Color("#b00a0fb3")
//   ]
//   widget.backgroundColor = new Color("#b00a0f")
//   widget.backgroundGradient = gradient
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

  
  