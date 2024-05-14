exports.extensions = function (graphQL) {
    return {
        creationCallbacks: {
            com_enonic_app_extensions_Person_Data: function (params) {
                params.addFields({
                    fullName: {
                        type: graphQL.GraphQLString,
                    },
                });
            },
        },
        resolvers: {
            com_enonic_app_extensions_Person: {
                data: function (env) {
                    return graphQL.createDataFetcherResult({
                        data: __.toScriptValue(env.source.data),
                        localContext: {
                            _personId: env.source._id,
                        },
                        parentLocalContext: env.localContext,
                    });
                }
            },
            com_enonic_app_extensions_Person_Data: {
                fullName: function (env) {
                    return `${env.source.firstName} ${env.source.lastName} (${env.localContext._personId})`;
                },
            }
        },
    };
}
