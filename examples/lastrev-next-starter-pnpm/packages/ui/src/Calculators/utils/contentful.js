const Contentful = require('contentful')

const client = Contentful.createClient({
    space: 't1oaprbqkyo4',
    accessToken: '95AU06jZZtujhgpMIPQ-PsRQZ1hefx622Qefi7XVuRw',
    host: process.env.NODE_ENV == 'staging' ? 'preview.contentful.com' : 'cdn.contentful.com',
    retryLimit: 10,
})

const previewClient = Contentful.createClient({
    space: 't1oaprbqkyo4',
    accessToken: '0tw3WKav9E4RvVV-YmjSuaM9xNJRaHYirb7HNfKrW1g',
    host: 'preview.contentful.com',
    retryLimit: 10,
})

const blogAndMiscClient = Contentful.createClient({
    space: '6j8y907dne6i',
    accessToken: 'wdeXaUqZVxtTlP1IpAuRaWXyIqsfElGyFZufBLRQTuQ',
    host: 'cdn.contentful.com',
    retryLimit: 10,
})

const blogAndMiscClientPreview = Contentful.createClient({
    space: '6j8y907dne6i',
    accessToken: 'g2mm_43gcfOOcPISzHIJzCA8ArX_5DcV8WLmqGWGvYY',
    host: 'preview.contentful.com',
    retryLimit: 10,
})

const CONTENTFUL_SPACE_PREVIEW = 'preview'
const CONTENTFUL_SPACE_MISC = 'misc'
const CONTENTFUL_SPACE_MISC_PREVIEW = 'misc-preview'
const contentfulPreviewMode = process.env.NEXT_PUBLIC_CONTENTFUL_USE_PREVIEW_MODE

module.exports = {
    query: function (query, space) {
        const queryObject = {
            include: 10,
            ...query,
        }

        if (contentfulPreviewMode) {
            if (space === CONTENTFUL_SPACE_MISC) {
                return blogAndMiscClientPreview.getEntries(queryObject)
            }

            return previewClient.getEntries(queryObject)
        }

        if (space == CONTENTFUL_SPACE_PREVIEW) {
            query.order = '-sys.createdAt'
            return previewClient.getEntries(queryObject)
        } else if (space == CONTENTFUL_SPACE_MISC) {
            return blogAndMiscClient.getEntries(queryObject)
        } else if (space === CONTENTFUL_SPACE_MISC_PREVIEW) {
            return blogAndMiscClientPreview.getEntries(queryObject)
        } else {
            return client.getEntries(queryObject)
        }
    },
}
