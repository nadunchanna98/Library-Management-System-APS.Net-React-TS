import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useAuth } from '../context/AuthContext';
import * as Yup from 'yup';
import '../pages/AddnewBook.css';
import api from '../axiosConfig';
import { useNavigate } from 'react-router-dom';

const EditBook = () => {

    const navigate = useNavigate();
    const { books } = useAuth();
    const { id } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        const fetchBookDetails = () => {
            const foundBook = books.find((book) => book.id === parseInt(id));
            setBook(foundBook);
        };

        fetchBookDetails();
    }, [id]);

    const validationSchema = Yup.object({
        book_name: Yup.string().max(200, 'Max 200 characters').required('Book name is required'),
        author: Yup.string().max(200, 'Max 200 characters').required('author name is required'),
        description: Yup.string().max(5000, 'Max 5000 characters').required('Description is required'),
    });

    const submitFormData = async (values) => {

        console.log(values)
        try {
            const response = await api.put(`/${id}`, {
                id: id,
                title: values.book_name,
                author: values.author,
                description: values.description,
            });

            alert('Book Updated successfully!');
            navigate('/book_list');

        } catch (error) {
            console.error('Error submitting form data:', error.response?.data || error.message);
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
