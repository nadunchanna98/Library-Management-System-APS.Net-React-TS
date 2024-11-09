using Library_Management_System.Models;
using Library_Management_System.Repositories;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Library_Management_System.Services
{
    public class BookService : IBookService
    {
        private readonly IBookRepository _bookRepository;

        public BookService(IBookRepository bookRepository)
        {
            _bookRepository = bookRepository;
        }

        public async Task<IEnumerable<Book>> GetAllBooksAsync()
        {
            return await _bookRepository.GetAllBooksAsync();
        }

        public async Task<Book> GetBookByIdAsync(int id)
        {
            return await _bookRepository.GetBookByIdAsync(id);
        }

        public async Task<Book> AddBookAsync(Book book)
        {
            return await _bookRepository.AddBookAsync(book);
        }

        public async Task<Book> UpdateBookAsync(Book book)
        {
            return await _bookRepository.UpdateBookAsync(book);
        }

        public async Task DeleteBookAsync(int id)
        {
            await _bookRepository.DeleteBookAsync(id);
        }
    }
}
