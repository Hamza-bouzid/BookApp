class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class UI {
  addBookToList(book) {
    const list = document.querySelector('.content_lista-libri');

    // Random  Background color
    const colors = ['bgcolor1', 'bgcolor2', 'bgcolor3', 'bgcolor4', 'bgcolor5', 'bgcolor6', 'bgcolor7', 'bgcolor8', 'bgcolor9', 'bgcolor10', 'bgcolor11']
    const random_color = colors[Math.floor(
      Math.random() * colors.length)];

    // Creare lista
    const li = document.createElement('li');

    li.innerHTML = `
    <button class="delete">X</button>
    <h3 class="${random_color}">${book.title}</h3>
    <p class="${random_color}">${book.author}</p>
`;

    list.appendChild(li);

  }

  showAlert(msg, className) {
    // Cerare div
    const div = document.createElement('div');
    // Aggiungere classe
    div.className = `alert ${className}`;
    // Aggiungere testo
    div.appendChild(document.createTextNode(msg));
    // Ottieni genitore
    const container = document.querySelector('.container');
    const header = document.querySelector('.header');
    // Inserire alert
    container.insertBefore(div, header);

    // Timeout dopo 3s
    setTimeout(function () {
      document.querySelector('.alert').remove();
    }, 3000)
  }

  deleteBook(target) {
    if (target.className === 'delete') {
      target.parentElement.remove();
    }
  }

  clearFields() {
    document.querySelector('#book-name').value = '';
    document.querySelector('#author-name').value = '';
  }
}

// Local Storage Class
class Store {
  static getBooks() {
    let books;
    if (localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static displayBooks() {
    const books = Store.getBooks();

    books.forEach(function (book) {
      const ui = new UI;

      // Aggiungere book UI
      ui.addBookToList(book);
    });
  }

  static addBook(book) {
    const books = Store.getBooks();

    books.push(book);

    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(title) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if (book.title === title) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// Dom Load Event
document.addEventListener('DOMContentLoaded', Store.displayBooks);

// Event Listeners Aggiungere Book
document.querySelector('.form').addEventListener('submit', function (e) {

  // Ottieni valore dalla form
  const title = document.querySelector('#book-name').value;
  const author = document.querySelector('#author-name').value;

  //book
  const book = new Book(title, author);

  //UI
  const ui = new UI();

  // Validazioni 
  if (title === '' || author === '') {
    // Error alert
    ui.showAlert('Compila tutti i campi', 'error');
  } else {
    // Aggiungere book alla lista
    ui.addBookToList(book);

    // AddBook Local Storage
    Store.addBook(book);

    // mostra Success
    ui.showAlert(`${title} e stato aggiunto alla lista`, 'success');

    // Pulisci campi
    ui.clearFields()
  }

  e.preventDefault();
});

// Event Listener Delete
document.querySelector('.content_lista-libri').addEventListener('click', function (e) {

  //Istantiate UI
  const ui = new UI();

  // Elimina Book
  ui.deleteBook(e.target);

  // Elimina dal LS
  Store.removeBook(e.target.nextElementSibling.textContent);

  // Mostra Alert
  ui.showAlert('Libro Eliminato', 'success');

  e.preventDefault();
});