import React from 'react'
import CountUp from 'react-countup'
import { Text } from '../../../components'
import CustomButton from '../../../custom-button/custom-buttom'
import {
    Container,
    PrimaryText,
    SectionContainer,
    PrimaryValue,
    MainSection,
    ExplanationContainer,
    Explanation,
    ExplanationsContainer,
    Section,
    MainLargeContainer,
    PrimaryLargeText,
    PrimaryLargeValue,
    LargeContainer,
    RightExplanationContainer,
    PrimaryEmptyResponse,
} from './styled'

const Explanations = ({ max, estimated }) => (
    <>
        <ExplanationContainer>
            <Explanation>
                <Text size={16}>Maximum allowed:</Text>
                <Text size={18} weight={700}>
                    <CountUp start={0} end={max.value} duration={1.5} separator={','} prefix={'$'} />
                </Text>
            </Explanation>
            <Explanation>
                <Text size={16}>Estimated tax savings:</Text>
                <Text size={18} weight={700}>
                    <CountUp start={0} end={estimated.value} duration={1.5} separator={','} prefix={'$'} />
                </Text>
            </Explanation>
        </ExplanationContainer>
        <ExplanationContainer marginTop={'24px'}>
            <Explanation>
                <Text size={13}>{max.text}</Text>
            </Explanation>
            <Explanation>
                <RightExplanationContainer>
                    <Text size={13}>{estimated.text}</Text>
                </RightExplanationContainer>
            </Explanation>
        </ExplanationContainer>
    </>
)

const SmallResult = ({ results, handleNavigation }) => {
    const { title, recommended, maxAllowed, maxText, estimate, estimateText } = results[0]
    return (
        <Container>
            <SectionContainer isPrimary>
                <MainSection>
                    <PrimaryText>{title} </PrimaryText>
                    <PrimaryValue>
                        <CountUp start={0} end={recommended} duration={1.5} separator={','} prefix={'$'} />
                    </PrimaryValue>
                </MainSection>
            </SectionContainer>
            <ExplanationsContainer>
                <Explanations
                    max={{ text: maxText, value: maxAllowed }}
                    estimated={{ text: estimateText, value: estimate }}
                />
            </ExplanationsContainer>
            <Section>
                <CustomButton handleClick={handleNavigation} kind={'navigate'} value={'Start over'} />
            </Section>
        </Container>
    )
}

const LargeResult = ({ results, handleNavigation }) => (
    <Container>
        {results.map(({ title, recommended, maxAllowed, maxText, estimate, estimateText }, i) => (
            <LargeContainer key={`item-${i}`} isPrimary={i === results.length - 1}>
                <MainLargeContainer>
                    <PrimaryLargeText>{title}</PrimaryLargeText>
                    <PrimaryLargeValue>
                        <CountUp start={0} end={recommended} duration={1.5} separator={','} prefix={'$'} />
                    </PrimaryLargeValue>
                </MainLargeContainer>
                <Explanations
                    max={{ text: maxText, value: maxAllowed }}
                    estimated={{ text: estimateText, value: estimate }}
                />
                {i === results.length - 1 ? (
                    <Section>
                        <CustomButton
                            handleClick={handleNavigation}
                            background={'transparent'}
                            kind={'navigate'}
                            value={'Start over'}
                        />
                    </Section>
                ) : null}
            </LargeContainer>
        ))}
    </Container>
)

const EmptyResponse = ({ handleNavigation }) => (
    <Container>
        <SectionContainer>
            <MainSection paddingBottom={'24px'}>
                <PrimaryEmptyResponse weight={700}>
                    Based on your selections, you are not eligible to open a Medical or Dependent Care FSA.{' '}
                </PrimaryEmptyResponse>
            </MainSection>
            <MainSection paddingTop={'12px'} paddingBottom={'10px'}>
                <PrimaryEmptyResponse weight={300}>
                    Please update your selections using the back button below or{' '}
                    <a href={'https://livelyme.com/whats-eligible/'}>learn more about FSA eligibility.</a>
                </PrimaryEmptyResponse>
            </MainSection>
            <Section paddingBottom='25px'>
                <CustomButton
                    handleClick={handleNavigation}
                    background={'transparent'}
                    kind={'navigate'}
                    value={'Back'}
                />
            </Section>
        </SectionContainer>
    </Container>
)

const FsaResults = ({ results = [], handleNavigation }) => {
    if (results.length === 0) return <EmptyResponse handleNavigation={handleNavigation} />
    if (results.length === 1) return <SmallResult handleNavigation={handleNavigation} results={results} />
    return <LargeResult handleNavigation={handleNavigation} results={results} />
}

export default FsaResults
