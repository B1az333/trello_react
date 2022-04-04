import React, { useState } from 'react'
import  EditCard  from '../EditCard';
import "./style.css";
import CardsRequests from "../../services/CardsRequests"

export function TaskCard({ handleDelForm, task, isTaskChanged, changeTaskStatus, handleStatusChanged}) {
	const [isEditing, setIsEditing] = useState(false);
	function handleClickDel(){
		CardsRequests.deleteCard(task.id)
			.then((el)=>handleDelForm(el.id));
		setIsEditing(false)
	}

	return (
		<div className="card">
			<button type="button" className="card__icon button card__icon-del" 
			onClick = {handleClickDel}>x</button>
			{
				isEditing ? <EditCard isEditing={setIsEditing} isTaskChanged={isTaskChanged}  {...task} />
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
								{changeTaskStatus.prev(task.id,task.status)
									.then((res)=>handleStatusChanged(res))}}>
								prev
							</button>
							: null
						}
						{
						(task.status !== 'done')	? 
							<button type="button" name="done" className="card__button button card__button-done" onClick={()=>
							{changeTaskStatus.next(task.id,task.status)
								.then((res)=>handleStatusChanged(res))}}>
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