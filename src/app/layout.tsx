/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
// import type { Metadata } from "next";
import { AntdRegistry } from "@ant-design/nextjs-registry";
import { ConfigProvider, Menu } from "antd";
// import localFont from "next/font/local";
import { useState } from "react";
import { useRouter } from 'next/navigation'
import { SettingOutlined } from '@ant-design/icons';
import "antd/dist/reset.css";
import "./globals.css";
import type { MenuProps } from 'antd';
import Setting from './set/Setting';
type MenuItem = Required<MenuProps>["items"][number];
const items: MenuItem[] = [
  {
    label: "React",
    key: "reactjs",
    children:[{key:'concurrence',label:'并发模式'},{key:'highPriority',label:'高优先级任务'}]
  },
  {
    label: "标注(openLayer)",
    key: "marker",
    children:[{key:'initMarker',label:'初始化图片'}]
  },
  {
    label: "Three.js",
    key: "three",
    children:[
      {key: 'euler',label: '欧拉角'},
      {key:'3DRoom',label: '3D房间'},
      {key:'interactiveLine',label: 'interactiveLine'},
      {key:'BufferGeometry',label: 'BufferGeometry'},
      {key:'机器人动画',label: 'blendingAnimation'},
      {key:'textureDashedLine',label:'贴图生成斑马线'},
      {key:'pcdLoader',label:'点云加载'},
      {key:'basicKnowledge',label:'基础知识'},
      {key:'collision',label:'碰撞检测',children: [
          {key:'collisionRaycaster',label:'射线检测'},
          {key:'boundBox',label:'盒子检测'},
        ]
      },
      {key:'shader',label:'着色器',children:[
        {key:'shaderGradient',label:'渐变着色器'},
        {key:'shaderParam',label:'uniform着色器'},
        {key:'shaderTexture',label:'纹理着色器'},
        {key:'textureMousePosition',label:'鼠标位置纹理'}
      ]},
      {key:'sam_study',label:'SAM'}
    ]
  },
  {
    label:"javascript",
    key:'javascript',
    children:[
      {key:'sse',label:'SSE'},
      {key:'fabric',label:'fabricStudy'},
      {key:'useAsyncEffects',label:'异步Effect'},
      {key:'indexDB',label:'indexDB'}
    ]
  },
  {
    label:'Cesium',
    key:'cesium',
    children:[
      {key:'cesiumBasicKnowledge',label:'基础知识'},
    ]
  },
  {
    label: "",
    key: "4",
    icon: <SettingOutlined />,
  },
];
interface IMenuItem {
  label: string;
  key: string;
  id: number;
  path: string;
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [menuList, setMenuList] = useState<IMenuItem[]>([]);
  const [showSetting,setShowSetting] = useState<Boolean>(false)

  const horizontalMenuClick: MenuProps["onClick"] = async ({ key,keyPath }) => {
    console.log('keyPath',keyPath)
    if (key == '4') {
      //跳转到设置页面
      // router.push("/set");
      setShowSetting(true)
    } else {
      const res = await fetch(
        `${window.location.origin}/api/set/getListByType?type=${key}`
      );
      const data = await res.json();
      data.map((item:any) => {
        item.key = item.path;
        item.label = item.title;
      });
      setMenuList(data);
      router.replace('/main/'+ keyPath.reverse().join('/'));
    }
   
  };
  const jump = ({ key }: {key:string}) => {
    router.push(key);
  };
  return (
    <html lang="en">
      <body>
        <AntdRegistry>
          <ConfigProvider wave={{ disabled: true }}>
            <Menu
              onSelect={horizontalMenuClick}
              items={items}
              mode="horizontal"
              theme="dark"
              style={{ display: "flex", justifyContent: "flex-end" }}
            />
            <div style={{ display: "flex",height:'calc( 100% - 46px)' }}>
              <Menu items={menuList} onSelect={jump} />
              {children}
              {showSetting&&<Setting/>}
            </div>
          </ConfigProvider>
        </AntdRegistry>
      </body>
    </html>
  );
}
