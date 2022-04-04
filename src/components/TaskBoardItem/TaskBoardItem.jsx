import React, { useState } from 'react'
import TaskCard from "../TaskCard";
import "./style.css";
import CreateCard from "../CreateCard";

function TaskBoardItem({ title, value, changeTaskStatus, taskByStatus, tasksList, setTasksList}) {
	const [isOpened, setIsOpened] = useState(false);

	function handleRemove(id) {
		const newTasksLists= tasksList.filter((task) => task.id !== id);
		setTasksList(newTasksLists);
	}

	function handlAddingCard(newTasksList) {	
		setTasksList([
			newTasksList,
			...tasksList
		])
	}
	
	function handlChangingTask(modifiedTask) {
		const modifiedTasks = tasksList.map((task)=>
			task.id===modifiedTask.id ? modifiedTask : task
		)

		setTasksList(modifiedTasks)
	}

	function handlChangingTaskStatus(taskWithNewStatus) {
		const modifiedTasks = tasksList.map((task)=>
			task.id===taskWithNewStatus.id ? taskWithNewStatus : task
		)
		setTasksList(modifiedTasks)
	}

	function handleOpenForm(bool){
		setIsOpened(bool);
	}

	return (
		<div className={`task-board__item item-${value}`}>
			{
				isOpened ? <CreateCard onChange={handleOpenForm} addingNewTask={handlAddingCard} status={value}/> : null
			}
			<div className={`status status-${value}`}>
				<span className="item__text">
					{title} 
					<span className="item__count">
						{taskByStatus.length}
					</span>
				</span>
				<button type="button" className="status__button status__button-add" onClick = {() => handleOpenForm(true)}>+</button>
			</div>
			{
				taskByStatus.map((task) => 
						<TaskCard key={task.id} isTaskChanged = {handlChangingTask} 
							handleDelForm = {handleRemove} handleStatusChanged={handlChangingTaskStatus}
							changeTaskStatus = {changeTaskStatus} task = {task}/>
				)
			}
		</div>
	);
}

export default TaskBoardItem;