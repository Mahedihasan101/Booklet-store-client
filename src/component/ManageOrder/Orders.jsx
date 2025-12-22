import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const Orders = () => {
  const { data: books = [], refetch } = useQuery({
    queryKey: ['all-books'],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
      return res.data;
    },
  });

  // Publish book
  const handlePublish = async (id) => {
    await axios.patch(`${import.meta.env.VITE_API_URL}/books/publish/${id}`);
    refetch();
  };

  // Unpublish book
  const handleUnpublish = async (id) => {
    await axios.patch(`${import.meta.env.VITE_API_URL}/books/unpublish/${id}`);
    refetch();
  };

  // Delete book + related orders
  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      'This book and ALL related orders will be deleted. Are you sure?'
    );
    if (!confirmDelete) return;

    await axios.delete(`${import.meta.env.VITE_API_URL}/books/${id}`);
    refetch();
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Books</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Book Name</th>
            <th>Price</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.name}</td>
              <td>${book.price}</td>
              <td>
                {book.isPublished ? (
                  <span className="text-green-600 font-semibold">Published</span>
                ) : (
                  <span className="text-red-600 font-semibold">Unpublished</span>
                )}
              </td>
              <td className="space-x-2">
                {book.isPublished ? (
                  <button
                    onClick={() => handleUnpublish(book._id)}
                    className="btn btn-sm btn-warning"
                  >
                    Unpublish
                  </button>
                ) : (
                  <button
                    onClick={() => handlePublish(book._id)}
                    className="btn btn-sm btn-success"
                  >
                    Publish
                  </button>
                )}

                <button
                  onClick={() => handleDelete(book._id)}
                  className="btn btn-sm btn-error"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
