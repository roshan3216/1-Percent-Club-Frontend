import EditNoteSharpIcon from '@mui/icons-material/EditNoteSharp';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { useState } from 'react';
import Drawer from '@mui/material/Drawer';
import Form from '../../form/form';
import { deleteTask } from '../../../api';

const TaskItem = (props) =>{
    const [state, setState] = useState({
        top: false,
        left: false,
        bottom: false,
        right: false,
    });

    const task = props.task;

    const toggleDrawer = (anchor, open) => (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
          return;
        }
    
        setState({ ...state, [anchor]: open });
    };

    const handleDelete = async(e) =>{
        console.log('Delete Button clicked');
        try {
            const resp = await deleteTask(task._id);
            const tasks = props.tasks;
            const filteredArray = tasks.filter((t) => t._id !== props.task._id);
            props.setTasks(filteredArray);
            console.log(resp.data, '[resp.data]-[handleDelete]-[taskItem.js]');
        } catch (err) {
            console.error(err, '[error in deleting taskItem]');
        }
    }

    return (
        // <div>

            <div className='task-item'>
                <div className="task-title">
                    {task.title}
                </div>

                <div className='task-due-date'>
                    {task.dueDate}
                </div>

                <div className='task-priority'>
                    {task.priority}
                </div>

                <div className='task-completed'>
                    {task.completed ? 'Completed' : 'Incomplete'}
                </div>

                <div className='button-wrapper'>
                    <button onClick={toggleDrawer('right',true)}>
                        <EditNoteSharpIcon style={{color: "#798099"}} />
                    </button>

                    <Drawer
                        anchor='right'
                        open={state['right']}
                        onClose={toggleDrawer('right', false)}
                    >
                        <Form onCloseDrawer={() => setState({ ...state, right: false })} task = {props.task} tasks ={props.tasks} setTasks ={props.setTasks}/>
                    </Drawer>


                    <button onClick={handleDelete}>
                        <DeleteOutlineIcon style={{color: "#798099"}}/>
                    </button>
                </div>
            </div>
        // </div>
    )
}

export default TaskItem;