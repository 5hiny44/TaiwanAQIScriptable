

class AQIData {

    constructor(dataObj) {

        this.dataObj = dataObj
        this.records = dataObj["records"]
        // 建立 siteName 與次序的 index
        this.index = (() => {
            const obj = new Object()
            this.records.forEach((ele, i) => {
                const siteName = ele["sitename"]
                obj[siteName] = i
            })
            return obj
        })()

    }

    /**
     * 取得監測站資料。
     * 
     * @param {Number} longitude 經度。
     * @param {Number} latitude 緯度。
     * 
     * @returns {Object}
     */
    async getNearAQISiteObj(longitude, latitude) {

        // const geographicCoordinate = await Location.current()
        // 物件 Demo
        // {
        //     "latitude":24.831789345495963,
        //     "altitude":37.497130625881255,
        //     "horizontalAccuracy":4.585110151526686,
        //     "longitude":121.01288734015172,
        //     "verticalAccuracy":3.5778907097835964
        // }

        const recordsArray = this.records

        const site = recordsArray.reduce((accumulator, currentValue, currentIndex, array) => {

            const longitudeDistance1 = longitude - accumulator["longitude"]
            const latitudeDistance1 = latitude - accumulator["latitude"]
            const distance1 = Math.pow(longitudeDistance1, 2) + Math.pow(latitudeDistance1, 2)

            const longitudeDistance2 = longitude - currentValue["longitude"]
            const latitudeDistance2 = latitude - currentValue["latitude"]
            const distance2 = Math.pow(longitudeDistance2, 2) + Math.pow(latitudeDistance2, 2)

            return (distance1>distance2)?accumulator:currentValue

        })

        return site

    }

    /**
     * 取得該監測站的 AQI 資料。
     * 
     * @param {String} sitename 
     * 
     * @return {Object}
     */
    getAQISiteObj(siteName) {

        const i = this.index[siteName]
        return this.dataObj["records"][i]

    }

    /**
     * 取得 AQI 資料中的參數中文名稱。
     * 
     * @returns {Object}
     */
    getAQILabelObj() {

        const obj = {}

        const dataObj = this.dataObj
        const ary = dataObj["fields"]

        ary.forEach(element => {
            const key = element["id"]
            const value = element["info"]["label"]

            obj[key] = value
        })

        return obj    

    }

}

module.exports = {

    AQIData

}