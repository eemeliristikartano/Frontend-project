import { PieChart, Pie, Tooltip } from 'recharts';

export default function Piechart(props) {
    return (
        <>
            <h1>Pie chrart</h1>
            <PieChart width={650} height={400} >
                <Pie
                    dataKey='duration'
                    data={props.data}
                    cx='50%'
                    cy='50%'
                    outerRadius={180}
                    fill='#8884d8'
                    label
                />
                <Tooltip />
            </PieChart>
        </>
    );
}