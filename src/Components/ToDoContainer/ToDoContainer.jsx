import React from 'react';
import './ToDoContainer.scss';
import { useState } from 'react';

const ToDoContainer = ({allTasks, setAllTasks}) => {
    console.log(allTasks);
    const [updatedTaskTitle, setUpdatedTaskTitle] = useState('');
    const [currUpdatingTask, setCurrUpdatingTask] = useState(null);
    const handleTaskCompleteBtn = (taskId) => 
    {
        const updatedTasks = allTasks.map((task) => 
        {
            if (task.taskId === taskId)
            {
                task.isComplete = !(task.isComplete);
            }
            return task;
        })
        setAllTasks(updatedTasks);
    }
    const handleTaskDeleteBtn = (taskId) => 
    {   
        const newTasks = allTasks.filter((task) => {
            return (task.taskId !== taskId);
        })
        setAllTasks(newTasks);
    }
    const handleTaskTitleUpdate = (e) => 
    {
        setUpdatedTaskTitle(e.target.value);
    }
    const handleUpdateBtnClick = (taskId) => 
    {
        const updatedTasks = allTasks.map((task) => 
        {
            if (task.taskId === taskId)
            {
                task.taskTitle = updatedTaskTitle;
            }
            return task;
        })
        setAllTasks(updatedTasks);
        setUpdatedTaskTitle('');
        setCurrUpdatingTask(null);
    }
    const handleEditBtnClick = (task) => 
    {
        setUpdatedTaskTitle(task.taskTitle);
        setCurrUpdatingTask(task.taskId);
    }
    return (
        <div className='task-container'>
            {
                allTasks.map((task, idx) => 
                {
                    return (
                        <div 
                        key={task.taskId}
                        className="task"
                        >
                            {
                                (currUpdatingTask === task.taskId) ? ''
                                : (
                                    <span className={`task-title ${task.isComplete ? 'complete' : ''}`}>{task.taskTitle}</span>
                                )
                            }
                            {
                                (currUpdatingTask && currUpdatingTask === task.taskId) && (
                                    <input 
                                    type="text" 
                                    onChange={(e) => handleTaskTitleUpdate(e)}
                                    value={updatedTaskTitle}
                                    className='update-task'
                                    />
                                )
                            }
                            <div className="task-buttons">
                                {
                                    (currUpdatingTask === task.taskId) &&
                                    (<button 
                                    className='updateBtn'
                                    onClick={() => handleUpdateBtnClick(task.taskId)}
                                    >Update</button>)
                                }
                                <button className='finished-btn'
                                onClick={() => handleTaskCompleteBtn(task.taskId)}
                                >Finished</button>
                                {
                                    (currUpdatingTask === task.taskId) ? ''
                                    : (<button className='editBtn'
                                        onClick={() => handleEditBtnClick(task)}
                                        >Edit</button>)
                                }
                                <button className='deleteBtn'
                                onClick={() => handleTaskDeleteBtn(task.taskId)}
                                >Delete</button>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default ToDoContainer;
