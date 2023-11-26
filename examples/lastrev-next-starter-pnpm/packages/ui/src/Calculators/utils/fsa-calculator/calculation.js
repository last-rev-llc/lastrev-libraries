import { numberWithCommas } from '../../../../utils/helpers'
import { ALL_FILLING_STATUS, CURRENT_YEAR_ANNUAL_FSA_LIMIT, MARRIED_FILLING_STATUS } from './contants'
import { getExpenses } from './totalExpenses'

export const getCalculations = (form, tax, recommendations = {}) => {
    const { filingStatus } = form
    const payload = []
    const expenses = getExpenses(form)

    if (recommendations.fsa) {
        const medicalFsaTotal = expenses.fsaTotal
        const limit = filingStatus?.value === 'married_separately' ? MARRIED_FILLING_STATUS : ALL_FILLING_STATUS
        const recommended = medicalFsaTotal >= limit ? limit : medicalFsaTotal
        const estimate = recommended * tax
        payload.push({
            title: 'Your recommended General Purpose FSA contribution amount',
            recommended,
            maxAllowed: limit,
            maxText: `Based on your annual expenses, you should plan to contribute $${numberWithCommas(
                Math.round(recommended)
            )} towards your General Purpose FSA this year. You can contribute up to $${numberWithCommas(limit)}.`,
            estimate,
            estimateText: `Contributions to your General Purpose FSA could result in tax savings of approximately $${numberWithCommas(
                Math.round(estimate)
            )}.`,
        })
    } else if (recommendations.lpfsa) {
        const fsaExpensesTotal = expenses.lpfsaTotal
        const recommended =
            fsaExpensesTotal >= CURRENT_YEAR_ANNUAL_FSA_LIMIT ? CURRENT_YEAR_ANNUAL_FSA_LIMIT : fsaExpensesTotal
        const estimate = recommended * tax
        payload.push({
            title: 'Your recommended Limited Purpose FSA (LPFSA) contribution amount',
            recommended,
            maxAllowed: CURRENT_YEAR_ANNUAL_FSA_LIMIT,
            maxText: `Based on your annual expenses, you should plan to contribute $${numberWithCommas(
                Math.round(recommended)
            )} towards your LPFSA this year. You can contribute up to $${numberWithCommas(
                CURRENT_YEAR_ANNUAL_FSA_LIMIT
            )}.`,
            estimate,
            estimateText: `Contributions to your LPFSA could result in tax savings of approximately $${numberWithCommas(
                Math.round(estimate)
            )}.`,
        })
    }
    if (recommendations.dcfsa) {
        const dcfsaTotal = expenses.dcfsaTotal
        const limit = filingStatus?.value === 'married_separately' ? MARRIED_FILLING_STATUS : ALL_FILLING_STATUS
        const recommended = dcfsaTotal >= limit ? limit : dcfsaTotal
        const estimate = recommended * tax
        payload.push({
            title: 'Your Dependent Care FSA contribution amount',
            recommended,
            maxAllowed: limit,
            maxText: `Based on your annual expenses, you should plan to contribute $${numberWithCommas(
                Math.round(recommended)
            )} towards your Dependent Care FSA this year. You can contribute up to $${numberWithCommas(
                Math.round(limit)
            )}.`,
            estimate,
            estimateText: `Contributions to your Dependent Care FSA could result in tax savings of approximately $${numberWithCommas(
                Math.round(estimate)
            )}.`,
        })
    }
    return payload
}
