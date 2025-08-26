class MyPromise{
    static REJECT = "reject";
    static PENDING = "pending";
    static FULFILLED = "fulfilled";

    status = MyPromise.PENDING;
    value = undefined;
    onFulfilledCallBacks = [];
    onRejectedCallBacks = [];
    constructor(execute){
        const resolve = (value)=>{
            if(this.status == MyPromise.PENDING){
                this.status = MyPromise.FULFILLED;
                this.value = value;
                this.onFulfilledCallBacks.forEach(func=>func())
            }
        }
        const reject = (value) =>{
            if(this.status = MyPromise.PENDING){
                this.value = value;
                this.status = MyPromise.REJECT;
                this.onRejectedCallBacks.forEach(func=>func())
            }
        }
        try{
            execute(resolve,reject)
        }catch(err){
            reject(err)
        }
    }
    then(onFulfilled,onRejected){
        console.group('first',this)
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (onFulfilled) => onFulfilled;
        onRejected = typeof onRejected === 'function' ? onRejected : (onRejected) => onRejected;
        return new MyPromise((resolve,reject)=>{
            console.log('second',this)
            // 处理fulfilled状态
            if(this.status == MyPromise.FULFILLED){
                try{
                    queueMicrotask(()=>{
                        const result = onFulfilled(this.value);
                        this.handlePromiseResult(result,resolve,reject)
                    })
                }catch(err){
                    reject(err)
                }
            }
            // 处理rejected状态
            if(this.status == MyPromise.REJECT){
                try{
                    queueMicrotask(()=>{
                        const result = onRejected(this.value);
                        this.handlePromiseResult(result,resolve,reject)
                    })
                }catch(err){
                    reject(err)
                }
            }
            // 处理异步状态 PENDING状态
            else{
                this.onFulfilledCallBacks.push(()=>{
                    queueMicrotask(() => {
                        const result = onFulfilled(this.value);
                        this.handlePromiseResult(result, resolve, reject);
                      });
                 })
                 this.onRejectedCallBacks.push(()=>{
                    queueMicrotask(() => {
                        const result = onRejected(this.value);
                        this.handlePromiseResult(result, resolve, reject);
                      });
                 })
            }
        })
    }
    handlePromiseResult(result,resolve,reject){
        if(result instanceof MyPromise){
            result.then(resolve,reject)
        }else{
            resolve(result)
        }
    } 
    static all(promises){
        // if(this._hasIterator(promises)){
        //     throw new Error('参数不可迭代')
        // }
        return new MyPromise((resolve,reject)=>{
            const resultArr = [];
            promises.forEach(promise=>{
                promise.then(
                    (res)=>{
                        console.log(resultArr,'resultArr')
                        if(resultArr.length === promise.length){
                            resolve(resultArr)
                        }
                        resultArr.push(res)
                    },
                    (err)=>{
                        reject(err)
                    }
                )
            })
        })
    }
}

const p = new MyPromise((resolve,reject)=>{
    // setTimeout(()=>{
        reject('success')
    // },1000)
}).then((res)=>{
    console.log(res,'success')
},error=>{console.log(error,'error')}).then((res)=>{
    console.log(res,'second success')
},error=>{console.log(error,'second error')})