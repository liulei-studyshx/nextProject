'use client'
import {Form,Input,Button,Modal,Select} from 'antd'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}
const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 20,
        offset: 4,
      },
      sm: {
        span: 20,
        offset: 4,
      },
    },
  };
export default function Home() {
    const [form] = Form.useForm();
    const finishSetting = (values) => {
        console.log('values: ', values);
        
    }
    return <Modal open={true} title="新增页面">
        <Form form={form} {...layout} clearOnDestroy={true} autoComplete="off" onFinish={finishSetting}>
            <Form.Item name="type" label="type" >
                <Select>
                   {['React','Next','Three'].map(item=>{
                    return <Select.Option key={item} value={item}>{item}</Select.Option>
                   }) }
                </Select>
            </Form.Item>
            <Form.Item name="name" label="label" >
                <Input />
            </Form.Item>
            <Form.Item name="link" label="link">
                <Input />
            </Form.Item>
            {/* <Form.Item label={null}>
                <Button type="primary" htmlType="submit">Submit</Button>
            </Form.Item> */}
        </Form>
    </Modal>
}