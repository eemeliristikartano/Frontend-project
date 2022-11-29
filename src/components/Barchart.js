import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

export default function Barchart(props) {
    return (
        <>
            <h1>Bar chart</h1>
            <BarChart
                width={600}
                height={400}
                data={props.data}
            >
                <CartesianGrid strokeDasharray='3 3' />
                <XAxis dataKey='name' />
                <YAxis >
                </YAxis>
                <Tooltip />
                <Legend />
                <Bar dataKey='duration' fill='#8884d8' />
            </BarChart>
        </>
    );
}