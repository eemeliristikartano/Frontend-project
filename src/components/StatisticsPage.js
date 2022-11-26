import { useState, useLayoutEffect } from 'react';
import { API_URL } from '../constants';
import _ from 'lodash';
import Barchart from './Barchart';
import Piechart from './Piechart';
import { Space } from 'antd';

export default function StatisticsPage(props) {
    const [trainings, setTrainings] = useState([]);
    const [groupedTrainings, setGroupedTrainings] = useState([]);
    const [data, setData] = useState([]);

    const getTrainings = async () => {
        try {
            const response = await fetch(API_URL + 'api/trainings');
            const data = await response.json();
            setTrainings(data.content);
        } catch (error) {
            console.log(error)
        }
    }

    useLayoutEffect(() => {
        getTrainings();
    }, [props]);

    useLayoutEffect(() => {
        const arr = []
        setGroupedTrainings(_.groupBy(trainings, 'activity'));
        for (const property in groupedTrainings) {
            //         Name of the activity.        That activity's durations total.
            arr.push({ name: property, duration: _.sumBy(groupedTrainings[property], 'duration') });
        }
        setData(arr);
        // eslint-disable-next-line
    }, [trainings]);

    return (
        <>
            <Space>
                <Barchart data={data} />
                <Piechart data={data} />
            </Space>
        </>);
}