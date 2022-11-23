import { useState } from 'react';

import { EditOutlined } from '@ant-design/icons';
import { Button, Modal } from 'antd';
import CustomerForm from './CustomerForm';

export default function EditCustomer(props) {
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
        setCustomer({
            firstname: props.data.firstname,
            lastname: props.data.lastname,
            streetaddress: props.data.streetaddress,
            postcode: props.data.postcode,
            city: props.data.city,
            email: props.data.email,
            phone: props.data.phone
        });
    }

    const handleChange = (e) => {
        setCustomer({ ...customer, [e.target.name]: e.target.value });
    }

    const handleClose = () => {
        setOpen(false);
    }

    const handleSubmit = () => {
        props.updateCustomer(customer, props.data.links[1].href);
        handleClose();
    }

    return (
        <>

            <Button onClick={showModal}>
                Edit <EditOutlined />
            </Button>
            <Modal
                title='Edit customer'
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