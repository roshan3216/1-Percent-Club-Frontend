import TaskItem from "./taskItem/taskItem";


const Tasks = (props) =>{
    const tasks = props.tasks;

    return (
        <div className="task-container">
            <div className='task-item-heading'>

                <div className='task-title'>
                    {"Title".toUpperCase()}
                </div>

                <div className='task-due-date'>
                    {"Due Date".toUpperCase()}
                </div>

                <div className='task-priority'>
                    {"Priority".toUpperCase()}
                </div>

                <div className='task-status'>
                    {"Status".toUpperCase()}
                </div>

                <div className='task-actions'>
                    {"Actions".toUpperCase()}
                </div>

            </div>
            <div className="task-item-container">

                {tasks.map((task) =>{
                    return <TaskItem key={task._id} task= {task} tasks = {tasks} setTasks = {props.setTasks} setPieData = {props.setPieData}/>
                })}
            </div>
        </div>
    )
}

export default Tasks;