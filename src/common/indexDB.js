import localforage from 'localforage'

const diver = {
    INDEXEDDB: localforage.INDEXEDDB,
    WEBSQL: localforage.WEBSQL,
    LOCALSTORAGE: localforage.LOCALSTORAGE
}
export default class IndexDB{
    constructor(config) {
        this.storeNames = config.storeNames;//存储表
        this.name = config.name;//应用名称
        this.diver = diver[config.diver]||localforage.INDEXEDDB;
        console.log(config)
        this.init()
    }
    /**
     * 初始化
     */
    init(){
        //一个应用名称可以创建多个存储表
        this.storeNames.map(storeName => {
            this[storeName]  = localforage.createInstance({
                name: this.name,
                storeName: storeName,
                driver: this.diver
            })
        })
        
    }
    /**
     * 获取IndexDB值
     */
    set(storeName, key, value) {
        const data = value instanceof Blob || value instanceof ArrayBuffer ? value : JSON.stringify(value);
        return new Promise((resolve, reject) => {
            this[storeName].setItem(key, data).then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log('set database error');
                reject(err)
            })
        })
    }
    /**
     *获取StoreName值
     */
    get(storeName, key) {
        return new Promise((resolve, reject) => {
            this[storeName].getItem(key).then((res) => {
                resolve(res)
            }).catch((err) => {
                console.log('get database error');
                reject(err)
            })
        })
    }

    /**
     * 
     * @param {*} storeName 
     */
    getKeys(storeName) {
        return new Promise((resolve, reject) => {
            this[storeName].keys().then((res)=>{
                resolve(res)
            }).catch((err) => {
                console.log('getKeys database error');
                reject()
            })
        })
    }
    /*
    *删除StoreName值
    */
   remove(storeName,key){
       return new Promise((resolve, reject) => {
           this[storeName].removeItem(key).then((res) => {
               resolve(true)
           }).catch((err) => {
               console.log('remove database error');
               reject(false)
           })
       })
   }
   /**
    * @param {string} storeName
    * @description 清空storeName表
    */
   clear(storeName){
       return new Promise((resolve, reject) => {
           this[storeName].clear().then((res) => {
               resolve(true)
           }).catch((err) => {
               console.log('clear database error');
               reject(false)
           })
       })
   }
   /**
    * @param {string} storeName
    * @param {string} name
    * @description 删除实例
   */
   dropInstance(storeName,name){
       return new Promise((resolve, reject) => {
           this[storeName].dropInstance({name:name}).then( ()=> {
               resolve(true)
           }).catch((err) => {
               console.log('dropInstance database error');
               reject(false)
           })
       })
      
   }

}