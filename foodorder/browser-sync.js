module.exports = {
    ui: false,
    files: '.',
    proxy: `localhost:${ process.env.PORT }`,
    notify: false,
    snippetOptions: {
        rule: {
            match: /<\/head>/i,
            fn: function (snippet, match) {
                return snippet.replace('id=', `nonce="browser-sync" id=`) + match;
            }
        }
    }
}