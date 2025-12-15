import React from 'react';

const Card = ({book}) => {
    console.log(book)
    return (
        <div className="card bg-base-100  shadow-sm">
            <figure>
                <img
                    src="https://img.daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.webp"
                    alt="Shoes" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{book.name}</h2>
                <p>{book.author}</p>
                <span>{book.price}</span>
                <div className="card-actions justify-end">
                    <button className="btn btn-primary"> book details</button>
                </div>
            </div>
        </div>
    );
};

export default Card;