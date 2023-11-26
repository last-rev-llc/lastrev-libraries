import { getResponseMatrix } from './getResponseMatrix'

export const getExplanationText = (year, form = {}, formTemplate) => {
    const values = {}
    const visibleForms = {}
    let hasError = false
    for (const field of formTemplate[0].data) {
        if (Array.isArray(field?.controls)) {
            visibleForms[field.controls[0].id] = field.isVisible
        } else {
            visibleForms[field.controls.id] = field.isVisible
        }
    }
    Object.keys(form).forEach((key) => {
        if (form[key].error) {
            hasError = true
            return
        }
        if (visibleForms[key]) {
            if (form[key].value) {
                values[key] = form[key].value
            }
        } else {
            delete values[key]
        }
    })
    if (hasError) return
    return getResponseMatrix(values, year)
}
