const https = require('https');
const queryString = require('querystring');
/**
 * 只允许setUrlOptions方法修改参数,且所有实例共享urloptions
 * class Wallpaper
 */
class BingWallpaper {
    /**
     * @param {object} options - The options.
     */
    constructor() {
        this.setUrlOptions();
    }
    /**
     * Set new options.
     * @return {instance} The instance.
     */
    setUrlOptions(options) {
        if (this.urlOptions) {
            this.urlOptions = Object.assign(this.urlOptions, options); //键相同后面会被覆盖
        } else {
            this.urlOptions = Object.assign({}, BingWallpaper.defaultUrlSettings, options); //第一层的深拷贝
        }
        // return this
    }
    /**
     * get wallpapers function.
     */
    getWallpapersData() {
        return new Promise((resolve, reject) => {
            const {
                baseUrl,
                wallPaperApi,
                ...mergeOptions
            } = Object.assign({}, this.urlOptions);
            const url = 'https://' + baseUrl + wallPaperApi + '?' + queryString.stringify(mergeOptions)
            console.log(url)
            const request = https.get(url, (res) => {
                const {
                    statusCode
                } = res;
                let error;
                if (statusCode !== 200) {
                    error = new Error('Request Failed.\n' + `Status Code: ${statusCode}`);
                    res.resume();
                    reject(error.message)
                }
                res.setEncoding('utf8');
                res.on('data', (data) => {
                    data = JSON.parse(data);
                    resolve((data.images || data));
                });
            }).on('error', (e) => {
                console.error(`Got error: ${e.message}`);
                reject(e);
            });
        })
    };
    /**
     * handle bing wallpaper data, only json
     */
    handleBingWallPapers(bingWallpaperData, resolution) {
        if (!resolution) {
            resolution = BingWallpaper.wallpaperResolutions[2]
        }
        if(this.urlOptions.format !== 'js'){
          return new Error('handle json data only!')
        }
        const handleData = image => {
            const host = 'https://' + this.urlOptions.baseUrl
            let fileFormat = (/\.[^\.]+$/.exec(image.url))
            fileFormat = fileFormat.length ? fileFormat[0] : '.jpg'
            return {
                title: image.title,
                bsTitle: image.bsTitle,
                caption: image.caption,
                desc: image.desc,
                date: image.date,
                searchUrl: `${host}${image.quiz}`,
                defaultUrl: `${host}${image.url}`,
                humanizeUrl: `${host}${image.urlbase}_${resolution}${fileFormat}`,
                copyright: image.copyright,
                copyrightonly: image.copyrightonly,
                copyrightlink: image.copyrightlink
            }
        }
        if (bingWallpaperData instanceof Array) {
            return bingWallpaperData.map(handleData);
        } else {
            return handleData(bingWallpaperData);
        }

    }
    /** 
     *  baseUrl   // 'www.bing.com', //cn.bing.com
     *  wallPaperUrl // 'HPImageArchive.aspx'
     *  format    //返回格式——'hp'=html,'js=json,'xml=xml,'
     *  idx       //返回多少天前的照片——MAX
     *  n         //获取照片最大条数
     *  ensearch  //开启全量搜索0/1
     *  mkt       //语言‘en-US’，‘zh-CN’
     *  pid:      //未知与ensearch同时开启才有故事desc返回,值hp
     *  nc：      //未知
     *  quiz:     //未知
     *  og:       //未知
     *  ig：      //未知
     *  @return {Object}  Wallpaper query parameters
     */
    static defaultUrlSettings = {
        baseUrl: 'www.bing.com',
        wallPaperApi: '/HPImageArchive.aspx',
        format: 'js',
        idx: '0',
        n: 1,
        mkt: 'en-US',
        ensearch: 0,
        pid: 'hp',
    }
    static wallpaperResolutions = [
        '1920x1200',
        '1920x1080',
        '1366x768',
        '1280x768',
        '1024x768',
        '800x600',
        '800x480',
        '768x1280',
        '720x1280',
        '640x480',
        '480x800',
        '400x240',
        '320x240',
        '240x320'
    ]
}
module.exports = BingWallpaper