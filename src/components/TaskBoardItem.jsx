import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TaskCard, CreateCard} from "./";
import { fetchAddCard, fetchMoveCardRight, fetchMoveCardLeft, fetchRemoveCard } from '../redux/cardsActions';

function TaskBoardItem({ statusTitle, statusValue }) {
	const dispatch = useDispatch();
	const [isOpened, setIsOpened] = React.useState(false);

	const tasks = useSelector(({ cardsReducer }) => cardsReducer.cards).filter(task => task.status === statusValue);
	const statusTypes = useSelector(({ statusesReducer }) => statusesReducer.statuses).map(status => status.value);

	function handleRemoveCard(id) {
		dispatch(fetchRemoveCard(id));
		console.log(1);
	}

	function handleAddCard(title, description) {
		dispatch(fetchAddCard(title, description, statusValue))
	}

	function handleOpenForm(bool){
		setIsOpened(bool);
	}

	function handleMoveCardRight(card){
		dispatch(fetchMoveCardRight(card, statusTypes));
	}

	function handleMoveCardLeft(card){
		dispatch(fetchMoveCardLeft(card, statusTypes));
	}

	return (
		<div className={`task-board__item item-${statusValue}`}>
			{
				isOpened ? <CreateCard onChange={handleOpenForm} onAddCard={handleAddCard}/> : null
			}
			<div className={`status status-${statusValue}`}>
				<span className="item__text">
					{statusTitle + ' '}
					<span className="item__count">
						{tasks.length}
					</span>
				</span>
				<button type="button" className="status__button status__button-add" onClick = {() => handleOpenForm(true)}>+</button>
			</div>
			{
				tasks.map((task) => 
						<TaskCard key={task.id} onRemoveCard = {() => handleRemoveCard(task.id)} task = {task} onMoveCardRight={() => handleMoveCardRight(task)} onMoveCardLeft={() => handleMoveCardLeft(task)}/>)
			}
		</div>
	);
}

export default TaskBoardItem;