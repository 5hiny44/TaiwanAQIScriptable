

class AQIData {

    constructor(dataObj) {

        this.dataObj = dataObj

    }



    /**
     * 取得監測站名稱。
     * 
     * @param {Number} longitude 經度。
     * @param {Number} latitude 緯度。
     */
    async getNearAQISiteName(longitude, latitude) {

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
     * 取得該監測站的 AQI 資料。
     * 
     * @param {String} sitename 
     */
    getAQIRecords(sitename) {

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