import React from "react";
import { useDispatch } from "react-redux";
import "./style.css";

import CardsRequests from "../../services/CardsRequests"
import StatusRequest from "../../services/StatusRequest";

import UserStorage from '../../utils/UserStorage.js';
import { movingСard } from "../../utils/movingСard";

import TaskBoardItem from "../TaskBoardItem/TaskBoardItem";
import { setCards } from "../../redux/cardsActions";

function TaskBoard({onClickToLogout}) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [statuses, setStatuses] = React.useState([]); 
	const [movingTask, setMovingTask] = React.useState(()=>{});

	const dispatch = useDispatch();

	React.useEffect(() => {
		async function fetchData() {
			const responseCards = await CardsRequests.loadAllCards()
			dispatch(setCards(responseCards.reverse()));

			const responseStatus = await StatusRequest.loadStatuses()
			setStatuses(responseStatus);
		}
		fetchData();
	}, []);

	React.useEffect(() => {
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
						<TaskBoardItem key={index} movingTask={movingTask} statusTitle={status.title} statusValue={status.value}/>
					))
				: <div> loading </div>}
			</div>
		</>
	);
	
}

export default TaskBoard;
