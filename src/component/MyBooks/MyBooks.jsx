import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Link } from "react-router";

const MyBooks = () => {
  // Fetch all books added by the librarian
  const { data: books = [], isLoading, refetch } = useQuery({
    queryKey: ["myBooks"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
      return res.data;
    },
  });

  const handleTogglePublish = async (bookId, published) => {
    try {
      await axios.patch(
        `${import.meta.env.VITE_API_URL}/books/publish/${bookId}`,
        { published: !published }
      );
      refetch(); // refresh table
    } catch (err) {
      console.error("Failed to update publish status", err);
      alert("Could not update book status");
    }
  };

  if (isLoading) return <p className="text-center mt-10">Loading books...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">My Books</h2>

      {books.length === 0 ? (
        <p className="text-gray-600">No books added yet.</p>
      ) : (
        <table className="table w-full text-black">
          <thead>
            <tr>
              <th>Book Image</th>
              <th>Book Name</th>
              <th>Published</th>
              <th>Edit</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>
                  <img
                    src={book.image}
                    alt={book.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                </td>
                <td>{book.name}</td>
                <td>
                  <button
                    onClick={() => handleTogglePublish(book._id, book.published)}
                    className={`btn btn-sm ${
                      book.published ? "btn-success" : "btn-warning"
                    }`}
                  >
                    {book.published ? "Published" : "Unpublished"}
                  </button>
                </td>
                <td>
                  <Link to={`/edit-book/${book._id}`}>
                    <button className="btn btn-sm btn-info">Edit</button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MyBooks;
