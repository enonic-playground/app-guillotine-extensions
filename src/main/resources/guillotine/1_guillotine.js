exports.extensions = function (graphQL) {
    return {
        creationCallbacks: {
            com_enonic_app_extensions_Person_Data: function (params) {
                params.addFields({
                    fullName: {
                        type: graphQL.GraphQLString,
                    },
                });

                params.removeFields(['firstName', 'lastName']);

                params.modifyFields({
                    age: {
                        type: graphQL.GraphQLInt,
                    }
                });
            },
        },
        resolvers: {
            com_enonic_app_extensions_Person_Data: {
                fullName: function (env) {
                    return `${env.source.firstName} ${env.source.lastName}`;
                },
                age: function (env) {
                    return env.source.age ? parseInt(env.source.age) : null;
                }
            },
        },
    };
}
