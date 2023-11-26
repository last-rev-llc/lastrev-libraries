import ViewFour from '../../templates/fsaCalculator/view-four'
import ViewThree from '../../templates/fsaCalculator/view-three'
import ViewTwo from '../../templates/fsaCalculator/view-two'

export const getExpenses = (form) => {
    const lpfsaIds = []
    const fsaIds = []
    const dcfsaIds = []
    const fieldsViewTwo = ViewTwo()
    const fieldsViewThree = ViewThree()
    const fieldsViewFour = ViewFour()
    let lpfsaTotal = 0
    let fsaTotal = 0
    let dcfsaTotal = 0

    for (const field of fieldsViewTwo) {
        for (const data of field.data) {
            fsaIds.push(data.controls.id)
        }
    }
    for (const field of fieldsViewThree) {
        for (const data of field.data) {
            lpfsaIds.push(data.controls.id)
            fsaIds.push(data.controls.id)
        }
    }
    for (const field of fieldsViewFour) {
        for (const data of field.data) {
            dcfsaIds.push(data.controls.id)
        }
    }
    for (const id of lpfsaIds) {
        const value = form[id]?.value
        if (value !== undefined) {
            lpfsaTotal += value
        }
    }
    for (const id of dcfsaIds) {
        const value = form[id]?.value
        if (value !== undefined) {
            dcfsaTotal += value
        }
    }
    for (const id of fsaIds) {
        const value = form[id]?.value
        if (value !== undefined) {
            fsaTotal += value
        }
    }

    return { lpfsaTotal, dcfsaTotal, fsaTotal }
}
