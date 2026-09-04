const sanitizeHtml = require('sanitize-html');

const allowedTags = [
    'p', 'br', 'h1', 'h2', 'h3', 'h4',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
    'strong', 'em', 's', 'a'
];

const sanitizePostContent = (content) => {
    // -- Only preserve the formatting produced by the editor; remove scripts, styles, media, and event attributes.
    return sanitizeHtml(content || '', {
        allowedTags,
        allowedAttributes: {
            a: ['href']
        },
        allowedSchemes: ['http', 'https', 'mailto'],
        allowProtocolRelative: false,
        disallowedTagsMode: 'discard',
        nonTextTags: ['script', 'style', 'textarea', 'option', 'xmp', 'noscript'],
        nestingLimit: 20
    });
};

module.exports = sanitizePostContent;
