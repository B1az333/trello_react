import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { TaskBoardItem } from "./";
import { fetchCards } from "../redux/cards/actions";
import { fetchStatuses } from "../redux/statuses/actions";
import { setUnlogined } from "../redux/login/actions";
import { selectIsLoadedCards } from "../redux/cards/selectors";
import { selectStatusesStorage } from "../redux/statuses/selectors";

function TaskBoard() {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {statuses, isLoadedStatuses } = useSelector(selectStatusesStorage);
	const isLoadedCards = useSelector(selectIsLoadedCards);

	React.useEffect(() => {
		dispatch(fetchStatuses());
		dispatch(fetchCards());
	}, []); // eslint-disable-line

	function toLogout() {
		dispatch(setUnlogined());
		navigate('login');
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
						<TaskBoardItem key={index} statusTitle={status.title} statusValue={status.value}/>
					))
				: <div> loading </div>}
			</div>
		</>
	);
	
}

export default TaskBoard;
