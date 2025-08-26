'use client'

import { useState,useEffect,useRef } from "react"
import { Button } from "antd"
import {push,pop} from '../common/scheduleMineHeap'

export default function Page() {
    const container = useRef(null);
    const [loopRunning,setLoopRunning] = useState(false);
    const queue = useRef([]);

    useEffect(() => {
        for(let i = 0;i < 3000;i++) {
            const node = {
                callback:performWorkUnit,
                id: i,
                sortIndex:100
            }
            push(queue.current,node)
        }
    },[])

    //阻塞1ms
    function performWorkUnit(color='#000',text = 1){
        const startTime = performance.now();
        let span = document.createElement('span')
        span.style.color = color
        span.innerText = text
        while(performance.now() - startTime < 1) {
            
        }
        container.current.appendChild(span)
    }

    function __click() {
        setLoopRunning(true)
        requestIdleCallback(workLoop)
    }

    function workLoop(deadline) {
        if(queue.current.length == 0){
            return setLoopRunning(false)
        }
        requestIdleCallback((deadline)=>{
            let node;
            while((node = pop(queue.current))&&!deadline.didTimeout &&deadline.timeRemaining()>0){
                node.callback()
            }
            workLoop()
        })
    }

    function __cutinClick() {
        const node = {
            callback:()=>performWorkUnit('red',2),
            id: 0,
            sortIndex:1
        }
        push(queue.current,node)
    }
    return (
        <div className='space-y-4'>
        <div className='space-x-2'>
            <Button success="true" disabled={!loopRunning} onClick={__cutinClick}>插入高优先级任务</Button>
            <Button danger disabled={loopRunning} onClick={__click}>{!loopRunning ? '插入 100 万个子节点' : '插入中...'}</Button>
        </div>

        <div ref={container} style={{width:'100%',wordBreak:'break-all'}} className='h-72 break-words overflow-y-scroll'></div>
        </div>
    )
}