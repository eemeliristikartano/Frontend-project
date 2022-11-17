import { useState, useEffect } from "react";
import { API_URL } from "../constants";

import { Table } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);

    const columns = [
        {
            title: 'Activity',
            dataIndex: 'activity'
        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date => dayjs(date.substring(0, 23)).locale('fi').format('DD.MM.YYYY') + ` ${date.substring(11, 16)}`)

        },
        {
            title: 'Duration (minutes)',
            dataIndex: 'duration'
        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            render: (customer => customer.firstname + ' ' + customer.lastname)
        }

    ]



    useEffect(() => {
        const getTrainings = async () => {
            try {
                const response = await fetch(API_URL + "gettrainings");
                const data = await response.json();
                setTrainings(data);

            } catch (error) {
                console.log(error);
            }
        }

        getTrainings();

    }, [])



    return (
        <>
            <Table
                sticky={true}
                columns={columns}
                dataSource={trainings}
                rowKey={training => training.id}
            />
        </>
    );
}