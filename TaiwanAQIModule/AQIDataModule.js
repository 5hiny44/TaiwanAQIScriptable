

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
    getNearAQISiteObj(longitude, latitude) {

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

        const gpsCoordinate = new Coordinate(longitude, latitude)
        const siteData = recordsArray.reduce((accumulator, currentValue, currentIndex, array) => {

            const bestCoordinate = new Coordinate(accumulator["longitude"], accumulator["latitude"])
            const currentCoordinate = new Coordinate(currentValue["longitude"], currentValue["latitude"])

            const bestDistance = Coordinate.getDistance(gpsCoordinate, bestCoordinate)
            const currentDistance = Coordinate.getDistance(gpsCoordinate, currentCoordinate)
            
            return (bestDistance<currentDistance)?accumulator:currentValue

        })

        return siteData

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

class Coordinate {

    constructor(longitude, latitude) {
        this.longitude = longitude
        this.latitude = latitude
    }

    /**
     * 計算出兩點座標的距離。
     * 
     * @param {Coordinate} coordinate1 
     * @param {Coordinate} coordinate2 
     * @returns {Number}
     */
    static getDistance(coordinate1, coordinate2) {

        const longitudeDistance1 = coordinate1.longitude - coordinate2.longitude
        const latitudeDistance1 = coordinate1.latitude - coordinate2.latitude
        const distance = Math.pow(longitudeDistance1, 2) + Math.pow(latitudeDistance1, 2)

        return distance

    }

}

module.exports = {

    AQIData,
    Coordinate

}