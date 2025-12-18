import React from 'react';
import { Link } from 'react-router';

const Card = ({ book }) => {
    return (
        <div className="card bg-base-100 shadow-sm">
            <figure className="h-56 overflow-hidden">
                <img
                    src={book?.image}
                    alt={book?.name}
                    className="h-full w-full object-cover"
                />
            </figure>

            <div className="card-body">
                <h2 className="card-title">{book.name}</h2>
                <p>{book.author}</p>
                <span>৳ {book.price}</span>
                <div className="card-actions justify-end">
                    <Link to={`/books/${book._id}`}>
                    <button  className="btn btn-primary">
                        Book Details
                    </button></Link>
                </div>
            </div>
        </div>
    );
};

export default Card;
