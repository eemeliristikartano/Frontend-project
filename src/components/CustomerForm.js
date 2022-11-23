import { Form, Input } from 'antd';

//Form for adding a new customer or editing an existing customer.
export default function CustomerForm(props) {
    return (
        <>
            <Form>
                <Form.Item
                    label='First name'
                >
                    <Input
                        name='firstname'
                        value={props.customer.firstname}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
                <Form.Item
                    label='Last name'
                >
                    <Input
                        name='lastname'
                        value={props.customer.lastname}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
                <Form.Item
                    label='Streetaddress'
                >
                    <Input
                        name='streetaddress'
                        value={props.customer.streetaddress}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
                <Form.Item
                    label='Postcode'
                >
                    <Input
                        name='postcode'
                        value={props.customer.postcode}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
                <Form.Item
                    label='City'
                >
                    <Input
                        name='city'
                        value={props.customer.city}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
                <Form.Item
                    label='Email'
                >
                    <Input
                        name='email'
                        value={props.customer.email}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
                <Form.Item
                    label='phone'
                >
                    <Input
                        name='phone'
                        value={props.customer.phone}
                        onChange={e => props.handleChange(e)}
                    />
                </Form.Item>
            </Form>
        </>)

}