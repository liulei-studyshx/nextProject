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
    key: "reacts",
  },
  {
    label: "Next.js",
    key: "next",
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
      {key:'textureDashedLine',label:'贴图生成斑马线'}
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
