'use strict';

page('/', ctx => app.Book.fetchAll(app.bookView.initIndexPage));
page('/detailView/:id',ctx => app.Book.fetchOne(ctx, app.bookView.initDetailView));
page('/updateView/:id',ctx => app.Book.fetchOne(ctx, app.bookView.initUpdateView));
page('/formView/', ctx => app.bookView.initFormView(ctx));
page('/delete/:id',ctx => app.Book.fetchOne(ctx, app.Book.destroy));

page();