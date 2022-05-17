import React from 'react';

function CreateCard({ onChange, onAddCard }) {
    const [submit, setSubmit] = React.useState(false);
    const [data, setData] = React.useState({
        title: '',
        description: '',
    });

    function handleOpenForm(bool) {
        setData({
            ...data,
            title: '',
            description: '',
        });

        onChange(bool);
    }

    function updField(e) {
        setData({
            ...data,
            [e.target.name]: e.target.value,
        });
    }

    function onSubmit(event) {
        event.preventDefault();
        onAddCard(data.title, data.description);

        setSubmit(false);
        handleOpenForm(false);
    }

    return (
        <form className="card card-create" onSubmit={onSubmit}>
            <span className="card__title-large">Add note</span>

            <label className="card__label">title</label>
            <input
                name="title"
                className="card__input input-title"
                type="text"
                onChange={updField}
            />

            <label className="card__label">description</label>
            <textarea
                name="description"
                className="card__input input-description"
                type="text"
                onChange={updField}
            />

            <span className="card__buttons">
                <button
                    type="button"
                    className="card__button button card__button-cancel"
                    onClick={() => handleOpenForm(false)}>
                    cancel
                </button>
                <button
                    type="submit"
                    className="card__button button card__button-done"
                    disabled={submit ? true : false}>
                    create
                </button>
            </span>
        </form>
    );
}

export default CreateCard;
