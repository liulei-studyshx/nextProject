'use client'
import { useEffect, useRef, useState } from 'react'
import { Button } from 'antd';

export default function Pages(){
    const [loopRunning,setLoopRunning] = useState(false);
    const container = useRef(null);
    const queue = useRef(Array.from({length: 100000}, () => performWorkUnit));

    function performWorkUnit() {
        let span = document.createElement('span')
        span.innerText = '1'
        container.current.appendChild(span)
    }
    const __click = () => {
        setLoopRunning(true);
        requestIdleCallback(workLoop)
    }

    
    const workLoop = () => {
        if(queue.current.length == 0){
             setLoopRunning(false);
             return
        }
        requestIdleCallback((deadline)=>{
            let performWorkUnit;
            while((performWorkUnit = queue.current.pop()) && !deadline.didTimeout && deadline.timeRemaining() > 0){
                performWorkUnit()
            }
            workLoop()
        })
    }

    return (<div className='space-y-4'>
    <Button disabled={loopRunning} danger onClick={__click}>插入 100 万个子节点</Button>
    <div ref={container} className='h-72 break-words overflow-y-scroll'></div>
  </div>)
}