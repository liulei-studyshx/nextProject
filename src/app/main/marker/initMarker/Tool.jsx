'use client'
import {useEffect, useState} from 'react'
import { BorderOutlined }from '@ant-design/icons';
import { Tooltip } from 'antd';
import {pointInPolygon} from './common.js';

const filterTypes = {
    box: {
        label: '2D矩形',
        checked: <BorderOutlined />,
        default: <BorderOutlined />
      },
    }
export default function Tool(props) {
    const [tools,setTools] = useState([]);
    const [currentTool, setCurrentTool] = useState('');
    useEffect(()=>{
        tools.push('box');
        setTools([...tools]);
    },[])
    // 绘制矩形
    const toolClick = (item)=>{
        setCurrentTool(item);
        // pointInPolygon(window.map.map)
        window.map.drawOnImage(item,'#ff0000')
    }
  
    return <div className="tools">
        <div className="tool">
            工具
        </div>
        {tools.map(item=><Tooltip title={filterTypes[item].label} key={filterTypes[item].label}>
            <div className={`tool_item ${item == currentTool ? 'tool_item_active' : ''}`} onClick={()=>toolClick(item)}>
            {item === currentTool  ? filterTypes[ item ].checked: filterTypes[ item ].default}
            </div>
        </Tooltip>)}
        {/* <div className="tools" onClick={toolClick}>
            2D矩形
        </div> */}
    </div>
}