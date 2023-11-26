/* 
  Data for 2023. Update when data for 2024 is available 
  https://www.kiplinger.com/taxes/tax-deductions/602223/standard-deduction
  https://www.nerdwallet.com/article/taxes/federal-income-tax-brackets
*/

const singleStandardDeduction = 13850
const marriedStandardDeduction = 27700

const singleFederalBrackets = [
    {
        low: 0,
        high: 11000,
        rate: 0.1,
        bracketTax: 0,
    },
    {
        low: 11000,
        high: 44725,
        rate: 0.12,
        bracketTax: 1100,
    },
    {
        low: 44725,
        high: 95375,
        rate: 0.22,
        bracketTax: 5147,
    },
    {
        low: 95375,
        high: 182100,
        rate: 0.24,
        bracketTax: 16290,
    },
    {
        low: 182100,
        high: 231250,
        rate: 0.32,
        bracketTax: 37104,
    },
    {
        low: 231250,
        high: 578125,
        rate: 0.35,
        bracketTax: 52832,
    },
    {
        low: 578125,
        high: null,
        rate: 0.37,
        bracketTax: 174238.25,
    },
]

const marriedFederalBrackets = [
    {
        low: 0,
        high: 22000,
        rate: 0.1,
        bracketTax: 0,
    },
    {
        low: 22000,
        high: 89450,
        rate: 0.12,
        bracketTax: 2200,
    },
    {
        low: 89450,
        high: 190750,
        rate: 0.22,
        bracketTax: 10294,
    },
    {
        low: 190750,
        high: 364200,
        rate: 0.24,
        bracketTax: 32580,
    },
    {
        low: 364200,
        high: 462500,
        rate: 0.32,
        bracketTax: 74208,
    },
    {
        low: 462500,
        high: 693750,
        rate: 0.35,
        bracketTax: 105664,
    },
    {
        low: 693750,
        high: null,
        rate: 0.37,
        bracketTax: 186601.5,
    },
]

const calculateFederal = (income, brackets) => {
    const maxItem = brackets[brackets.length - 1]

    if (income <= 0) return 0
    if (income > maxItem.low) {
        return Math.round((income - maxItem.low) * maxItem.rate + maxItem.bracketTax)
    }
    for (let i = 0; i < brackets.length; i++) {
        let bracket = brackets[i]
        if (income > bracket.low && income <= bracket.high) {
            return Math.round((income - bracket.low) * bracket.rate + bracket.bracketTax)
        }
    }
    return 0
}

const getFederal = (pay_rate, filing_status = 'single') => {
    if (filing_status === 'single') {
        const newIncome = pay_rate - singleStandardDeduction
        return calculateFederal(newIncome, singleFederalBrackets)
    }
    const newIncome = pay_rate - marriedStandardDeduction
    return calculateFederal(newIncome, marriedFederalBrackets)
}

export default getFederal
