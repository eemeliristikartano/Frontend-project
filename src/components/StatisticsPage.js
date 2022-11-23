import { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, Label } from 'recharts';
import { API_URL } from '../constants';
import _ from 'lodash';



export default function StatisticsPage(props) {
    const [trainings, setTrainings] = useState([]);
    const [groupedTrainings, setGroupedTrainings] = useState([]);
    const [data, setData] = useState([]);

    useEffect(() => {
        const getTrainings = async () => {
            try {
                const response = await fetch(API_URL + 'api/trainings');
                const data = await response.json();
                setTrainings(data.content);
            } catch (error) {

            }

        }

        getTrainings();

    }, [props])

    useEffect(() => {
        const arr = []
        setGroupedTrainings(_.groupBy(trainings, 'activity'));
        for (const property in groupedTrainings) {
            arr.push({ name: property, activity: _.sumBy(groupedTrainings[property], 'duration') });
        }
        setData(arr);
    }, [trainings])







    return (
        <>
            <BarChart
                width={1000}
                height={500}
                data={data}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis >
                    <Label
                        style={{
                            textAnchor: "middle",
                            fontSize: "120%",
                        }}
                        value='Duration (min)'
                        angle={270}
                    />
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey="activity" fill="#8884d8" />

            </BarChart>


        </>);
}