import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const AllUsers = () => {
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/users`);
      return res.data;
    },
  });

  const handleRoleChange = async (id, role) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}/users/role/${id}`,
      { role }
    );
    refetch();
  };

  if (isLoading) return <p className="text-center mt-10">Loading users...</p>;

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6">All Users</h2>

      <table className="table w-full">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {users.map((user) => (
            <tr key={user._id}>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td className="font-semibold">{user.role}</td>
              <td className="space-x-2">
                <button
                  disabled={user.role === "librarian"}
                  onClick={() => handleRoleChange(user._id, "librarian")}
                  className="btn btn-sm btn-warning"
                >
                  Make Librarian
                </button>

                <button
                  disabled={user.role === "admin"}
                  onClick={() => handleRoleChange(user._id, "admin")}
                  className="btn btn-sm btn-success"
                >
                  Make Admin
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
