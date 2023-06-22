
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
  updateLocalScript()
}

if(isUpdateAQIJsonData) {
  // aqiDataUpdateCycleTime 定時
  updateLocalAQIData()
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

  