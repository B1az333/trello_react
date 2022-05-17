import React from 'react';
import { useDispatch } from 'react-redux';

import { fetchModifyTask } from '../redux/cardsActions';

function EditCard({isEditing, id, title, description }) {
	const dispatch = useDispatch();

	const [submit,setSubmit] = React.useState(false)
	const [editedData,setEditedData] = React.useState({
		title : title,
		description : description
	})

	function updField(e){
		setEditedData({
			...editedData,
			[e.target.name]: e.target.value
		})
	}

	function onSubmit(event){
		event.preventDefault();
		setSubmit(true);
		dispatch(fetchModifyTask(id, editedData.title, editedData.description));
		isEditing(false);
	}

	return (
		<form onSubmit={onSubmit}> 
			<input className="card__title input title__input" name="title" type="text" defaultValue={title} onChange={updField} />
			<textarea className="card__text input text__input" name="description" type="text" defaultValue={description} onChange={updField}/> 
				<span className="card__buttons">
					<button type="button" className="card__button button card__button-cancel" onClick={() => isEditing(false)}>cancel</button>
					<button type="submit" className="card__button button card__button-done" disabled={submit ? true:false} >edit</button>
				</span>
		</form>
	)
}

export default EditCard;