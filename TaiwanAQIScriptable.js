
const API_URL = "https://data.epa.gov.tw/api/v2/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON";
const demoData = {
    "fields": [
        {
            "id": "sitename",
            "type": "text",
            "info": {
                "label": "測站名稱"
            }
        },
        {
            "id": "county",
            "type": "text",
            "info": {
                "label": "縣市"
            }
        },
        {
            "id": "aqi",
            "type": "text",
            "info": {
                "label": "空氣品質指標"
            }
        },
        {
            "id": "pollutant",
            "type": "text",
            "info": {
                "label": "空氣污染指標物"
            }
        },
        {
            "id": "status",
            "type": "text",
            "info": {
                "label": "狀態"
            }
        },
        {
            "id": "so2",
            "type": "text",
            "info": {
                "label": "二氧化硫(ppb)"
            }
        },
        {
            "id": "co",
            "type": "text",
            "info": {
                "label": "一氧化碳(ppm)"
            }
        },
        {
            "id": "o3",
            "type": "text",
            "info": {
                "label": "臭氧(ppb)"
            }
        },
        {
            "id": "o3_8hr",
            "type": "text",
            "info": {
                "label": "臭氧8小時移動平均(ppb)"
            }
        },
        {
            "id": "pm10",
            "type": "text",
            "info": {
                "label": "懸浮微粒(μg\/m3)"
            }
        },
        {
            "id": "pm2.5",
            "type": "text",
            "info": {
                "label": "細懸浮微粒(μg\/m3)"
            }
        },
        {
            "id": "no2",
            "type": "text",
            "info": {
                "label": "二氧化氮(ppb)"
            }
        },
        {
            "id": "nox",
            "type": "text",
            "info": {
                "label": "氮氧化物(ppb)"
            }
        },
        {
            "id": "no",
            "type": "text",
            "info": {
                "label": "一氧化氮(ppb)"
            }
        },
        {
            "id": "wind_speed",
            "type": "text",
            "info": {
                "label": "風速(m\/sec)"
            }
        },
        {
            "id": "wind_direc",
            "type": "text",
            "info": {
                "label": "風向(degrees)"
            }
        },
        {
            "id": "publishtime",
            "type": "text",
            "info": {
                "label": "資料發布時間"
            }
        },
        {
            "id": "co_8hr",
            "type": "text",
            "info": {
                "label": "一氧化碳8小時移動平均(ppm)"
            }
        },
        {
            "id": "pm2.5_avg",
            "type": "text",
            "info": {
                "label": "細懸浮微粒移動平均值(μg\/m3)"
            }
        },
        {
            "id": "pm10_avg",
            "type": "text",
            "info": {
                "label": "懸浮微粒移動平均值(μg\/m3)"
            }
        },
        {
            "id": "so2_avg",
            "type": "text",
            "info": {
                "label": "二氧化硫移動平均值(ppb)"
            }
        },
        {
            "id": "longitude",
            "type": "text",
            "info": {
                "label": "經度"
            }
        },
        {
            "id": "latitude",
            "type": "text",
            "info": {
                "label": "緯度"
            }
        },
        {
            "id": "siteid",
            "type": "text",
            "info": {
                "label": "測站編號"
            }
        }
    ],
    "resource_id": "8d2f907f-bbb4-4fdf-8f08-8eabae15da45",
    "__extras": {
        "api_key": "e8dd42e6-9b8b-43f8-991e-b3dee723a52d"
    },
    "include_total": true,
    "total": "85",
    "resource_format": "object",
    "limit": "1000",
    "offset": "0",
    "_links": {
        "start": "\/api\/v2\/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON",
        "next": "\/api\/v2\/aqx_p_432?api_key=e8dd42e6-9b8b-43f8-991e-b3dee723a52d&limit=1000&format=JSON&offset=1000"
    },
    "records": [
        {
            "sitename": "基隆",
            "county": "基隆市",
            "aqi": "84",
            "pollutant": "臭氧八小時",
            "status": "普通",
            "so2": "1.1",
            "co": "0.4",
            "o3": "81.6",
            "o3_8hr": "65.5",
            "pm10": "33",
            "pm2.5": "26",
            "no2": "7.2",
            "nox": "7.9",
            "no": "0.7",
            "wind_speed": "0.9",
            "wind_direc": "87",
            "publishtime": "2023\/04\/29 16:00:00",
            "co_8hr": "0.3",
            "pm2.5_avg": "21",
            "pm10_avg": "27",
            "so2_avg": "0",
            "longitude": "121.760056",
            "latitude": "25.129167",
            "siteid": "1"
        },
        {
            "sitename": "汐止",
            "county": "新北市",
            "aqi": "97",
            "pollutant": "臭氧八小時",
            "status": "普通",
            "so2": "2.8",
            "co": "0.35",
            "o3": "64.8",
            "o3_8hr": "69.3",
            "pm10": "26",
            "pm2.5": "19",
            "no2": "11.3",
            "nox": "12.7",
            "no": "1.3",
            "wind_speed": "0.5",
            "wind_direc": "18",
            "publishtime": "2023\/04\/29 16:00:00",
            "co_8hr": "0.4",
            "pm2.5_avg": "18",
            "pm10_avg": "28",
            "so2_avg": "2",
            "longitude": "121.64081",
            "latitude": "25.06624",
            "siteid": "2"
        }
    ]
}
const aqi = 90

// await getData()
// test json data
// console.log(demoData["records"][0])
  
if (config.runsInWidget) {
  
    Script.setWidget(createWidget())

} else {

    const widget = createSamllWidget()
    widget.presentMedium()

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

    const updateTimeText = otherTitleStack.addText("14:30");
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

  
async function getData() {

    const req = new Request(API_URL)
    const json = await req.loadJSON()

    try {
        console.log(json)
    } catch(error) {
        console.log(error)
        throw error
    }

}  
  