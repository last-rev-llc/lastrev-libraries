import React, { useRef, useState } from 'react';
import { useClickOutside } from '../../utils/hooks/useClickOutside.js';
import { Select, SelectContainer, Arrow, Options, Container, Option } from './styled.js';

const CustomSelect = ({
  handleSelect,
  options,
  selectOptions,
  defaultValue = '',
  isDisabled = false,
  id = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue ?? '');
  const [activeSelect, setActiveSelect] = useState('');
  const selectRef = useRef(null);
  useClickOutside(
    selectRef,
    () => {
      if (activeSelect === id && !selected) {
        handleSelect('');
      }
      setIsOpen(false);
    },
    [activeSelect, selected]
  );

  function selectOption(name, value) {
    handleSelect(value);
    setSelected(name);
  }
  return (
    <Container
      isVisible={isOpen}
      onClick={() => {
        setActiveSelect(id);
        if (!isDisabled) {
          setIsOpen(!isOpen);
        }
      }}
      ref={selectRef}>
      <div>
        <SelectContainer isDisabled={isDisabled} hasError={selectOptions?.error} isVisible={isOpen}>
          <Select>{selected}</Select>
          <Arrow isDisabled={isDisabled} isVisible={isOpen} />
        </SelectContainer>
        <Options isVisible={isOpen}>
          {options.map(({ value, name }) => (
            <Option onClick={() => selectOption(name, value)} key={`option-${value}`}>
              {name}
            </Option>
          ))}
        </Options>
      </div>
    </Container>
  );
};

export default CustomSelect;
