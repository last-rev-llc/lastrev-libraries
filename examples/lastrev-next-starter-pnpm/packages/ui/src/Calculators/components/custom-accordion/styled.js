import styled from 'styled-components';

export const HiddenContainer = styled.div`
  transition: 0.3s ease all;
  height: ${({ height }) => height};
  overflow: hidden;
  padding: ${({ height }) => (height !== '0px' ? '12px 0px' : '0px')};

  a {
    color: #19a69d;
    font-size: 16px;
  }

  p,
  ol {
    margin-bottom: 12px;
    line-height: 24px;
    font-weight: 100;
    font-size: 16px;
    color: #595959;
  }

  ol {
    list-style: decimal;
    padding: 20px;
  }
`;

export const AccordionContainer = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 24px;
  align-items: center;
  padding-bottom: 12px;
  border-bottom: 2px solid #000000;
  cursor: pointer;
`;

export const Accordion = styled.div`
  width: 100%;
`;

export const Arrow = styled.div`
  background: url('/static/images/arrow-down.svg');
  width: 12px;
  height: 7px;
  transition: 0.3s ease all;
  transform: ${({ isOpen }) => `rotate(${isOpen ? '180deg' : '0deg'})`};
`;
