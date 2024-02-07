import { Drawer, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { useEffect, useState } from "react";
import Tasks from "../tasks/tasks";
import moment from 'moment';
import Form from "../form/form";




const Todos = (props) =>{
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });
    const [item, setItem] = useState('');
    const tasks = props.tasks;
    const [tempTasks, setTempTasks] = useState([]);

    useEffect(() =>{
        setTempTasks(props.tasks);
    },[props.tasks])

    const sortByDueDate = () =>{
        if(tasks && !tasks.length){
            return ;
        }
        const dueTasks = [];
        const today = moment().format('YYYY-MM-DD')
        const remTasks = [];

        tasks.forEach((task)=>{
            if(!task.completed && task.dueDate <= today ){
                dueTasks.push(task);
            }else{
                remTasks.push(task);
            }
        });

        dueTasks.sort((a,b)=>{
            if(a.dueDate < b.dueDate){
                return -1;
            }
            if(a.dueDate > b.dueDate){
                return 1;
            }
            return 0;
        });

        // remTasks.sort((a,b)=>{
        //     if(a.dueDate < b.dueDate){
        //         return 1;
        //     }
        //     if(a.dueDate > b.dueDate){
        //         return -1;
        //     }
        //     return 0;
        // });

        const sorted = [...dueTasks];
        setTempTasks(sorted);
        // props.setTasks(sorted);
    }

    const sortByTodayTasks = () =>{
        if(tasks && !tasks.length){
            return ;
        }

        const todayTasks = [];
        const today = moment().format('YYYY-MM-DD')
        const remTasks = [];

        tasks.forEach((task)=>{
            if(task.dueDate >= today){
                todayTasks.push(task);
            }else{
                remTasks.push(task);
            }
        });

        todayTasks.sort((a,b) =>{
            if(a.dueDate < b.dueDate){
                return -1;
            }
            if(a.dueDate > b.dueDate){
                return 1;
            }
            return 0;
        });

        // remTasks.sort((a,b)=>{
        //     if(a.dueDate < b.dueDate){
        //         return 1;
        //     }
        //     if(a.dueDate > b.dueDate){
        //         return -1;
        //     }
        //     return 0;
        // });

        const sorted = [...todayTasks];
        setTempTasks(sorted);
        // props.setTasks(sorted);
    }

    const sortByTomorrowTasks = () =>{
        if(tasks && !tasks.length){
            return ;
        }

        const tomorrowTasks = [];
        const tomorrow = moment().add(1, 'day').format('YYYY-MM-DD');
        
        const remTasks = [];

        tasks.forEach((task)=>{
            if(task.dueDate >= tomorrow){
                tomorrowTasks.push(task);
            }else{
                remTasks.push(task);
            }
        });

        tomorrowTasks.sort((a,b)  =>{
            if(a.dueDate < b.dueDate){
                return -1;
            }
            if(a.dueDate > b.dueDate){
                return 1;
            }
            return 0;
        });

        // remTasks.sort((a,b) =>{
        //     if(a.dueDate < b.dueDate){
        //         return 1;
        //     }
        //     if(a.dueDate > b.dueDate){
        //         return -1;
        //     }
        //     return 0;
        // });

        const sorted = [...tomorrowTasks];
        setTempTasks(sorted);
        // props.setTasks(sorted);
    }

    const sortByPriority = () =>{
        if(tasks && !tasks.length){
            return ;
        }

        const sorted = [...tasks];

        sorted.sort((a,b) =>{
            if(a.priority < b.priority){
                return 1;
            }
            if(a.priority > b.priority){
                return -1;
            }
            return 0;
        });

        setTempTasks(sorted);
        // props.setTasks(sorted);
    }

    const sortByCreationDate = () =>{
        if(tasks && !tasks.length){
            return ;
        }

        const sorted = [...tasks];

        sorted.sort((a,b) =>{
            if(a.createdAt < b.createdAt){
                return 1;
            }
            if(a.createdAt > b.createdAt){
                return -1;
            }
            return 0;
        });
        setTempTasks(sorted);

        // props.setTasks(sorted);
    }

    const sortMap = {
        0: sortByDueDate,
        1: sortByTodayTasks,
        2: sortByTomorrowTasks,
        3: sortByPriority,
        4: sortByCreationDate,
    }

    const handleChange = (e) =>{
        const {value} = e.target;
        sortMap[value]();
        setItem(value);
    }

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };


    return (
        <div>
        <div className="to-dos-content">
            <p className="to-dos-heading">To Dos</p>
            

            <div className="sort-container">

                <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label" style={{color: "white"}}>Sort By</InputLabel>
                    <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={item}
                    label="sortby"
                    onChange={handleChange}
                    className="select-container"
                    style={{
                        color: "#9da1b1",
                        "&:active, &:hover": {
                          borderColor: "red !important",
                          outlineColor: "red !important",
                        },
                    }}
                    >

                    <MenuItem key={0} name='sortByDueDate' value={0}>Due Tasks</MenuItem>
                    <MenuItem key={1} name='sortByTodayTasks' value ={1}>Today's tasks</MenuItem>
                    <MenuItem key={2} name='sortByTomorrowTasks' value ={2}>Tomorrow's tasks</MenuItem>
                    <MenuItem key={3} name='sortByPriority' value = {3}>Priority</MenuItem>
                    <MenuItem key={4} name='sortByCreationDate' value={4}>Creation Date</MenuItem>
                    </Select>
                </FormControl>
            </div>

            <Tasks tasks = {tempTasks} setTasks = {props.setTasks}/>

        </div>
        <div className="task-button">
            <button className="button" onClick={toggleDrawer('right',true)} style={{backgroundColor: "#286aa8", marginRight: "10px"}}>
                Add a Task    
            </button>

            <Drawer
                anchor='right'
                open={state['right']}
                onClose={toggleDrawer('right', false)}
            >
                <Form onCloseDrawer={() => setState({ ...state, right: false })} task = {props.task} tasks = {props.tasks} setTasks ={props.setTasks}/>
            </Drawer>

        </div>
        </div>
    )
}


export default Todos;