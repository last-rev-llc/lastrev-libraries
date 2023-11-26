import { FC } from 'react'

interface TrustpilotIF extends LivelyInterfaces.ReactChildren {
    isSmall?: boolean
}

const Trustpilot: FC<TrustpilotIF> = ({ children = 'Trustpilot', isSmall = true }) => {
    const dataTemplateId: string = isSmall ? '5419b732fbfb950b10de65e5' : '53aa8807dec7e10d38f59f32'
    const dataStyleHeight: string = isSmall ? '24px' : '150px'
    const dataTheme: string = isSmall ? 'light' : 'dark'
    return (
        <div 
            className='trustpilot-widget' 
            data-locale='en-US' 
            data-template-id={dataTemplateId}
            data-businessunit-id='5f8603feaa18e10001a3c99c' 
            data-style-height={dataStyleHeight}
            data-style-width='100%' 
            data-theme={dataTheme}
        >
            <a href="https://www.trustpilot.com/review/livelyme.com" target="_blank" rel="noopener">
                { children }
            </a>
        </div>
    )
}

export default Trustpilot