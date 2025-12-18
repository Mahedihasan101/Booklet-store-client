import React from 'react';
import Card from '../../component/card';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

const AllBooks = () => {
    const { data: books = [], isLoading, isError } = useQuery({
        queryKey: ['books'],
        queryFn: async () => {
            const result = await axios.get(
              `${import.meta.env.VITE_API_URL}/books`
            );
            return result.data;
        }
    });

    if (isLoading) return <p>Loading....</p>;
    if (isError) return <p>Error loading books</p>;

    return (
        <div>
            {books.length > 0 ? (
                <div className=" max-w-6xl mx-auto pt-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {books.map(book => (
                        <Card key={book._id} book={book} />
                    ))}
                </div>
            ) : (
                <p>No data</p>
            )}
        </div>
    );
};

export default AllBooks;
