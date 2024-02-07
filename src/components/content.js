import { useEffect, useState } from "react";
import { fetchTasks } from "../api";
import moment from "moment";
import { Cell, Pie, PieChart, Tooltip } from "recharts";
// import Tasks from "./tasks/tasks";
import CheckCircleOutlineSharpIcon from '@mui/icons-material/CheckCircleOutlineSharp';
import PendingActionsSharpIcon from '@mui/icons-material/PendingActionsSharp';
import Todos from "./todos/todo";



const COLORS = [ '#00C49F', '#0088FE', '#FFBB28'];


const Content = () =>{
    const [data , setData] = useState([]);
    const [pieData, setPieData] = useState([
        { name: 'Completed Tasks', value: 30 },
        { name: 'Pending Tasks', value: 20 },
        { name: 'Due Tasks', value: 50 },
    ]) 

    
    useEffect(() =>{
        ( async() => {
            try {
                const dataUtil = {
                    completed: [],
                    pending: [],
                    due: [],
                }
                const resp = await fetchTasks();
                setData(resp.data);
                const arr = resp.data;
                console.log(resp,'[resp]-[useEffect]-[content.js]');
                const today = moment().format('YYYY-MM-DD');
                arr.forEach((a) =>{
                    if(a.completed && a.dueDate===today){
                        dataUtil.completed.push(a);
                    }else if(!a.completed && a.dueDate > today){
                        dataUtil.pending.push(a);
                    }else if(!a.completed && a.dueDate <= today){ 
                        dataUtil.due.push(a);
                    }

                });

                setPieData([
                    { name: 'Completed Tasks', value: dataUtil.completed.length },
                    { name: 'Pending Tasks', value: dataUtil.pending.length },
                    { name: 'Due Tasks', value: dataUtil.due.length },
                ])
                
            } catch (err) {
                console.error(err,'[error in CHartUtil');
            }
        })();
    },[]);

    
    
    
    
    return (
        <div className="content">
            
            <div className="chart-and-card">
                <div className="card-container">

                    <div className="completed">
                        <CheckCircleOutlineSharpIcon />
                        <h6>Completed Tasks</h6>
                        <h4>{pieData[0].value}</h4>
                    </div>

                    <div className="pending">
                        <PendingActionsSharpIcon />
                        <h6>Pending Tasks</h6>
                        <h4>{pieData[1].value}</h4>
                    </div>
                </div>

                <div className="chart-container">
                    <PieChart width={400} height={200}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={true}
                            data={pieData}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        >
                            {pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip/>
                    </PieChart>
                </div>
            </div>


            <div className="task-container"> 
                <Todos tasks = {data} setTasks = {setData}/>
            </div>
        </div>
    );
}

export default Content;