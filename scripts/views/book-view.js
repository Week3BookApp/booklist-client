'use strict';
var app = app || {};
(module => {
  var bookview = {};

  bookView.create = () => {
    var book;
    $('.my-books').empty();

    book = new Book({
      title: $('#book-title').val(),
      author: $('#book-author').val(),
      isbn: $('#book-isbn').val(),
      image_url: $('#book-image').val(),
      description: $('#book-desription').val(),
    });

    $('.my-books').append(Book.toHtml());
    // $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  bookView.initIndexPage = () => {
    app.Books.all.forEach(a => $('.).append(a.toHtml());
    // $('pre code').each((i, block) => hljs.highlightBlock(block));
  };

  module.articleView = articleView;
})(app);

'use strict';
var app = app || {};

(function(module) {
  function Book(rawDataObj) {
    Object.keys(rawDataObj).forEach(key => this[key] = rawDataObj[key]);
  }

  Books.all = [];

  Book.prototype.toHtml = function() {
    var template = Handlebars.compile($('#book-template').text());
    return template(this);
  };

  Book.loadAll = bookData => Book.all = bookData.map(ele => new Book(ele));

  Book.fetchAll = callback => {
    $.get('/books')
      .then(
        results => {
          Book.loadAll(results);
          callback();
        })
  };

  Book.allAuthors = () => {
    return Book.all.map(book => book.author)
      .reduce((names, name) => {
        if (names.indexOf(name) === -1) names.push(name);
        return names;
      }, []);
  };

  Book.truncateTable = callback => {
    $.ajax({
      url: '/books',
      method: 'DELETE',
    })
      .then(callback);
  };

  Book.prototype.insertRecord = function(callback) {
    $.post('/books', {title: this.title, author: this.author, isbn: this.isbn, image_url: this.image_url, description: this.describtion })
      .then(callback);
  };

  Book.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/books/${this.book_id}`,
      method: 'DELETE'
    })
      .then(callback);
  };

  Book.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/books/${this.book_id}`,
      method: 'PUT',
      data: {
        title: this.title, 
        author: this.author, 
        isbn: this.isbn, 
        image_url: this.image_url, 
        description: this.describtion
      }
    })
      .then(callback);
  };

  module.Book = Book;
})(app);