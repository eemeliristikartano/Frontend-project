import { useState } from 'react';

import { PlusSquareTwoTone } from '@ant-design/icons';
import { Button, Modal, Form, Input, DatePicker, TimePicker } from 'antd';
import dayjs from 'dayjs';

export default function AddTrainingToCustomer(props) {
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });

    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setTraining({
            date: '',
            activity: '',
            duration: '',
            customer: ''
        })
        setOpen(false);
    }

    const handleSubmit = () => {
        setTraining({ ...training, customer: props.data.links[1].href })
        props.AddTrainingToCustomer(training);
        handleClose();
    }

    const handleChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value });
    }


    return (
        <>
            <Button
                type='primary'
                onClick={showModal}
            ><PlusSquareTwoTone /></Button>
            <Modal
                title='Add customer'
                open={open}
                onCancel={handleClose}
                okText='Submit'
                onOk={handleSubmit}
            >
                <Form>
                    <Form.Item
                        label='Date:'
                    >
                        <DatePicker
                            value={training.date ? dayjs(training.date).toISOString() : ''}
                            //name='date'
                            //onChange={console.log()}
                            showTime={true}
                        //format='DD.MM.YYYY HH:mm'
                        />
                    </Form.Item>
                    <Form.Item
                        label='Activity:'
                    >
                        <Input
                            name='activity'
                            value={training.activity}
                            onChange={handleChange}
                        />
                    </Form.Item>
                    <Form.Item
                        label='Duration:'
                    >
                        <Input
                            name='duration'
                            value={training.duration}
                            onChange={handleChange}
                        />
                    </Form.Item>
                </Form>


            </Modal>
        </>
    );

}