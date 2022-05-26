import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TaskCard, CreateCardForm} from "./";
import { fetchAddCard, fetchMoveCardRight, fetchMoveCardLeft, fetchRemoveCard } from '../redux/cards/actions';
import { selectCards } from '../redux/cards/selectors';
import { selectStatuses } from '../redux/statuses/selectors';

function TaskBoardItem({ statusTitle, statusValue }) {
	const dispatch = useDispatch();

	const [isOpened, setIsOpened] = React.useState(false);

	const tasks = useSelector(selectCards).filter(task => task.status === statusValue);
	const statusTypes = useSelector(selectStatuses).map(status => status.value);

	function handleAddCard(title, description) {
		dispatch(fetchAddCard(title, description, statusValue))
	}

	function handleOpenForm(bool){
		setIsOpened(bool);
	}

	const handleRemoveCard = React.useCallback((id) => {
		dispatch(fetchRemoveCard(id));
	}, [dispatch]);

	const handleMoveCardRight = React.useCallback((card) => {
		dispatch(fetchMoveCardRight(card, statusTypes));
	}, []); // eslint-disable-line

	const handleMoveCardLeft = React.useCallback((card) => {
		dispatch(fetchMoveCardLeft(card, statusTypes));
	}, []); // eslint-disable-line

	return (
		<div className={`task-board__item item-${statusValue}`}>
			{
				isOpened ? <CreateCardForm onCloseForm={() => handleOpenForm(false)} onAddCard={handleAddCard}/> : null
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
						<TaskCard key={task.id} onRemoveCard = {handleRemoveCard} task = {task} onMoveCardRight={handleMoveCardRight} onMoveCardLeft={handleMoveCardLeft}/>)
			}
		</div>
	);
}

export default TaskBoardItem;