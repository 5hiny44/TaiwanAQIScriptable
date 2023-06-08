
const isRemoteScriptUpdateEnabled = false
const isUpdateAQIJsonData = false

const BRANCH = "main"

const SCRIPT_URL = `https://raw.githubusercontent.com/5hiny44/TaiwanAQIScriptable/${BRANCH}/TaiwanAQIScriptable.js`
const TAIWAN_AQI_URL = "https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON"

const scriptUpdateCycleTime = "00:00:00"
const aqiDataUpdateCycleTime = "**:01:00"

const SCRIPT_NAME = Script.name() + ".js"
const DATA_JSON_NAME = "TaiwanAQIData.json"
const FM = getFileManager()
const PATH = FM.documentsDirectory()

//test params
const demoData = JSON.parse(FM.readString(getFilePath(DATA_JSON_NAME)))
const aqi = 90
const time = function() {
    const date = new Date()
    return `${date.getHours()}:${date.getMinutes()}` // <<< 格式未正確，會出現 14:1 。
    // ex. 14:30
}()

// await getData()
// test json data
// console.log(demoData["records"][0])

if(isRemoteScriptUpdateEnabled) {
    // scriptUpdateCycleTime 定時
    await updateLocalScript()
}

if(isUpdateAQIJsonData) {
    // aqiDataUpdateCycleTime 定時
    await updateLocalAQIData()
}
  
if (config.runsInWidget) {
  
    Script.setWidget(createWidget())

} else {

    const widget = createSamllWidget()
    widget.presentMedium()

}

/**
 * 更新本地腳本。
 */
async function updateLocalScript() {

    console.log("Update Script...")

    const scriptPath = getFilePath(SCRIPT_NAME)
    const req = new Request(SCRIPT_URL)
    const str = await req.loadString()
    FM.writeString(scriptPath, str)

    console.log("Script have been Updated.")
    
}

/**
 * 更新本地 AQI 的資料。
 */
async function updateLocalAQIData() {

    console.log("Update AQI JSON Data...")

    const dataPath = getFilePath(DATA_JSON_NAME)||`${PATH}/TaiwanAQIScript/${DATA_JSON_NAME}` 
    // 無法取得檔案位置，則直接以 ${PATH}/TaiwanAQIScript/${DATA_JSON_NAME} 建立新的檔案。

    const req = new Request(TAIWAN_AQI_URL)
    const str = await req.loadString()
    FM.writeString(dataPath, str)

    console.log("AQI JSON Data have been Updated.")
    
}

/**
 * 在用戶 Scriptable 路徑裡，確認檔案是否存在，並且回傳路徑。如果檔案不存在，則回傳 null。
 * 
 * @param {String} fileName 檔案名稱，必須包含副檔名。（ex. TaiwanAQIScriptable.js）
 * @returns {String?}
 */
function getFilePath(fileName) {
    
    const filePath1 = PATH + "/" + fileName
    const filePath2 = PATH + "/TaiwanAQIScript/" + fileName
    
    if(FM.fileExists(filePath1)) {
        return filePath1
    }

    if(FM.fileExists(filePath2)) {
        return filePath2
    }

    console.log(`The file is not exist.`)

    return null
    
}

/**
 * 測試用戶是否開啟iCloud，得以取用有效 FileManager。
 * 
 * @returns {FileManager}
 */
function getFileManager() {

    try {

        const iCloudFm = FileManager.iCloud() // <-- 有沒有開啟iCloud都不會報錯
        iCloudFm.documentsDirectory() // <-- iCloud 沒開啟會報錯
        return iCloudFm

    } catch(e) {

        console.log("Getting the directory from iCloud failed. Check your iCloud Setting.")
        
        const localFm = FileManager.local()  
        return localFm

    }

}

/**
 * 從路徑裡的 AQI Data JSON 檔案，打包出 Object。
 * 
 * @returns {Object}
 */
function getObjectFromJsonFile() {

    const dataPath = getFilePath(DATA_JSON_NAME)
    const dataStr = FM.readString(dataPath)

    return JSON.parse(dataStr)

}

/**
 * 取得 AQI 資料中的參數中文名稱。
 * 
 * @returns {Object}
 */
function getAQILabelObj() {

    const obj = {}

    const dataObj = getObjectFromJsonFile()
    const ary = dataObj["fields"]

    ary.forEach(element => {
        const key = element["id"]
        const value = element["info"]["label"]

        obj[key] = value
    })

    return obj    

}

/**
 * 取得該監測站的 AQI 資料。
 * 
 * @param {String} sitename 
 */
function getAQIRecords(sitename) {

}

/**
 * 取得監測站名稱。
 * 
 * @param {Number} longitude 經度。
 * @param {Number} latitude 緯度。
 */
async function getNearAQISiteName(longitude, latitude) {

    // const posObj = {
    //     "latitude":24.831789345495963,
    //     "altitude":37.497130625881255,
    //     "horizontalAccuracy":4.585110151526686,
    //     "longitude":121.01288734015172,
    //     "verticalAccuracy":3.5778907097835964
    // }

    const geographicCoordinate = await Location.current()


}

/**
 * 依照 size 需求，生成 AQI 專用 widget 物件。
 * 
 * @param {String} size 預設偵測是否存在 widget 情境，自動偵測 widget size，也可自行輸入 size 大小，分別為: small、medium、large、extraLarge。
 * @returns widge 物件。
 */
function createWidget(size = config.widgetFamily) {

    const widgetSize = size || "small"

    const widgeSizeMap = new Map([
        ["small", createSamllWidget()],
        ["medium", createMediumWidget()],
        ["large", createLargeWidget()],
        ["extraLarge", createExtraLargeWidget()]
    ])
    
    const widget = widgeSizeMap.get(widgetSize)

    if(!widget) { 
        throw new Error(`Widget size mapping is failed. widgetSize: ${widgetSize}`)
    } 
    
    return widget

}
  
function createSamllWidget() {

    const widget = new ListWidget()
    
    widget.backgroundGradient = aqiBackgroundColor(aqi)
    
    const titleStack = widget.addStack()
    titleStack.size = new Size(0, 14)
    //   titleStack.setPadding(0, 10, 0, 10)
    titleStack.topAlignContent()
    const titleText = titleStack.addText("AQI 湖口")
    titleText.font = Font.boldSystemFont(12)
    titleText.leftAlignText()
    titleText.textOpacity = 0.7
    titleStack.addSpacer()
    const locationText = titleStack.addText("☀️")
    locationText.font = Font.boldSystemFont(12)
    locationText.rightAlignText()

    //   widget.addSpacer()

    const aqiStack = widget.addStack()
    aqiStack.size = new Size(0, 64)
    
//     aqiStack.setPadding(0, 100, 0, 0)
    aqiStack.topAlignContent()
    const aqiText = aqiStack.addText(String(aqi))
//     aqiText.font = Font.boldSystemFont(60)
    aqiText.font = Font.heavySystemFont(60)
    aqiText.leftAlignText()

//     widget.addSpacer()
    
    const pollutantStack = widget.addStack()
    pollutantStack.size = new Size(0, 22)
    
    //   pollutantStack.setPadding(0, 10, 0, 10)
    pollutantStack.addSpacer(4)
    const pollutantText = pollutantStack.addText("PM2.5")
    pollutantText.font = Font.boldSystemFont(18)
    pollutantText.leftAlignText()
//     pollutantStack.addSpacer()

//     widget.addSpacer()

    const otherTitleStack = widget.addStack()
    otherTitleStack.size = new Size(0, 35)
    //   otherTitleStack.setPadding(0, 10, 0, 10)

    const windStack = otherTitleStack.addStack()
//     windStack.size = new Size(0, 10)
    windStack.bottomAlignContent()
    windStack.layoutVertically()
    const windText = windStack.addText("東南風 ↖")
    windText.font = Font.boldSystemFont(11)
    windText.textOpacity = 0.7

    const windText2 = windStack.addText("2.5 m/s")
    windText2.font = Font.boldSystemFont(11)
    windText2.textOpacity = 0.7

    otherTitleStack.addSpacer()

    const updateTimeText = otherTitleStack.addText(time);
    updateTimeText.font = Font.boldSystemFont(11)
    updateTimeText.textOpacity = 0.7
    otherTitleStack.bottomAlignContent()

    return widget

}

function createMediumWidget() {
    return createSamllWidget() //test
}

function createLargeWidget() {
    return createSamllWidget() //test
}

function createExtraLargeWidget() {
    return createSamllWidget() //test
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
            darkTopColorCode: "#a2a624",
            darkBottomColorCode: "#bf8c26"
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

  