import { useState } from 'react';
import { Button, Modal } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import CustomerForm from './CustomerForm';

export default function AddCustomer(props) {
    const [customer, setCustomer] = useState({
        firstname: '',
        lastname: '',
        streetaddress: '',
        postcode: '',
        city: '',
        email: '',
        phone: ''
    })
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setCustomer({
            firstname: '',
            lastname: '',
            streetaddress: '',
            postcode: '',
            city: '',
            email: '',
            phone: ''
        });
        setOpen(false);
    }

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const handleSubmit = () => {
        props.addCustomer(customer);
        handleClose();
    }


    return (
        <>
            <Button
                type='primary'
                onClick={showModal}
            >
                Add customer
                <UserAddOutlined />
            </Button>
            <Modal
                title='Add customer'
                open={open}
                onCancel={handleClose}
                okText='Submit'
                onOk={handleSubmit}
            >
                <CustomerForm handleChange={handleChange} customer={customer} />
            </Modal>
        </>
    );
}