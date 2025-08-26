'use client'

import { useEffect, useState,useRef } from 'react'
import JSZip from 'jszip'
export default function IndexDB() {
    const requestId = useRef();
    const db = useRef();
    useEffect(()=>{
        init()
    },[]);
    const init = () => {
        // 删除成功后重新创建数据库
        requestId.current = window.indexedDB.open('indexStudy', 2);
        requestId.current.onsuccess = function (event) {
            db.current = event.target.result;
            console.log('数据库打开成功');
        }
        requestId.current.onupgradeneeded = (event) => {
            console.log('数据库创建成功')
            db.current = event.target.result;
            let objectStore;
            if (!db.current.objectStoreNames.contains('students')) {
                objectStore = db.current.createObjectStore("students",{keyPath: 'id', autoIncrement: true});
                !objectStore.indexNames.contains("name")&& objectStore.createIndex('name', 'name', { unique: false });
                !objectStore.indexNames.contains("email")&&objectStore.createIndex('email', 'email', { unique: true });
            }
            const index = objectStore.index("email");
            console.log(index)
        };
        requestId.current.onerror = function (event) {
            console.log('数据库打开失败');
        }
    }
    const getItem = (storeName,key,value)=>{
       const objectStore = db.current.transaction([storeName],'readwrite').objectStore(storeName);
       const index = objectStore.index(key);
       const request = index.get(value);
       return new Promise((resolve,reject)=>{
        request.onsuccess = function (event) {
            const row = event.target.result;
            console.log(row)
            resolve(row)
           }
           request.onerror = function (event) {
            console.log('获取失败')
            reject(event)
           }
       })
       
    }
    const addItem = (storeName, value, key) => {
        const transaction = db.current.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const index = objectStore.index("email");
        // 使用邮箱地址来查询，而不是使用 key
        const query = index.get(value);
        query.onsuccess = function (event) {
            const row = event.target.result;
            console.log(row, 'row');
            if (row) {
                console.log('该邮箱已存在');
            } else {
                // 只在邮箱不存在时添加
                const request = objectStore.add({ email: value,name: key});
                request.onsuccess = function (event) {
                    console.log('添加成功');
                }
                request.onerror = function (event) {
                    console.log('添加失败');
                }
            }
        }
    }
    const deleteItem = async (storeName,key,value) => {
        const transaction = db.current.transaction([storeName],'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const index = objectStore.index(key);
        const getRequest = index.get(value);
        const record = await new Promise((resolve,reject)=>{
            getRequest.onsuccess = function (event) {
                const row = event.target.result;
                console.log(row)
                resolve(row)
            }
            getRequest.onerror = function (event) {
                console.log('获取失败')
                reject(event)
            }
        })
        if(!record){
            console.log('该记录不存在')
            return
        }
        const request = objectStore.delete(record.id);
        return new Promise((resolve,reject)=>{
            request.onsuccess = function (event) {
                console.log('删除成功')
                resolve(event)
            }
            request.onerror = function (event) {
                console.log('删除失败')
                reject(event)
            }
           }) 
    }
    const newItem = ()=>{
        addItem('students','test@163.com','test add')
        // addItem('students','test2@163.com','test add2')
    }
    
    // 更新数据
    const updateItem = (storeName, key, value, newValue) => {
        const transitions = db.current.transaction([storeName],'readwrite');
        const objectStore = transitions.objectStore(storeName);
        const index = objectStore.index(key);
        const request = index.get(value);
        request.onsuccess = function (event) {
            const row = event.target.result;
            if (row) {
                row[key] = newValue;
                const updateRequest = objectStore.put(row);
                updateRequest.onsuccess = function (event) {
                    console.log('更新成功');
                }
                updateRequest.onerror = function (event) {
                    console.log('更新失败');
                }
            }else{
                message
            }
        }
        request.onerror = function (event) {
            console.log('获取失败');
        }
    }
    return <div>
        <div onClick={newItem}>
        新增
        </div>
        <div onClick={()=>getItem('students','email','test@163.com')}>获取值</div>
        <div onClick={()=>deleteItem('students','email','test@163.com')}>删除</div>
        <div onClick={()=>updateItem('students','email','1test@163.com','111test@163.com')}>更新</div>
    </div>
}