import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const ManageBooks = () => {
  const { data: books = [], refetch, isLoading } = useQuery({
    queryKey: ["admin-books"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/books`);
      return res.data;
    },
  });

  const togglePublish = async (id, published) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/books/publish/${id}`,
      { published: !published }
    );
    refetch();
  };

  const handleDelete = async (id) => {
    const confirmDelete = confirm(
      "This will delete the book AND all related orders. Continue?"
    );
    if (!confirmDelete) return;

    await axios.delete(
      `${import.meta.env.VITE_API_URL}/admin/books/${id}`
    );
    refetch();
  };

  if (isLoading) return <p>Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">Manage Books (Admin)</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Author</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {books.map(book => (
            <tr key={book._id}>
              <td>
                <img
                  src={book.image}
                  className="w-16 h-16 rounded"
                />
              </td>
              <td>{book.name}</td>
              <td>{book.author}</td>
              <td>
                <span className={book.published ? "text-green-500" : "text-red-500"}>
                  {book.published ? "Published" : "Unpublished"}
                </span>
              </td>
              <td className="space-x-2">
                <button
                  onClick={() => togglePublish(book._id, book.published)}
                  className="btn btn-sm btn-warning"
                >
                  {book.published ? "Unpublish" : "Publish"}
                </button>

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

export default ManageBooks;
