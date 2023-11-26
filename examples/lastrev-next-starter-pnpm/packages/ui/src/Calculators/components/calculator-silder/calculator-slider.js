import React, { useEffect, useState } from 'react';
import CustomButton from '../custom-button/custom-buttom';
import CustomMarkdown from '../custom-markdown/custom-markdown';
import Text from '../text';
import {
  container,
  description,
  main,
  navigation,
  animate,
  end,
  noShadow,
  noShadowMain,
  noShadowDescription
} from './calculator-slider.module.scss';

const CalculatorSlider = ({
  children,
  currentPage,
  handleNavigation,
  pages,
  data,
  disabled,
  hasShadow = true,
  removeButtonMargin
}) => {
  const [animation, setAnimation] = useState(true);
  const [previousData, setPreviousData] = useState(data);
  useEffect(() => {
    setAnimation(true);
  }, [currentPage]);

  useEffect(() => {
    const { title: pTitle, subTitle: pSubtitle } = previousData;
    const { title, subTitle } = data;
    if (pTitle !== title || pSubtitle !== subTitle) {
      setPreviousData(data);
    }
  }, [data]);
  return (
    <div
      className={`${container} ${animation ? animate : ''} ${!hasShadow ? noShadow : ''}`}
      onAnimationEnd={() => setAnimation(false)}>
      <div className={`${description} ${!hasShadow ? noShadowDescription : ''}`}>
        <Text kind={'h2'} size={24} margin={'0 0 22px 0'} weight={700}>
          {previousData?.title}
        </Text>
        <Text size={16} lineHeight="25px" margin={'0 0 15px 0'}>
          <CustomMarkdown data={previousData?.subTitle} />
        </Text>
      </div>
      <div className={`${main} ${!hasShadow ? noShadowMain : ''}`}>
        {children}
        <div className={navigation} style={{ marginTop: currentPage === 0 && !removeButtonMargin ? '-45px' : 0 }}>
          {currentPage > 0 ? (
            <CustomButton handleClick={() => handleNavigation(false)} kind={'navigate'} value={'Back'} />
          ) : null}
          {currentPage < pages ? (
            <CustomButton
              disabled={disabled || animation}
              className={end}
              handleClick={() => handleNavigation(true)}
              kind={'primary'}
              value={currentPage + 1 === pages ? 'Calculate' : 'Next'}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CalculatorSlider;
