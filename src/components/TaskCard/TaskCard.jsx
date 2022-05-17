import React from 'react';
import "./style.css";

import EditCard  from '../EditCard';
import CardsRequests from "../../services/CardsRequests";

export function TaskCard({ onRemoveCard, task, onStatusChange, movingTask }) {
	const [isEditing, setIsEditing] = React.useState(false);
	
	function onClickRemoveCard() {
		CardsRequests.deleteCard(task.id).then( el => onRemoveCard(el.id));
	}

	return (
		<div className="card">
			<button type="button" className="card__icon button card__icon-del" 
			onClick = {onClickRemoveCard}>x</button>
			{
				isEditing ? <EditCard isEditing={setIsEditing}  {...task} />
					:
					<>
						<span className="card__title">{task.title}</span>
						<p className="card__text">{task.description}</p>
						<span className="card__buttons">
							<button type="button" className="card__button button card__button-upg" 
								onClick={() => setIsEditing(true)}>
								edit
							</button>
						{
						(task.status !== 'to_do')	? 
							<button type="button" name="prev" className="card__button button card__button-prev" onClick={()=>
								{movingTask.prev(task.id,task.status)
									.then((res)=>onStatusChange(res))}}>
								prev
							</button>
							: null
						}
						{
						(task.status !== 'done')	? 
							<button type="button" name="done" className="card__button button card__button-done" onClick={()=>
							{movingTask.next(task.id,task.status)
								.then((res)=>onStatusChange(res))}}>
								done
							</button>
							: null
						}
						</span>
					</>
			}
		</div>
		);
}

export default TaskCard;