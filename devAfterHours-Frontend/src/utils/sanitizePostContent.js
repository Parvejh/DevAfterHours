import DOMPurify from 'dompurify';

const allowedTags = [
    'p', 'br', 'h1', 'h2', 'h3', 'h4',
    'ul', 'ol', 'li', 'blockquote', 'pre', 'code',
    'strong', 'em', 's', 'a'
];

export const sanitizePostContent = (content) => {
    // -- Sanitize content again before rendering so older posts cannot execute unsafe saved HTML.
    return DOMPurify.sanitize(content || '', {
        ALLOWED_TAGS: allowedTags,
        ALLOWED_ATTR: ['href']
    });
};
