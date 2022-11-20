import { useState, useEffect } from "react";
import { API_URL } from "../constants";

import { Table } from 'antd'
import dayjs from 'dayjs'
import 'dayjs/locale/fi'

export default function Traininglist() {
    const [trainings, setTrainings] = useState([]);
    const [activitys, setActivitys] = useState([]);
    const [dates, setDates] = useState([]);
    const [customers, setCustomers] = useState([]);

    //Columns for table
    const columnsDefs = [
        {
            title: 'Activity',
            dataIndex: 'activity',
            filters: activitys.map(activity => {
                return ({ text: activity, value: activity })
            }),
            onFilter: (value, record) => record.activity.indexOf(value) === 0,
            filterSearch: true

        },
        {
            title: 'Date',
            dataIndex: 'date',
            render: (date => dayjs(date.substring(0, 23)).format('DD.MM.YYYY HH:mm')),
            sorter: (a, b) => new Date(dayjs(a.date).unix()) - new Date(dayjs(b.date).unix()),
            sortDirections: ['ascend', 'descend'],
            filters: dates.map(date => {
                if (date != null) return ({ text: dayjs(date).format('DD.MM.YYYY'), value: date });
                else return null;
            }),
            onFilter: (value, record) => record.date.substring(0, 10).indexOf(value) === 0,
            filterSearch: true

        },
        {
            title: 'Duration (minutes)',
            dataIndex: 'duration',
            sorter: (a, b) => a.duration - b.duration,
            sortDirections: ['ascend', 'descend']

        },
        {
            title: 'Customer',
            dataIndex: 'customer',
            render: (customer => customer.firstname + ' ' + customer.lastname),
            filters: customers.map(customer => {
                return ({ text: customer, value: customer })
            }),
            onFilter: (value, record) => {
                const customer = record.customer.firstname + ' ' + record.customer.lastname;
                return customer.indexOf(value) === 0;
            },
            filterSearch: true

        }

    ];

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

    useEffect(() => {
        const trainingsArr = [];
        const datesArr = [];
        const customersArr = [];
        trainings.map(data => {
            // If the activity is not in the arr, push it to arr.
            if (!(trainingsArr.includes(data.activity)))
                trainingsArr.push(data.activity);
            // If full name is not in the arr, push it to arr.
            if (!(customersArr.includes(data.customer.firstname + ' ' + data.customer.lastname)))
                customersArr.push(data.customer.firstname + ' ' + data.customer.lastname);
            // If the date is not null and it is not in an arr, push it to arr.
            if (data.date != null) {
                if (!(datesArr.includes(data.date.substring(0, 10))))
                    datesArr.push(data.date.substring(0, 10));
            }
            return true;
        });
        setActivitys(trainingsArr);
        setCustomers(customersArr);
        setDates(datesArr);
    }, [trainings]);

    return (
        <>
            <Table
                bordered
                sticky={true}
                columns={columnsDefs}
                dataSource={trainings}
                rowKey={training => training.id}
            />
        </>
    );
}