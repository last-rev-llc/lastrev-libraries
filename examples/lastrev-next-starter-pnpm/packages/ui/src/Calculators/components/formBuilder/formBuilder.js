import React from 'react'
import { animation } from './form-builder.module.scss'
import CustomField from '../custom-field/custom-field'
import styled from 'styled-components'
import responsive from '../../utils/responsive'
import Text from '../text'

const getDataFromRow = (formData, controls) => {
    let payload = {}
    let hasData = false
    if (Array.isArray(controls)) {
        for (const control of controls) {
            if (formData[control.id]) {
                payload[control.id] = formData[control.id]
                hasData = true
            }
        }
        return hasData ? payload : undefined
    }
    return formData[controls.id]
}

const FormContainer = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    ${responsive.tabletLandscape`
  flex-direction: column;
  `}
`

const FormCol = styled.div`
    width: 100%;
    margin-right: 50px;
    &:last-child {
        margin-right: 0px;
    }
`

const FormBuilder = ({ form, handler, formData, hasAnimation }) => {
    return (
        <FormContainer>
            {form.map((column, index) => {
                return (
                    <FormCol key={`column-${index}`}>
                        {column?.title ? (
                            <Text weight={'700'} size='20' margin={'0 0 20px 0'}>
                                {column.title}
                            </Text>
                        ) : null}
                        {column.data.map(
                            ({
                                controls,
                                label,
                                tooltip,
                                error,
                                isVisible,
                                hintText,
                                isDisabled,
                                description,
                                customStyle,
                                hasSeparation,
                            }) => {
                                const fieldId = Array.isArray(controls) ? controls[0].id : controls.id
                                if (!isVisible) {
                                    return null
                                }
                                return (
                                    <div id={fieldId} key={fieldId}>
                                        <div className={`${hasAnimation ? animation : ''}`}>
                                            <CustomField
                                                rowData={getDataFromRow(formData, controls)}
                                                label={label}
                                                tooltip={tooltip}
                                                error={error}
                                                hint={hintText}
                                                hasSeparation={hasSeparation}
                                                isDisabled={isDisabled}
                                                fieldId={Array.isArray(controls) && fieldId}
                                                controls={controls}
                                                handler={handler}
                                                description={description}
                                                customStyle={customStyle}
                                            />
                                        </div>
                                    </div>
                                )
                            }
                        )}
                    </FormCol>
                )
            })}
        </FormContainer>
    )
}

export default FormBuilder
