'use strict';
var app = app || {};
const __API_URL__ = 'http://localhost:3000';

(function(module) {
  function errorCallback(error) {
    console.error(error);
    module.errorView.initErrorPage(error);
  }

  function Book(rawBookObj) {
    Object.keys(rawBookObj).forEach(key => this[key] = rawBookObj[key]);
  }

  Book.prototype.toHtml = function() {
    let template = Handlebars.compile($('#bookTemplate').text());
    return template(this);
  };

  Book.all = [];
  Book.loadAll = rows => Book.all = rows.sort((a, b) => b.title - a.title).map(book => new Book(book));

  Book.fetchAll = callback =>
    $.get(`${__API_URL__}/api/v1/books`) //endpoint for out query links to app.get in server.js
      .then(Book.loadAll) // once we have the data from the server query run loadAll with the response as the argument passed in
      .then(callback) // If we called fetchAll with a callback run that callback
      .catch(errorCallback); // if error pass invoke errorCallback with the error as the argument

  Book.fetchOne = (ctx, callback) =>
    $.get(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(results => ctx.book = results[0])
      .then(callback)
      .catch(errorCallback);
      
  Book.newBook = book =>
  // console.log(book);
    $.post(`${__API_URL__}/api/v1/books/`, book)
      .then(console.log('DOne'))
      .then(() => page('/'))
      .catch(errorCallback);

  Book.update = book => // added in lab 13 to update
    $.ajax(`${__API_URL__}/api/v1/books/`, book)
      .then(() => page('/'))
      .catch(errorCallback);

  Book.destroy = (ctx, callback) => // added in lab 13 to delete
    $.ajax(`${__API_URL__}/api/v1/books/${ctx.params.id}`)
      .then(console.log)
      .then(callback)
      .then(() => page('/'))
      .catch(errorCallback);

  module.Book = Book;
})(app);