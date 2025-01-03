import { Menu } from "antd";
import type { MenuProps } from "antd";
type MenuItem = Required<MenuProps>['items'][number];
const items: MenuItem[] = [
  {
    label: '用户',
    key: '1',
  },
  {
    label: '列表',
    key: '2',
  }
];
export default function SetLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>){
    return <div style={{display:'flex'}}>
           <Menu items={items}/> {children}
    </div>
}