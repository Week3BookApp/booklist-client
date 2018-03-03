'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/detailView/:id',ctx => app.Book.fetchOne(ctx, app.bookView.initDetailView));
page('/formView/', ctx => app.bookView.initFormView(ctx));
page('/updateView/:id',ctx => app.Book.fetchOne(ctx, app.bookView.initUpdateView));
page('/delete/:id',ctx => app.Book.delete(ctx, app.bookView.initIndexPage));

page();