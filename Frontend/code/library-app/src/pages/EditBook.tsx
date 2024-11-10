import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';
import '../pages/AddnewBook.css';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

interface Book {
    id: number;
    title: string;
    author: string;
    description: string;
}

interface FormValues {
    book_name: string;
    author: string;
    description: string;
}

const EditBook: React.FC = () => {
    const navigate = useNavigate();
    const { books } = useAuth();
    const { id } = useParams<{ id: string }>(); 
    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        const fetchBookDetails = () => {
            const foundBook = books.find((book) => book.id === (id ? parseInt(id) : NaN));
            setBook(foundBook || null); 
        };

        fetchBookDetails();
    }, [id, books]);

    const validationSchema = Yup.object({
        book_name: Yup.string().max(200, 'Max 200 characters').required('Book name is required'),
        author: Yup.string().max(200, 'Max 200 characters').required('Author name is required'),
        description: Yup.string().max(5000, 'Max 5000 characters').required('Description is required'),
    });

    const submitFormData = async (values: FormValues) => {
        try {
            await api.put(`/${id}`, {
                id: id,
                title: values.book_name,
                author: values.author,
                description: values.description,
            });

            alert('Book Updated successfully!');
            navigate('/book_list');
        } catch (error) {
            console.error('Error submitting form data:');
            alert('Error submitting form data.');
        }
    };

    if (!book) {
        return <div>Loading...</div>;
    }

    return (
        <div className="add-book-container">
            <Formik
                initialValues={{
                    book_name: book.title,
                    author: book.author,
                    description: book.description,
                }}
                validationSchema={validationSchema}
                onSubmit={(values) => submitFormData(values)}
            >
                {() => (
                    <Form className="add-book-form">
                        <div className="shine add-book-header"><p>Edit Book</p></div>

                        <div className="row-field">
                            <label className="add-book-label">Book Title</label>
                            <div className="row-input">
                                <Field name="book_name" className="add-book-field" />
                                <ErrorMessage name="book_name" component="div" className="add-book-error" />
                            </div>
                        </div>

                        <div className="row-field">
                            <label className="add-book-label">Book Author</label>
                            <div className="row-input">
                                <Field name="author" className="add-book-field" />
                                <ErrorMessage name="author" component="div" className="add-book-error" />
                            </div>
                        </div>

                        <div className="row-field">
                            <label className="add-book-label">Description</label>
                            <div className="row-input">
                                <Field as="textarea" name="description" className="add-book-textarea" />
                                <ErrorMessage name="description" component="div" className="add-book-error" />
                            </div>
                        </div>

                        <div className="add-new-btn">
                            <button type="submit" className="add-book-submit-button">Update</button>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    );
};

export default EditBook;
