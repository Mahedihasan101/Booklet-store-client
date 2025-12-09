import React from "react";

const BestSellers = () => {
    const books = [
        { title: "The Great Adventure", author: "John Doe", img: "/books/book1.jpg" },
        { title: "Mystery of the Night", author: "Jane Smith", img: "/books/book2.jpg" },
        { title: "Learning React", author: "Chris Johnson", img: "/books/book3.jpg" },
        { title: "The Art of Coding", author: "Alex Brown", img: "/books/book4.jpg" },
    ];

    return (
        <section className="bg-gray-100 py-16 px-6 md:px-16">
            <div className="max-w-6xl mx-auto text-center mb-12">
                <h2 className="text-4xl font-bold mb-4">Best Sellers</h2>
                <p className="text-gray-600 text-lg">Our top-selling books that readers can't get enough of.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
                {books.map((book, idx) => (
                    <div key={idx} className="bg-white rounded-2xl shadow hover:shadow-lg overflow-hidden transition-shadow duration-300">
                        <img src={book.img} alt={book.title} className="w-full h-64 object-cover" />
                        <div className="p-4">
                            <h3 className="font-semibold text-lg">{book.title}</h3>
                            <p className="text-gray-500 text-sm">{book.author}</p>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default BestSellers;
