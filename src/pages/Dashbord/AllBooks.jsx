import React, { useState, useMemo } from 'react';
import Card from '../../component/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AllBooks = () => {
  const [search, setSearch] = useState('');
  const [sort, setSort] = useState('');

  const { data: books = [], isLoading, isError } = useQuery({
    queryKey: ['books'],
    queryFn: async () => {
      const result = await axios.get(
        `${import.meta.env.VITE_API_URL}/books`
      );
      return result.data;
    },
  });

  // 🔍 Search + 🔃 Sort logic
  const filteredBooks = useMemo(() => {
    let filtered = books.filter(book =>
      book.name.toLowerCase().includes(search.toLowerCase())
    );

    if (sort === 'low-high') {
      filtered.sort((a, b) => a.price - b.price);
    }

    if (sort === 'high-low') {
      filtered.sort((a, b) => b.price - a.price);
    }

    return filtered;
  }, [books, search, sort]);

  if (isLoading) return <p className="text-center mt-10">Loading...</p>;
  if (isError) return <p className="text-center mt-10">Error loading books</p>;

  return (
    <div className="max-w-6xl mx-auto pt-8 px-4">
      {/* 🔍 Search & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-8">
        <input
          type="text"
          placeholder="Search by book name..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full md:w-1/2"
        />

        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className="select select-bordered w-full md:w-1/4"
        >
          <option value="">Sort by price</option>
          <option value="low-high">Low → High</option>
          <option value="high-low">High → Low</option>
        </select>
      </div>

      {/* 📚 Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredBooks.map(book => (
            <Card key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No books found</p>
      )}
    </div>
  );
};

export default AllBooks;
