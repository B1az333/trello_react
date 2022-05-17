import React from "react";
import { useDispatch, useSelector } from "react-redux";

import UserStorage from '../utils/UserStorage.js';
import { movingСard } from "../utils/movingСard";

import { TaskBoardItem } from "./";
import { fetchCards } from "../redux/cardsActions";
import { fetchStatuses } from "../redux/statusesActions";

function TaskBoard({onClickToLogout}) {
	const dispatch = useDispatch();

	const {statuses, isLoadedStatuses } = useSelector(({ statusesReducer }) => statusesReducer);
	const isLoadedCards = useSelector(({ cardsReducer }) => cardsReducer.isLoadedCards)

	React.useEffect(() => {
		dispatch(fetchStatuses());
		dispatch(fetchCards());
	}, []); // eslint-disable-line

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
				isLoadedStatuses && isLoadedCards ? statuses.map((status, index) => (
						<TaskBoardItem key={index} movingTask={movingСard(statuses)} statusTitle={status.title} statusValue={status.value}/>
					))
				: <div> loading </div>}
			</div>
		</>
	);
	
}

export default TaskBoard;
