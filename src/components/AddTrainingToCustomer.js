import { useState } from 'react';

import { PlusSquareTwoTone } from '@ant-design/icons';
import { Button, Modal, Form, Input, DatePicker, InputNumber } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc)
dayjs.extend(timezone)

export default function AddTrainingToCustomer(props) {
    const [date, setDate] = useState('');
    const [training, setTraining] = useState({
        date: '',
        activity: '',
        duration: '',
        customer: ''
    });
    const [open, setOpen] = useState(false);

    const showModal = () => {
        setOpen(true);
        setTraining({ ...training, customer: props.data.links[1].href });
    }

    const handleClose = () => {
        setDate(null);
        setTraining({
            date: null,
            activity: '',
            duration: '',
            customer: ''
        })
        setOpen(false);
    }

    const handleSubmit = () => {
        props.addTrainingToCustomer(training);
        handleClose();
    }

    const handleChange = (e) => {
        setTraining({ ...training, [e.target.name]: e.target.value, date: date });
    }

    return (
        <>
            <Button
                type='primary'
                onClick={showModal}
            ><PlusSquareTwoTone /></Button>
            <Modal
                title='Add training to customer'
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
                            onChange={e => setDate(dayjs(e).utc(true).toISOString())}
                            showTime={true}
                            format='DD.MM.YYYY HH:mm'
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
                        <InputNumber
                            name='duration'
                            value={training.duration}
                            onChange={handleChange}
                            type='number'
                        />
                    </Form.Item>
                </Form>


            </Modal>
        </>
    );

}