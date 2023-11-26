/* 
  Data for 2023. Update when data for 2024 is available 
  https://tax.thomsonreuters.com/news/2023-social-security-wage-base-increases-to-160200/
  https://www.shrm.org/resourcesandtools/hr-topics/compensation/pages/2023-wage-cap-rises-for-social-security-payroll-taxes.aspx
*/

const socialSecurityRate = 0.062 // 6.2%
const medicareRate = 0.0145 // 1.45%
const totalFicaRate = socialSecurityRate + medicareRate // 7.65%
const maxIncomeForSocialSecurity = 160200
const extraMediCareRateForExcess = 0.009 // 0.9%
const excessIncomeSingle = 200000
const excessIncomeMarried = 250000

const getFica = (income, maritalStatus) => {
    const isSingle = maritalStatus === 'single'
    if (income <= maxIncomeForSocialSecurity) return Math.round(income * totalFicaRate)
    if (isSingle) {
        if (income <= excessIncomeSingle)
            return Math.round(income * medicareRate + maxIncomeForSocialSecurity * socialSecurityRate)
        return Math.round(
            income * (extraMediCareRateForExcess + medicareRate) -
                excessIncomeSingle * extraMediCareRateForExcess +
                maxIncomeForSocialSecurity * socialSecurityRate
        )
    }
    if (income <= excessIncomeMarried)
        return Math.round(income * medicareRate + maxIncomeForSocialSecurity * socialSecurityRate)
    return Math.round(
        income * (extraMediCareRateForExcess + medicareRate) -
            excessIncomeMarried * extraMediCareRateForExcess +
            maxIncomeForSocialSecurity * socialSecurityRate
    )
}

export default getFica
