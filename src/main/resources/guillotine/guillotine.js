exports.extensions = function (graphQL) {
    return {
        inputTypes: {
            BooksInputFilter: {
                description: "Books Input Filter",
                fields: {
                    titleStartsWith: graphQL.GraphQLString,
                    limit: graphQL.GraphQLInt,
                }
            }
        },
        types: {
            Book: {
                description: 'Book',
                fields: {
                    title: {
                        type: graphQL.GraphQLString,
                    },
                    description: {
                        type: graphQL.GraphQLString,
                    }
                }
            }
        },
        creationCallbacks: {
            Query: function (params) {
                params.addFields({
                    findBooks: {
                        type: graphQL.list(graphQL.reference('Book')),
                        args: {
                            filter: graphQL.reference('BooksInputFilter'),
                        },
                    }
                });
            },
        },
        resolvers: {
            Query: {
                findBooks: function (env) {
                    let books = [];
                    for (let i = 1; i <= 100; i++) {
                        books.push({
                            title: `Book Title ${i}`,
                            description: `Book ${i} Description`,
                        });
                    }

                    if (env.args.filter && env.args.filter.titleStartsWith) {
                        books = books.filter(book => book.title.startsWith(env.args.filter.titleStartsWith));
                    }

                    return books.slice(0, env.args.filter && env.args.filter.limit || 10);
                }
            },
        },
    };
}
