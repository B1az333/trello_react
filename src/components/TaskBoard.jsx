import React from "react";
import { useDispatch } from "react-redux";

import { CardsRequests, StatusRequest} from "../services";
import UserStorage from '../utils/UserStorage.js';
import { movingСard } from "../utils/movingСard";

import { TaskBoardItem } from "./";
import { setCards } from "../redux/cardsActions";

function TaskBoard({onClickToLogout}) {
	const [isLoading, setIsLoading] = React.useState(true);
	const [statuses, setStatuses] = React.useState([]); 

	const dispatch = useDispatch();

	React.useEffect(() => {
		async function fetchData() {
			const responseCards = await CardsRequests.loadAllCards()
			dispatch(setCards(responseCards.reverse()));

			const responseStatus = await StatusRequest.loadStatuses()
			setStatuses(responseStatus);
		}
		fetchData();
	}, []); // eslint-disable-line

	React.useEffect(() => {
		if (statuses.length !== 0) {
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
						<TaskBoardItem key={index} movingTask={movingСard(statuses)} statusTitle={status.title} statusValue={status.value}/>
					))
				: <div> loading </div>}
			</div>
		</>
	);
	
}

export default TaskBoard;
