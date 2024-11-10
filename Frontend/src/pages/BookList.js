import React, { useState, useEffect } from 'react';
import '../pages/BookList.css';
import { useAuth } from '../context/AuthContext';
import api from '../axiosConfig';
import { Link } from 'react-router-dom';

const BookList = () => {
    const { books,fetchBookData } = useAuth();
    const [books1, setBooks] = useState([]);
    const [showFullDescription, setShowFullDescription] = useState({});

    useEffect(() => {
        fetchBookData();
        const sortedBooks = books.sort((a, b) => a.title.localeCompare(b.title));
        setBooks(sortedBooks);
    }, [books]);

    const editBookDetail = async (id) => {
        try {
            const response = await api.update(`/${id}`);
        } catch (error) {
            console.error('Error editing book details:', error);
            throw error;
        }
    };

    const deleteBookDetail = async (id) => {
        try {
            const response = await api.delete(`/${id}`);
            console.log("response:", response.data);
            setBooks(books1.filter(book => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error);
            throw error;
        }
    };

    const toggleDescription = (id) => {
        setShowFullDescription((prev) => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleEdit = (id) => {
        editBookDetail(id);
    };

    const handleDelete = (id) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this book?");
        if (confirmDelete) {
            deleteBookDetail(id);
        }
    };

    return (
        <div className="table-container">
            <table className="books-table">
                <thead>
                    <tr>
                        <th>No</th>
                        <th>Book Name</th>
                        <th>Author</th>
                        <th>Description</th>
                        <th>Edit</th>
                        <th>Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {books1.map((book, index) => (
                        <tr key={book.id}>
                            <td>{index + 1}</td>
                            <td>{book.title}</td>
                            <td>{book.author}</td>
                            <td>
                                {showFullDescription[book.id]
                                    ? book.description
                                    : `${book.description.slice(0, 50)}...`}
                                <div>
                                    <button onClick={() => toggleDescription(book.id)} className="more-button">
                                        {showFullDescription[book.id] ? "Less" : "More"}
                                    </button>
                                </div>
                            </td>
                            <td>
                                <Link to={`/edit_book/${book.id}`} className="edit-button">Edit</Link>
                            </td>
                            <td>
                                <button onClick={() => handleDelete(book.id)} className="delete-button">Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default BookList;
