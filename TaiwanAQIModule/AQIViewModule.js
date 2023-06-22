
ListWidget.prototype.putStack = function(closure) {
  
  const stack = this.addStack()
  closure(stack)
  
}

WidgetStack.prototype.putStack = function(closure) {
  
  const stack = this.addStack()
  closure(stack)
  
}

WidgetStack.prototype.putText = function(closure) {

  const text = this.addText("")
  closure(text)

}

class AQIView {

  /**
   * 依照 size 需求，生成 AQI 專用 widget 物件。
   * 
   * @param {String} size 預設偵測是否存在 widget 情境，自動偵測 widget size，也可自行輸入 size 大小，分別為: small、medium、large、extraLarge。
   * @returns widge 物件。
   */
  createWidget(siteDataObj, size = config.widgetFamily) {

    const widgetSize = size || "small"

    const widgeSizeMap = new Map([
      ["small", this.createSamllWidget],
      ["medium", this.createMediumWidget],
      ["large", this.createLargeWidget],
      ["extraLarge", this.createExtraLargeWidget]
    ])
    
    const widget = widgeSizeMap.get(widgetSize)(siteDataObj)

    if(!widget) { 
      throw new Error(`Widget size mapping is failed. widgetSize: ${widgetSize}`)
    } 
    
    return widget

  }
  
  createSamllWidget(siteDataObj) {

    const v = {
      siteNameTitle: `AQI ${siteDataObj["sitename"]}`
      ,weather: "☀️"
      ,aqi: siteDataObj["aqi"]
      ,pollutant: siteDataObj["pollutant"]
      ,wind: "東南風 ↖"
      ,windSpeed: `${siteDataObj["wind_speed"]} m/s`
      ,time: function() {
        const date = new Date()
        return `${date.getHours()}:${date.getMinutes()}` // <<< 格式未正確，會出現 14:1 。
        // ex. 14:30
      }()
    }

    const widget = new ListWidget()
    
    widget.backgroundGradient = this.aqiBackgroundColor(v.aqi)

    widget.putStack(titleStack => {

      titleStack.size = new Size(0, 14)
      titleStack.topAlignContent()
      titleStack.putText(titleText => {

        titleText.text = v.siteNameTitle
        titleText.font = Font.boldSystemFont(12)
        titleText.leftAlignText()
        titleText.textOpacity = 0.7

      })
      titleStack.addSpacer()
      titleStack.putText(locationText => {

        locationText.text = v.weather
        locationText.font = Font.boldSystemFont(12)
        locationText.rightAlignText()

      })

    })
    widget.putStack(aqiStack => {

      aqiStack.size = new Size(0, 64)
      aqiStack.topAlignContent()
      aqiStack.putText(aqiText => {

        aqiText.text = v.aqi
        aqiText.font = Font.heavySystemFont(60)
        aqiText.leftAlignText()

      })

    })
    widget.putStack(pollutantStack => {

      pollutantStack.size = new Size(0, 22)
      pollutantStack.addSpacer(4)
      pollutantStack.putText(pollutantText => {

        pollutantText.text = v.pollutant
        pollutantText.font = Font.boldSystemFont(18)
        pollutantText.leftAlignText()

      })

    })
    widget.putStack(otherTitleStack => {

      otherTitleStack.size = new Size(0, 35)
      otherTitleStack.putStack(windStack => {

        windStack.bottomAlignContent()
        windStack.layoutVertically()
        windStack.putText(windText => {

          windText.text = v.wind
          windText.font = Font.boldSystemFont(11)
          windText.textOpacity = 0.7

        })
        windStack.putText(windText2 => {

          windText2.text = v.windSpeed
          windText2.font = Font.boldSystemFont(11)
          windText2.textOpacity = 0.7

        })

      })
      otherTitleStack.addSpacer()
      otherTitleStack.putText(updateTimeText => {

        updateTimeText.text = v.time
        updateTimeText.font = Font.boldSystemFont(11)
        updateTimeText.textOpacity = 0.7

      })
      otherTitleStack.bottomAlignContent()

    })

    return widget

  }

  createMediumWidget(siteDataObj) {
    return this.createSamllWidget(siteDataObj) //test
  }

  createLargeWidget(siteDataObj) {
    return this.createSamllWidget(siteDataObj) //test
  }

  createExtraLargeWidget(siteDataObj) {
    return this.createSamllWidget(siteDataObj) //test
  }

  /**
   * 藉由aqi數值，生成對應空氣品質的背景。
   * 
   * @param {Number} aqi aqi的數值。
   * @returns Scriptable 的漸層色彩物件。
   */
  aqiBackgroundColor(aqi) {
  
    const aqiLevel = [
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
    ]

    const aqiGradient = aqiLevel.find(([aqiThreshold, colors]) => {
      return aqi <= aqiThreshold
    })[1] // resoult array[0] is aqi value, array[1] is colorCodes.
    
    const lightColorCodes = [aqiGradient.lightTopColorCode, aqiGradient.lightBottomColorCode]
    const darkColorCodes = [aqiGradient.darkTopColorCode, aqiGradient.darkBottomColorCode]

    return this.getGradient(lightColorCodes, darkColorCodes)

  }

  /**
   * 生成 Scritable 的漸層背景。
   * 
   * @param {[String]} lightColorCodes 輸入一到兩組RGB色碼，ex. ["#ffffff"]、["#dd0000", "#bb3300"]。
   * @param {[String]} darkColorCodes 輸入一到兩組RGB色碼，ex. ["#ffffff"]、["#dd0000", "#bb3300"]。如果不輸入即套用 lightColorCodes。
   * @param {[Number]} location 輸入數字來表示間曾範圍。
   * @returns Scritable 漸層色彩物件。
   */
  getGradient(lightColorCodes = undefined, darkColorCodes = undefined, location = [0, 0.6]) {
  
    const gradient = new LinearGradient()
    gradient.locations = location

    lightColorCodes = lightColorCodes || darkColorCodes
    darkColorCodes = darkColorCodes || lightColorCodes

    const lightTopColor = new Color(lightColorCodes[0])
    const lightBottomColor = new Color(lightColorCodes[1] || lightColorCodes[0])
    const darkTopColor = new Color(darkColorCodes[0])
    const darkBottomColor = new Color(darkColorCodes[1] || darkColorCodes[0])

    gradient.colors = [
      Color.dynamic(lightTopColor, darkTopColor),
      Color.dynamic(lightBottomColor, darkBottomColor)
    ]

    return gradient
  
  }

}

module.exports = {
  AQIView
}