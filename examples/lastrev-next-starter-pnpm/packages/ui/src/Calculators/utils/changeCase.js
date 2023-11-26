const changeCase = {
    camel: (string = '') =>
        string
            ? string
                  .split(/-|_/g)
                  .map((word, i) =>
                      i === 0 ? word[0]?.toLowerCase() + word?.slice(1) : word[0]?.toUpperCase() + word?.slice(1)
                  )
                  .join('')
            : '',
}

export default changeCase
