import React from 'react';
import { useForm } from 'react-hook-form';

function CreateCardForm({ onCloseForm, onAddCard }) {
    const {
        register,
        handleSubmit,
    } = useForm({
        defaultValues: {
            title: '',
            description: '',
        },
    });

    const onSubmit = (data) => {
        onAddCard(data.title, data.description);
        onCloseForm();
    };

    return (
        <form className="card card-create" onSubmit={handleSubmit(onSubmit)}>
            <span className="card__title-large">Add note</span>

            <label className="card__label">title</label>
            <input {...register("title", {required: true})} className="card__input input-title" type="text" />

            <label className="card__label">description</label>
            <textarea {...register("description")} className="card__input input-description" type="text" />

            <span className="card__buttons">
                <input type="button" className="card__button button card__button-cancel" onClick={onCloseForm} value="cancel" />
                <input type="submit"  className="card__button button card__button-done" value="create" />
            </span>
        </form>
    );
}

export default CreateCardForm;
