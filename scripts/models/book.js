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