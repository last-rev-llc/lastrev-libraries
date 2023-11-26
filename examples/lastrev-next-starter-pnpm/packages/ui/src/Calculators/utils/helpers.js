export const numberWithCommas = (x) => {
    if (x !== undefined && x !== null) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }
    return ''
}

export const startsWithDoubleSlash = (text) => text.startsWith('//')

export const formatSectionToFeaturedContent = (data) =>
    data?.length
        ? data.map(({ fields: { image, title, titleTwo, url }, sys }) => ({
              id: sys.id,
              image: image?.fields?.file?.url,
              url,
              label: titleTwo,
              headline: title,
          }))
        : []

export const addHTTPSProtocol = (text) => (text?.startsWith('//') ? `https:${text}` : text)

export const addProtocolToProperty = (key, data) =>
    data?.length
        ? data.map((item) => {
              const value = item[key]
              if (value) {
                  const prevValue = { ...item }
                  const withProtocol = {
                      ...prevValue,
                      [key]: `https:${startsWithDoubleSlash(value) ? value : `//${value}`}`,
                  }
                  return withProtocol
              }
          })
        : []

// input handlers for format
export const handleChange = (type, value, setValue) => {
    if (type === 'currency') {
        const numericValue = value.replace(/,/g, '')
        if (/^[0-9,]*$/g.test(numericValue)) {
            setValue(numberWithCommas(numericValue))
        }
    } else if (type === 'number') {
        if (/^[0-9]*$/g.test(value)) {
            setValue(value)
        }
    } else setValue(value)
}

export const handleBlur = (type, value, setValue, customValue) => {
    if (type === 'currency') {
        const realNumber = Number(value.replace(/,/g, ''))
        setValue(isNaN(realNumber) ? value : realNumber, customValue)
    } else setValue(value, customValue)
}

export const parseToNumber = (number) => number && parseFloat(number.replace(/,/g, ''))
const addSlash = (text) => (text && text[text.length - 1] !== '/' ? `${text}/` : text)
const removeSlash = (text) => (text && text[text.length - 1] === '/' ? text.slice(0, -1) : text)

export const getUrls = (text, useLastPart, addAtBegining) => {
    const fullPath = text.pathname || text
    const withoutSlash = fullPath && fullPath[fullPath.length - 1] === '/' ? fullPath.slice(0, -1) : fullPath
    if (useLastPart) {
        const divided = fullPath.split('/')
        let path = divided[divided.length - 1]
        if (!path) {
            path = divided[divided.length - 2]
        }
        if (addAtBegining) return `/${addSlash(path)},/${removeSlash(path)}`
        return `${addSlash(path)},${removeSlash(path)}`
    }

    return `${fullPath},${withoutSlash}`
}

export const buildSchema = (schema) => {
    const { type, mainEntity, mainEntityId } = schema
    let data = {
        '@context': 'https://schema.org',
        '@type': type,
    }
    const itemKey = mainEntityId === 'mainEntity' ? 'acceptedAnswer' : 'itemListElement'
    const r = buildEntity(mainEntity, itemKey, mainEntityId)
    data[mainEntityId] = r
    return data
}

export const buildBlogSchema = (author, title, image, date, slug) => {
    return {
        '@context': 'https://schema.org/',
        '@type': 'Article',
        mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': 'https://livelyme.com/blog/' + slug,
        },
        headline: title,
        image: ['https:' + image],
        datePublished: date,
        author: {
            '@type': 'Person',
            name: author.name,
            url: 'https://livelyme.com/blog/author/' + author.slug,
        },
        publisher: {
            '@type': 'Organization',
            name: 'Lively',
            logo: {
                '@type': 'ImageObject',
                url: 'https://images.ctfassets.net/t1oaprbqkyo4/3vIrNOV5VCmhXApqkXHecf/bf3ed7a5b39312ae7f214a90f6026045/logo.svg',
            },
        },
    }
}

const buildEntity = (entity = [], id) => {
    let payload = []
    const itemKey = id
    for (const {
        fields: { entityItem, name, type },
    } of entity) {
        const entry = {
            '@type': type,
            name: name,
            [itemKey]: {},
        }
        for (const {
            fields: { text, type: itemType },
        } of entityItem) {
            const incomingType = {
                '@type': itemType,
                text,
            }
            entry[itemKey] = incomingType
        }
        payload.push(entry)
    }
    return payload
}

export const truncateText = (text = '', len) => (text?.length >= len ? `${text.slice(0, len - 3)}...` : text)
