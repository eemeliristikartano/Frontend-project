import { Modal, Button } from 'antd';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
import timezone from 'dayjs/plugin/timezone';
dayjs.extend(utc);
dayjs.extend(timezone);

export default function EventModal(props) {
    return (
        <>
            <Modal
                title='Event'
                open={props.open}
                footer={[
                    <Button type='primary' onClick={() => props.handleClose()}>Close</Button>
                ]}
            >
                <h3>{`Activity / customer: ${props.event._def != null ? props.event._def.title : ''}`}</h3>
                <h4>{`Starts: ${props.event._instance != null ? dayjs(props.event._instance.range.start).utc(false).format('DD.MM.YYYY HH:mm') : ''}`}</h4>
                <h4>{`Ends: ${props.event._instance != null ? dayjs(props.event._instance.range.end).utc(false).format('DD.MM.YYYY HH:mm') : ''}`}</h4>
                <h4>{`Duration: ${props.event._instance != null ? (dayjs(props.event._instance.range.end).unix() - dayjs(props.event._instance.range.start).unix()) / 60 + ' min' : ''}`}</h4>
            </Modal>
        </>
    );
}