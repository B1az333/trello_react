import React, { useState, useEffect } from "react";
import "./style.css";
import TaskBoardItem from "../TaskBoardItem/TaskBoardItem";
import StatusRequest from "../../services/StatusRequest";
import UserStorage from '../../utils/UserStorage.js';
import { movingСard } from "../../utils/movingСard";
import CardsRequests from "../../services/CardsRequests"

function TaskBoard({onClickToLogout}) {
	const [isLoading, setIsLoading] = useState(true);
	const [statuses, setStatuses] = useState([]);
	const [movingTask, setMovingTask] = useState(()=>{});
	const [tasksList, setTasksList] = useState([]);

	useEffect(() => {
		async function fetchData() {
			const responseCards = await CardsRequests.loadAllCards()
			setTasksList(responseCards.reverse())
			const responseStatus = await StatusRequest.loadStatuses()
			setStatuses(responseStatus);
		}
		fetchData();
	}, []);

	useEffect(() => {
		if (statuses.length !== 0) {
			const changeTaskStatuses  = movingСard(statuses)
			setMovingTask(changeTaskStatuses)
			setIsLoading(false);
		}
	}, [statuses]);

	function toLogout() {
		UserStorage.removeUser();
		onClickToLogout(true);
	}

	function getTaskByStatus(status) {
		const taskByStatus = tasksList.filter(task=>task.status === status)
		return taskByStatus
	}

	return (
		<>
			<div className="header">
			<button className="card__button button exit__button" onClick={toLogout}>
				Exit
			</button>
			</div>
			<div className="board">
				{
				!isLoading ? statuses.map((status, index) => (
						<TaskBoardItem key={index} changeTaskStatus={movingTask}  
						tasksList={tasksList} setTasksList={setTasksList} 
						taskByStatus = {getTaskByStatus(status.value)} {...status} />
					))
				: <div> loading </div>}
			</div>
		</>
	);
	
}

export default TaskBoard;
