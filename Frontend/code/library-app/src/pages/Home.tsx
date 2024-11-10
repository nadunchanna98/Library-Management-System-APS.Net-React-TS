import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import '../pages/Home.css';
import Slider from 'react-slick';

interface Book {
  id: number;
  title: string;
  author: string;
  description: string;
}

const Home: React.FC = () => {
  const { books } = useAuth();

  useEffect(() => {
    console.log(books)
  }, [books]);

  const settings = {
    centerMode: true,
    centerPadding: '60px',
    slidesToShow: 2,
    autoplay: true,
    autoplaySpeed: 2000,
    dots: true,
    pauseOnHover: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 600, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div>
      <section className="header-section">
        <div className="header-content">
          <div>
            <h1 className="header-title">Discover Your Next Adventure at Book World</h1>
            <p className="header-subtitle">Where every book has a story to tell.</p>
          </div>

          <div className="explore-button-container">
            <Link to="/book_list" className="explore-button shine_btn">
              Explore More
            </Link>
          </div>
        </div>
      </section>

      <section className="carousel-section">
        <h2 className="shine sub-topic">Just In: New Titles to Explore</h2>
        <div className="carousel-container">
          <Slider {...settings}>
            {books.map((book: Book) => (
              <div key={book.id}>
                <div className="carousel-card-detail">
                  <h3 className="book-title">{book.title}</h3>
                  <p className="book-author">by {book.author}</p>
                  <p className="book-description">{book.description}</p>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>
    </div>
  );
};

export default Home;
