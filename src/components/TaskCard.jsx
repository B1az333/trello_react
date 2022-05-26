import React from 'react';

import { EditCardForm } from './';

function TaskCard({ task, onRemoveCard, onMoveCardRight, onMoveCardLeft }) {
    const [isEditing, setIsEditing] = React.useState(false);

    return (
        <div className="card">
            <button
                type="button"
                className="card__icon button card__icon-del"
                onClick={() => onRemoveCard(task.id)}>
                x
            </button>
            {isEditing ? (
                <EditCardForm isEditing={setIsEditing} {...task} />
            ) : (
                <>
                    <span className="card__title">{task.title}</span>
                    <p className="card__text">{task.description}</p>
                    <span className="card__buttons">
                        <button
                            type="button"
                            className="card__button button card__button-upg"
                            onClick={() => setIsEditing(true)}>
                            edit
                        </button>
                        {task.status !== 'to_do' ? (
                            <button
                                type="button"
                                name="prev"
                                className="card__button button card__button-prev"
                                onClick={() => onMoveCardLeft(task)}>
                                prev
                            </button>
                        ) : null}
                        {task.status !== 'done' ? (
                            <button
                                type="button"
                                name="done"
                                className="card__button button card__button-done"
                                onClick={() => onMoveCardRight(task)}>
                                done
                            </button>
                        ) : null}
                    </span>
                </>
            )}
        </div>
    );
}

export default React.memo(TaskCard);
