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
      .then(console.log) // REVIEW: Check out this clean syntax for just passing 'assumend' data into a named function!
    // The reason we can do this has to do with the way Promise.prototype.then() works. It's a little outside the scope of 301 material, but feel free to research!
      .then(callback);
  };

  Book.prototype.insertRecord = function(callback) {
    // REVIEW: Why can't we use an arrow function here for .insertRecord()?
    $.post('/books', {title: this.title, author: this.author, isbn: this.isbn, image_url: this.image_url, description: this.describtion })
      .then(callback);
  };

  Book.prototype.deleteRecord = function(callback) {
    $.ajax({
      url: `/books/${this.book_id}`,
      method: 'DELETE'
    })
      .then(console.log)
      .then(callback);
  };

  Book.prototype.updateRecord = function(callback) {
    $.ajax({
      url: `/books/${this.book_id}`,
      method: 'PUT',
      data: {
        author: this.author,
        category: this.category,
        publishedOn: this.publishedOn,
        title: this.title,
        author_id: this.author_id
      }
    })
      .then(callback);
  };

  module.Book = Book;
})(app);