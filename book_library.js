document.addEventListener('DOMContentLoaded', function() {
    
const myLibrary = [];


function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read
    this.info = function(){
        return `The ${this.title} by ${this.author}, ${this.pages} pages`;
    }
}

Book.prototype.toggleReadStatus = function(){
    this.read = !this.read;
}


const book1 = new Book('Among us', 'Me', 200, 'read');
const book2 = new Book('Almanaque', 'You', 300, 'not read');
const book3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 180, 'not read');
const book4 = new Book('To Kill a Mockingbird', 'Harper Lee', 281,'read');
const book5 = new Book('Harry Potter and the Sorcerer\'s Stone', 'J.K. Rowling', 320, 'read');
const book6 = new Book('The Lord of the Rings', 'J.R.R. Tolkien', 1000, 'not read');



function addBookToLibrary(book) {
    myLibrary.push(book);
  }

addBookToLibrary(book1);
addBookToLibrary(book2);
addBookToLibrary(book3);
addBookToLibrary(book4);
addBookToLibrary(book5);
addBookToLibrary(book6);

function displayAllBooks(){
    const displayBooks = document.getElementById('addBook');
    // Clear the existing display of books
    displayBooks.innerHTML = '';

    // Render each book in the library
    myLibrary.forEach(book => {
        // Create card elements for each book
        const cards = document.createElement('div');
        cards.className = 'card';
        cards.style = "width: 18rem;";
        
        const cardBody = document.createElement('div');
        cardBody.className = 'card-body';

        const bookTitle = document.createElement('h5');
        bookTitle.className = 'card-title';
        bookTitle.textContent = book.title;

        const bookAuthor = document.createElement('h6');
        bookAuthor.className = 'card-subtitle mb-2 text-body-secondary';
        bookAuthor.textContent = book.author;

        const bookInfo = document.createElement('p');
        bookInfo.className = 'card-text';
        bookInfo.textContent = `${book.info()}, ${book.read ? 'was read.' : 'was not read.'}`;

        const btnRmLibrary = document.createElement('button');
        btnRmLibrary.className = 'btn btn-danger'
        btnRmLibrary.textContent = 'Remove From Library';
        btnRmLibrary.addEventListener('click', function() {
            removeFromLibrary(book);
        });

        const btnReadToggle = document.createElement('button');
        btnReadToggle.textContent = 'Change Read Status';
        btnReadToggle.className = 'btn btn-light';
        btnReadToggle.addEventListener('click', function() {
            const status = book.toggleReadStatus();
            bookInfo.textContent = `${book.info()}, ${status}`; 
            displayAllBooks(); 
        });

        cardBody.append(bookTitle, bookAuthor, bookInfo, btnRmLibrary, btnReadToggle);
        cards.appendChild(cardBody);
        displayBooks.appendChild(cards);
    });
}

displayAllBooks();

function displayNewBook(book) {
    const displayBooks = document.getElementById('addBook');

    // create card
    const card = document.createElement('div');
    card.className = 'card';
    card.style = "width: 18rem;";

    displayBooks.appendChild(card);

    // create card body
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    card.appendChild(cardBody);

    // create children
    const bookTitle = document.createElement('h5');
    bookTitle.className = 'card-title';
    bookTitle.textContent = book.title;
    const bookAuthor = document.createElement('h6');
    bookAuthor.className = 'card-subtitle mb-2 text-body-secondary';
    bookAuthor.textContent = book.author;
    const bookInfo = document.createElement('p');
    bookInfo.className = 'card-text';
    bookInfo.textContent = `${book.info()}, ${book.read ? 'was read.' : 'was not read.'}`;

    const btnRmLibrary = document.createElement('button');
    btnRmLibrary.className = 'btn btn-danger'
    btnRmLibrary.textContent = 'Remove From Library';
    btnRmLibrary.addEventListener('click', function() {
        removeFromLibrary(book);
    });

    const btnReadToggle = document.createElement('button');
    btnReadToggle.className = 'btn btn-light'
    btnReadToggle.textContent = 'Change  Status';
    btnReadToggle.addEventListener('click', function() {
        const status = book.toggleReadStatus();
        bookInfo.textContent = `${book.info()}, ${status}`; 
        displayAllBooks(); 
    });
    cardBody.append(bookTitle, bookAuthor, bookInfo, btnRmLibrary, btnReadToggle);

}
// Function n to add button to form that removes the book from library

function removeFromLibrary(book){
       // Find the index of the book in the library
       const index = myLibrary.indexOf(book);
       if (index !== -1) {
           myLibrary.splice(index, 1);
           displayAllBooks();
       }
   }

function handleFormSubmission(event) {
    event.preventDefault(); // Prevent default form submission behavior
    // Retrieve form input values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = parseInt(document.getElementById('pages').value);
    const read = document.getElementById('read').value === 'true';

    // Create new Book object
    const newBook = new Book(title, author, pages, read);
    // Add the new book to the library
    addBookToLibrary(newBook);
    // Update the display with the new book
    displayNewBook(newBook);
    // Clear the form fields
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('pages').value = '';
    document.getElementById('read').value = 'true';
    // Close the form
    document.getElementById('book-form').style.display = 'none';
};


// Function to open the form
document.getElementById('open-form').addEventListener('click', function() {
    document.getElementById('book-form').style.display = 'block';
});
// Function to close the form
document.getElementById('close-form').addEventListener('click', function() {
    document.getElementById('book-form').style.display = 'none';
});

document.getElementById('submit-book').addEventListener('click', handleFormSubmission);  



});




