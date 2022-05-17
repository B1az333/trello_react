import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { TaskCard, CreateCard} from "./";
import { removeCard, changeTaskStatus, fetchAddCard } from '../redux/cardsActions';

function TaskBoardItem({ statusTitle, statusValue, movingTask }) {
	const dispatch = useDispatch();
	const [isOpened, setIsOpened] = React.useState(false);

	const tasks = useSelector(({ cardsReducer }) => cardsReducer.cards).filter(task => task.status === statusValue);

	function handleRemoveCard(id) {
		dispatch(removeCard(id))
	}

	function handleChangeTaskStatus(taskWithNewStatus) {
		dispatch(changeTaskStatus(taskWithNewStatus))
	}

	function handleAddCard(title, description) {
		dispatch(fetchAddCard(title, description, statusValue))
	}

	function handleOpenForm(bool){
		setIsOpened(bool);
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
						<TaskCard key={task.id} onRemoveCard = {handleRemoveCard} onStatusChange={handleChangeTaskStatus} movingTask = {movingTask} task = {task}/>)
			}
		</div>
	);
}

export default TaskBoardItem;