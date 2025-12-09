import { useEffect, useState } from "react";

const LatestBooks = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then((res) => res.json())
            .then((data) => setBooks(data))
            .catch((err) => console.error("Error loading books:", err));
    }, []);
    return (
        <div className="max-w-6xl mx-auto mt-16 px-4">
            <h2 className="text-2xl md:text-3xl font-bold mb-6">
                Latest Books 📚
            </h2>

            {books.length === 0 ? (
                <p>Loading latest books...</p>
            ) : (
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {books.map((book) => (
                        <div
                            key={book.id}
                            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition"
                        >
                            <img
                                src={book.cover}
                                alt={book.title}
                                className="w-full h-48 object-cover"
                            />

                            <div className="p-4">
                                <h3 className="font-bold text-lg">{book.title}</h3>
                                <p className="text-sm text-gray-600 mb-2">by {book.author}</p>

                                <p className="text-sm text-gray-700 line-clamp-2">
                                    {book.description}
                                </p>

                                <a
                                    href={`/books/${book.id}`}
                                    className="block text-center bg-green-600 text-white mt-4 py-2 rounded-md hover:bg-green-700"
                                >
                                    View Book
                                </a>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default LatestBooks;