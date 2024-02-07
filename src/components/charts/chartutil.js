import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import moment from 'moment';
import { fetchTasks } from '../../api';

const data01 = [
  { name: 'Group A', value: 400 },
  { name: 'Group B', value: 300 },
  { name: 'Group C', value: 300 },
  { name: 'Group D', value: 200 },
  { name: 'Group E', value: 278 },
  { name: 'Group F', value: 189 },
];

const data02 = [
  { name: 'Group A', value: 2400 },
  { name: 'Group B', value: 4567 },
  { name: 'Group C', value: 1398 },
  { name: 'Group D', value: 9800 },
  { name: 'Group E', value: 3908 },
  { name: 'Group F', value: 4800 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Chart = () => {
//   const demoUrl = 'https://codesandbox.io/s/two-simple-pie-chart-otx9h';

    const [data , setData] = useState([]);

    const [pieData, setPieData] = useState([
        { name: 'Completed Tasks', value: 30 },
        { name: 'Pending Tasks', value: 20 },
        { name: 'Due Tasks', value: 50 },
    ]) 

    const dataUtil = {
        completed: [],
        pending: [],
        due: [],
    }

    useEffect(() =>{
        ( async() => {
            try {
                const resp = await fetchTasks();
                console.log(resp.data, '[resp.data]-[chartutil.js]');
                setData(resp.data);
                const arr = resp.data;
                const today = moment().format('DD-MM-YYYY');
                arr.forEach((a) =>{
                    if(a.completed && a.dueDate===today){
                        // setDataUtil({...dataUtil, dataUtil['completed'].push(a)});
                        dataUtil.completed.push(a);
                    }else if(!a.completed && a.dueDate < today){
                        dataUtil.pending.push(a);
                    }else if(!a.completed && a.dueDate > today){
                        dataUtil.due.push(a);
                    }

                });

                // setPieData([...pieData, {}])

                setPieData([
                    { name: 'Completed Tasks', value: dataUtil.completed.length },
                    { name: 'Pending Tasks', value: dataUtil.pending.length },
                    { name: 'Due Tasks', value: dataUtil.due.length },
                ])
                
                console.log(dataUtil, '[dataUtil]');

            } catch (err) {
                console.error(err,'[error in CHartUtil');
            }
        })();
    },[]);

    return (
        <div>
            {/* <PieChart width={400} height={400}>
            <Pie
                dataKey="value"
                isAnimationActive={true}
                data={data01}
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
            />
            <Pie dataKey="value" data={data02} cx={500} cy={200} innerRadius={40} outerRadius={80} fill="#82ca9d" />
            <Tooltip />
            </PieChart> */}

            <PieChart width={400} height={200}>
                <Pie
                    dataKey="value"
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    label
                >
                    {data.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} label/>
                    ))}
                </Pie>
            </PieChart>
        </div>
    );
}

export default Chart;