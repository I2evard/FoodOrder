module.exports = {
    contentSecurityPolicy: {
        directives: { 
            defaultSrc: ["'self'"],
            baseUri: ["'self'"],
            blockAllMixedContent: [],
            fontSrc: ["'self'", "https:", "data:"],
            frameAncestors: ["'self'"],
            imgSrc: ["'self'", "data:"],
            objectSrc: ["'none'"],
            scriptSrc: ["'self'",  "'nonce-browser-sync'"],
            scriptSrcAttr: ["'none'"],
            styleSrc: ["'self'", "https:", "'unsafe-inline'"],
            upgradeInsecureRequests: []
        }
    }
};
