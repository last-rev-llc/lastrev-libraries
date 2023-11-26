import States from '../../../../utils/states'
export const largeAmmountValidation = {
    message: () => 'Please enter an amount under $1,000,000',
    validation: (v) => v > 1000000,
}
const filingStatusOptions = [
    { name: 'Single', value: 'single' },
    { name: 'Married filing jointly', value: 'married' },
    { name: 'Married filing separately', value: 'married_separately' },
    { name: 'Head of household', value: 'head_of_household' },
]

const ViewOne = (tooltips) => {
    return [
        {
            data: [
                {
                    label: 'Annual income',
                    isVisible: true,
                    controls: {
                        required: true,
                        type: 'text',
                        id: 'annualIncome',
                        prefix: '$',
                        dataType: 'currency',
                    },
                    tooltip: {
                        text: tooltips?.annualIncome,
                    },
                    error: {
                        message: () => 'Please enter your gross annual income.',
                        validation: (v) => !v,
                    },
                },
                {
                    label: 'State',
                    isVisible: true,
                    controls: {
                        required: true,
                        id: 'state',
                        type: 'select',
                        options: States,
                    },
                    tooltip: {
                        text: tooltips?.state,
                    },
                    error: {
                        message: () => 'Select the state where you filed your tax return.',
                        validation: (v) => !v,
                    },
                },
                {
                    label: 'Filing status',
                    isVisible: true,
                    controls: {
                        required: true,
                        id: 'filingStatus',
                        type: 'select',
                        options: filingStatusOptions,
                    },
                    tooltip: {
                        text: tooltips?.filingStatus,
                    },
                    error: {
                        message: () => 'Please select the option that is the closest fit.',
                        validation: (v) => !v,
                    },
                },
                {
                    label: 'Will you be enrolling in a Health Savings Account (HSA) this year?',
                    isVisible: true,
                    controls: [
                        {
                            type: 'button',
                            value: 'Yes',
                            defaultStyle: 'greenOutline',
                            id: 'hsaEnroll',
                            required: true,
                        },
                        {
                            type: 'button',
                            value: 'No',
                            defaultStyle: 'greenOutline',
                            id: 'hsaEnroll',
                            required: true,
                        },
                    ],
                    tooltip: {
                        text: tooltips?.hsaEnroll,
                    },
                    error: {
                        message: () => 'Please select an option.',
                        validation: (v) => !v,
                    },
                },
            ],
        },
        {
            data: [
                {
                    label: 'Will you be enrolling in a General Purpose or Limited Purpose FSA?',
                    isVisible: true,
                    controls: [
                        {
                            type: 'button',
                            value: 'Yes',
                            defaultStyle: 'greenOutline',
                            id: 'fsaEnroll',
                            required: true,
                        },
                        {
                            type: 'button',
                            value: 'No',
                            defaultStyle: 'greenOutline',
                            id: 'fsaEnroll',
                            required: true,
                        },
                    ],
                    tooltip: {
                        text: tooltips?.fsaEnroll,
                    },
                    error: {
                        message: () => 'Please select an option.',
                        validation: (v) => !v,
                    },
                },
                {
                    label: 'Will you be enrolling in a Dependent Care FSA?',
                    isVisible: true,
                    controls: [
                        {
                            type: 'button',
                            value: 'Yes',
                            defaultStyle: 'greenOutline',
                            id: 'dependentEnroll',
                            required: true,
                        },
                        {
                            type: 'button',
                            value: 'No',
                            defaultStyle: 'greenOutline',
                            id: 'dependentEnroll',
                            required: true,
                        },
                    ],
                    tooltip: {
                        text: tooltips?.dependentEnroll,
                    },
                    error: {
                        message: () => 'Please select an option.',
                        validation: (v) => !v,
                    },
                },
            ],
        },
    ]
}

export default ViewOne
