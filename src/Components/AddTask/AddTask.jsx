import React, {useState} from 'react';
import './AddTask.scss';
import ToDoContainer from '../ToDoContainer/ToDoContainer';
import { useEffect } from 'react';

function AddTask() {
    const [allTasks, setAllTasks] = useState(JSON.parse(localStorage.getItem('tasks')) || []);
    const [taskTitle, setTaskTitle] = useState('');

    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(allTasks));
    }, [allTasks]);
    const handleInputChange = (e) => 
    {
        setTaskTitle(e.target.value);
    }
    const handleAddTask = () => {
        if (taskTitle === '')
        {
            return;
        }
        const copyTasks = [...allTasks];
        copyTasks.push({
            taskId: new Date().getTime(),
            taskTitle: taskTitle.trim(),
            isComplete: false
        })
        setAllTasks(copyTasks);
        setTaskTitle('');
    }
    const handleKeyDown = (e) => 
    {
        const key = e.key;
        if (key !== 'Enter')
        {
            return;
        }
        handleAddTask();
    }
    return (
        <div className='container'>
            <div className="add-task-section">
                <input 
                type="text" 
                value={taskTitle}
                onChange={(e) => handleInputChange(e)}
                onKeyDown={(e) => handleKeyDown(e)}
                placeholder='Create a new task...'
                />
                <button 
                className='create-taskBtn'
                onClick={() => handleAddTask()}
                >
                    Add Task
                </button>
            </div>
            <ToDoContainer 
            allTasks={allTasks}
            setAllTasks={setAllTasks}
            />
        </div>
    )
}

export default AddTask;
