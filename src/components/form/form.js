import { useEffect, useState } from "react";
import { createTask, updateTask } from "../../api";
import moment from "moment";


const Form = (props) =>{

    let [formData, setFormData] = useState({
        title: "",
        description: '',
        dueDate:'',
        completed: false,
        priority: 1,
    });

    useEffect(() =>{
        if(props.task ){
            setFormData(props.task);
        }
    },[props.task]);


    const handleChange = (e) =>{
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    }

    const handleSubmit = async(e) =>{
        e.preventDefault();

        if(props.task){
            try {
                const resp = await updateTask(props.task._id, {
                    title: formData.title,
                    description: formData.description,
                    dueDate: formData.dueDate,
                    priority: formData.priority,
                    completed: formData.completed,
                });
                const tasks = props.tasks;
                const filteredArray = tasks.filter((t) => t._id !== props.task._id);
                const dataUtil = {
                    completed: [],
                    pending: [],
                    due: [],
                }
                const arr = [...filteredArray,resp.data];
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

                props.setPieData([
                    { name: 'Completed Tasks', value: dataUtil.completed.length },
                    { name: 'Pending Tasks', value: dataUtil.pending.length },
                    { name: 'Due Tasks', value: dataUtil.due.length },
                ]);
                props.setTasks(arr);
                props.onCloseDrawer();
    
            } catch (err) {
                console.error(err, '[error in updating task]-[form.js]');
            }
        }else{
            console.log('Trying to create task');
            try {
                const resp = await createTask(formData);
                const arr  = [...props.tasks, resp.data];
                const dataUtil = {
                    completed: [],
                    pending: [],
                    due: [],
                }
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

                props.setPieData([
                    { name: 'Completed Tasks', value: dataUtil.completed.length },
                    { name: 'Pending Tasks', value: dataUtil.pending.length },
                    { name: 'Due Tasks', value: dataUtil.due.length },
                ]);
                props.setTasks(arr);
                props.onCloseDrawer();
            } catch (err) {
                console.error(err, '[error in task creation]');
            }
        }
    }




    return (
        <div className="form-container">
            <form className="drawer-form" onSubmit={handleSubmit} >
                <div>
                    <label htmlFor="title" className="label"> Title</label>
                    <input type="text" className="input" name = 'title' id ='title' value={formData.title} onChange={handleChange} placeholder="Title" />
                </div>

                <div>
                    <label htmlFor="description" className="label">Description</label>
                    <input type="text" className="input" name='description' id ='description'  value={formData.description} onChange={handleChange} placeholder="Description"/>
                </div>

                <div>
                    <label htmlFor="dueDate" className="label">Due Date</label>
                    <input type="date" className="input" name = 'dueDate' id ='dueDate' value={formData.dueDate} onChange={handleChange} placeholder="" />
                </div>

                <div>
                    <label htmlFor="priority" className="label">Priority</label>
                    <select name="priority" onChange={handleChange} value={formData.priority} id="priority" className="select">
                        <option value={1} >1</option>
                        <option value={2}>2</option>
                        <option value={3}>3</option>
                    </select>
                </div>

                <div>
                    <label htmlFor="completed-status" className="label">Completed Status</label>
                    <input type="checkbox" className="checkbox" name ='completed' id='completed-status' checked={formData.completed} value = {formData.completed} onChange={handleChange} placeholder="" />
                </div>

                <button type="submit" className="button" style={{marginTop: "20px"}}>Submit</button>
            </form>
        </div>
    )
}

export default Form ;