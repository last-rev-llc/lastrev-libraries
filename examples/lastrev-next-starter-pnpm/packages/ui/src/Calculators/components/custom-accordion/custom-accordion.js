/* eslint-disable react/display-name */
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import Text from '../text';
import { AccordionContainer, HiddenContainer, Arrow, Accordion } from './styled';

const CustomAccordion = ({ title, text, CustomElement = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <Accordion>
      <AccordionContainer onClick={() => setIsOpen(!isOpen)}>
        <div style={{ width: '80%' }}>
          <Text size={'18'} color={'#595959'} weight="400" lineHeight="20px">
            {title}
          </Text>
        </div>
        <Arrow isOpen={isOpen} />
      </AccordionContainer>
      <HiddenContainer height={isOpen ? 'auto' : '0px'}>
        {CustomElement ? (
          <CustomElement />
        ) : (
          <ReactMarkdown
            components={{
              // eslint-disable-next-line react/display-name
              link: (props) => (
                <a href={props.href} target="_blank" rel="noreferrer">
                  {props.children}
                </a>
              )
            }}>{`${text}`}</ReactMarkdown>
        )}
      </HiddenContainer>
    </Accordion>
  );
};

export default CustomAccordion;
