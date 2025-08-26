'use client'
import { useEffect, useState } from 'react'

export default function page(){
    const useAsyncEffect=(effect, deps)=>{
        useEffect(() => {
            effect().catch(console.error)
        }, deps)
    }
    useAsyncEffect(async () => {
        const response = await fetch('https://ndp.data.neolix.cn/service/test/ndp/aicar/car/id/list?access_token=0000002IM8CF3OTHCA12FBC86C77A01A70981F11A94A441A')
        const data = await response.json()
        console.log(data)
    },[])


    return <div>test</div>
}
