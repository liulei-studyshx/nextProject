'use client'
import {Menu} from "antd";
import type { MenuProps } from 'antd';
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label:'React',
    key:'1'
  },
  {
    label:'Next.js',
    key:'2'
  },
  {
    label:'Three.js',
    key:'3'
  }
]
export default function Home() {
  const horizontalMenuClick: MenuProps['onClick'] = () => {
    
  }
  return (
    <div>
      <Menu onClick={horizontalMenuClick} items={items} mode="horizontal" theme="dark" style={{display:'flex',justifyContent:'flex-end'}}/>

    </div>
  );
}
