'use strict';

var app = {};
// var __API_URL__ = 'http://localhost:3000';
var __API_URL__ = 'https://ag-vs-booklist.herokuapp.com';

(function (module) {
  function errorCallback(err) {
    console.error(err);
    app.errorView.initErrorPage(err);
  }

  function Book(bookObject) {
    Object.keys(bookObject).forEach(key => this[key] = bookObject[key]);
  }

  Book.prototype.toHtml = function () {
    let template = Handlebars.compile($('#book-template').text());
    return template(this);
  }

  Book.all = [];

  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));
  

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api.v1/books`)
      .then(Book.loadAll)
      .then(callback)
      .catch(errorCallback);

  module.Book = Book;
})(app)