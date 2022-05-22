import React from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { fetchModifyTask } from '../redux/cardsActions';

function EditCardForm({isEditing, id, title, description }) {
	const dispatch = useDispatch();

	const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            title : title,
			description : description
        },
    });

    const onSubmit = (data) => {
        dispatch(fetchModifyTask(id, data.title, data.description));
		isEditing(false);
    };

	return (
		<form onSubmit={handleSubmit(onSubmit)}> 
			<input {...register("title", {required: true})} className="card__title input title__input" type="text" />
			<textarea {...register("description")} className="card__text input text__input" type="text" />
				<span className="card__buttons">
					<input type="button" className="card__button button card__button-cancel" onClick={() => isEditing(false)} value="cancel" />
					<input type="submit" className="card__button button card__button-done" value="create" />
				</span>
		</form>
	)
}

export default EditCardForm;