/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable react/display-name */
import React, { useState, useEffect, useRef } from 'react';
import Section from './section';
import Text from './text';
import Colors from '../utils/colors';
import Row from './row';
import Button from './button';
import Modal from './modal/modal';
import styled from 'styled-components';
import responsive from '../utils/responsive';
import css from '../utils/style-helper';
import ReactMarkdown from 'react-markdown';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import MarketoForm from './marketo-form/marketo-form';
import { isScrolledIntoView } from '../utils/scroll-assist';
import { gsap } from 'gsap';
import { addHTTPSProtocol } from '../utils/helpers';

const customMarkdowns = {
  securityTemplate: `
  strong{
    font-size: 22px;
  }
  &:nth-child(2n) {
    margin-bottom: 1.5em;
  }
  &:nth-child(2n + 1) {
    margin-bottom: .5em;
  }
`
};

const Main = styled.div`
  background-size: cover !important;

  > section {
    ${(p) =>
      p.usesDisclaimer &&
      `
      padding-bottom: 0;
    `}
  }

  &.transition {
    opacity: 0;
  }
  ${(p) =>
    css([
      [p.bgColor, `background-color: ${p.bgColor};`],
      [p.bgImage, `background-image: ${p.bgImage};`]
    ])}
`;

const Title = styled(Text)`
  ${(p) =>
    css([
      [
        p.headingSmall,
        `
      font-size: 28px;
      line-height: 28px;
      padding-bottom: 14px;
    `
      ]
    ])}
`;

const TextWrap = styled.div`
  max-width: 650px;
  width: 100%;
  padding-right: 60px;

  ${responsive.tablet`
    padding-right: 0px !important;
    padding-left: 0px !important;
    margin: 0;
    min-width: 50%;
    order: 0 !important;
  `}

  ${(p) =>
    css([
      [
        p.transition,
        `
      opacity: 0;
    `
      ]
    ])}
`;

const SideText = styled(Text)`
  margin-bottom: 24px;
`;

const Note = styled(Text)`
  margin: 24px 0;
  font-size: 12px;
  line-height: 19px;
`;

const List = styled.ul`
  margin-bottom: 24px;
  & li {
    padding: 0 0 20px 30px;
    position: relative;
    &:before {
      position: absolute;
      top: 6px;
      left: 0;
      content: '';
      width: 14px;
      height: 12px;
      background: url('/static/images/checkmark.png');
      background-size: cover !important;
    }
  }

  ${(p) =>
    css([
      [
        p.textColor,
        `
          & li {
            &:before {
              background: url("/static/images/checkmark-white.png") !important;
            }
          }
        `
      ]
    ])}
`;

const MainImage = styled.div`
  width: 100%;

  img {
    align-self: center;
    max-width: 650px;
    width: 100%;
    margin: 0 auto;

    ${responsive.desktopPlus`
      max-width: 500px;
    `}
    ${responsive.desktop`
      max-width: 450px;
    `}
    ${responsive.tablet`
      max-width: 100%;
      margin: 2rem 0 0 0;
    `}
    ${responsive.mobilePlus`
      /* display: none; */
    `}
  }

  ${responsive.tablet`
    padding-bottom: 48px;
  `}

  ${(p) =>
    css([
      [p.imageMaxWidth, `max-width: ${p.imageMaxWidth}px;`],
      [p.imagePadding, p.imagePadding],

      [
        p.transition,
        `
      opacity: 0;
    `
      ]
    ])}
`;

const SecondaryList = styled.div`
  background: #830b4a;
  padding: 15px 80px;
  & li {
    padding: 20px 0 20px 30px;
    position: relative;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    &:last-child {
      border-bottom: none;
    }
    &:before {
      position: absolute;
      top: 22px;
      left: 0;
      content: '✔';
      color: white;
    }
  }
`;

const Markdown = styled.div`
  & a {
    color: ${Colors.green};
  }
  & u {
    text-decoration: underline;
  }
  & center {
    text-align: center;
    line-height: 1.5em;
    margin-bottom: 24px;
  }
  & ol > li:before {
    color: #c30b55;
    content: '0' counter(list-number) '.';
    font-size: 16px;
    font-weight: 900;
    letter-spacing: 0;
    position: absolute;
    left: 0;
    top: 2px;
  }
  & ol > li {
    counter-increment: list-number;
    margin: 30px 0 30px 25px;
    padding-left: 40px;
    position: relative;
  }
  & strong {
    font-weight: 700;
  }
  & p {
    white-space: pre-line;
    margin-top: 1rem;
    margin-bottom: 1rem;
    line-height: 1.5em;
    font-size: ${(props) => (props.secondary ? '12px' : null)};
    // text-align: ${(props) => (props.secondary ? 'center' : 'inherit')};
    ${({ customTextMarkdownStyle }) => customTextMarkdownStyle && customMarkdowns[customTextMarkdownStyle]}
  }
  & ul {
    margin-top: 24px;
  }
  & li {
    padding: 0 0 20px 30px;
    position: relative;
    &:before {
      position: absolute;
      top: 6px;
      left: 0;
      content: '';
      width: 14px;
      height: 12px;
      background: url('/static/images/checkmark.png');
      background-size: cover !important;
    }
  }
  ${(p) =>
    css([
      [
        p.center,
        `
          text-align: center;
          font-size: 12px;
          color: #8e8e8e;
        `
      ],
      [
        p.transitionFromTop,
        `
        opacity: 0;
        transform: translateY(-20px);
        position: relative;
        `
      ],
      [
        p.home,
        `
        h2{
          font-size: 40px;
          line-height: 1.2empx;
          padding-top: 48px;
          padding-bottom: 14px;
          font-weight: 500;
          -webkit-font-smoothing: antialiased;
        }
        `
      ]
    ])}
`;

const CenterTitleWrapper = styled.div`
  position: relative;
  top: 70px;
  ${responsive.mobilePlus`
    top: 20px;
  `}
`;

const HeadingWrapper = styled.div`
  padding: 0 30px;
`;

const ButtonIcon = styled.div`
  padding-right: 10px;
  position: relative;
  img {
    position: relative;
  }
`;

const Buttons = styled(Row)`
  ${responsive.tabletPlus`
    flex-direction: column;
  `}
  ${responsive.tablet`
    flex-direction: row;
  `}
`;

const Links = styled.div`
  & a {
    color: ${Colors.green};
  }
`;

function SideBySide(props) {
  let [slideImage] = useState(0);
  let [showSimpleModal, setShowSimpleModal] = useState(false);
  let [modalContent, setModalContent] = useState();
  let [modalTitle, setModalTitle] = useState();

  let wrapperRef = useRef(props.refName);
  let headLine = useRef(null);
  let tagLine = useRef(null);
  let description = useRef(null);
  let mainButton = useRef(null);
  let altButton = useRef(null);
  let image = useRef(null);
  const [isChromium, setisChromium] = useState(false);
  useEffect(() => {
    const ua = navigator.userAgent.toLowerCase();
    setisChromium(ua.indexOf('safari') != -1 && ua.indexOf('chrome') > -1);
  }, []);
  function displayModal(title, view) {
    setModalContent(view);
    setModalTitle(title);
    setShowSimpleModal(true);
  }

  function dismissModal() {
    setShowSimpleModal(false);
  }

  function transitionElements() {
    const DURA = 0.25;
    let timeline = gsap.timeline({ delay: DURA });

    if (isScrolledIntoView(wrapperRef.current)) {
      window.removeEventListener('scroll', transitionElements, { passive: true });
      let listItems = wrapperRef.current.querySelectorAll('li');

      // setup
      if (image.current) {
        timeline.to(image.current, {
          opacity: 0,
          duration: 0,
          translateX: props.reverse ? -40 : 40
        });
      }

      if (tagLine.current) {
        timeline.to(tagLine.current, {
          opacity: 0,
          duration: 0,
          translateX: props.reverse ? 40 : -40
        });
      }

      if (headLine.current) {
        timeline.to(headLine.current, {
          opacity: 0,
          duration: 0,
          translateX: props.reverse ? 40 : -40
        });
      }

      if (description.current) {
        timeline.to(description.current, {
          opacity: 0,
          duration: 0,
          translateX: props.reverse ? 40 : -40
        });
      }

      if (mainButton.current) {
        timeline.to(mainButton.current, { opacity: 0, duration: 0, translateY: 40 });
      }

      if (altButton.current) {
        timeline.to(altButton.current, { opacity: 0, duration: 0, translateY: 40 });
      }

      if (listItems && listItems.length > 0) {
        timeline.to(listItems, { opacity: 0, duration: 0, translateX: props.reverse ? 40 : -40 });
      }

      // animations
      if (wrapperRef.current) {
        timeline.to(wrapperRef.current, { opacity: 1, duration: DURA });
      }

      if (image.current) {
        timeline.to(image.current, { opacity: 1, duration: DURA, translateX: 0 });
      }

      if (tagLine.current) {
        timeline.to(tagLine.current, { opacity: 1, duration: DURA, translateX: 0 });
      }

      if (headLine.current) {
        timeline.to(headLine.current, { opacity: 1, duration: DURA, translateX: 0 });
      }

      if (description.current) {
        timeline.to(description.current, { opacity: 1, duration: DURA, translateX: 0 });
      }

      if (listItems && listItems.length > 0) {
        timeline.to(listItems, { opacity: 1, duration: DURA, translateX: 0, stagger: 0.1 }, '-=' + DURA);
      }

      if (mainButton.current) {
        timeline.to(mainButton.current, { opacity: 1, duration: DURA / 2, translateY: 0 });
      }

      if (altButton.current) {
        timeline.to(altButton.current, { opacity: 1, duration: DURA / 2, translateY: 0 });
      }
    }
  }

  useEffect(() => {
    if (props.transitionIn && isScrolledIntoView(wrapperRef.current)) {
      transitionElements();
    }
    if (props.transitionIn && !isScrolledIntoView(wrapperRef.current)) {
      window.addEventListener('scroll', transitionElements, { passive: true });
    }
  }, []);

  return (
    <Main
      bgImage={props.backgroundImage}
      bgColor={props.backgroundColor}
      className={props.transitionIn ? 'transition' : null}
      id={props.id}
      usesDisclaimer={props.usesDisclaimer}
      ref={wrapperRef}>
      {/* Components where the title and text need to be center and above instead of on the left side */}
      {props.centerTextWrap && (
        <HeadingWrapper>
          {props.subText && (
            <Text color={props.textColor ? props.textColor : null} kind="p" center subText>
              {props.subText}
            </Text>
          )}
          {props.title && (
            <div
              style={
                props.titleWidth && {
                  maxWidth: props.titleWidth + 'px',
                  margin: '0 auto'
                }
              }>
              <Title
                headingSmall={props.headingSmall}
                color={props.textColor ? props.textColor : null}
                padded
                center
                kind="h2">
                {props.title}
              </Title>
            </div>
          )}
          {props.text && (
            <div
              style={
                props.textWidth
                  ? {
                      maxWidth: props.textWidth + 'px',
                      margin: '0 auto'
                    }
                  : null
              }>
              <SideText
                style={{
                  textAlign: 'center',
                  color: props.textColor ? props.textColor : 'inherit'
                }}>
                <Markdown>
                  <ReactMarkdown
                    components={{
                      link: (props) => (
                        <a href={props.href} target="_blank" rel="noreferrer">
                          {props.children}
                        </a>
                      )
                    }}>
                    {props.text}
                  </ReactMarkdown>
                </Markdown>
              </SideText>
            </div>
          )}
        </HeadingWrapper>
      )}

      {/* Components where the title and subtext needs to be center */}
      {props.topCenterTitle && (
        <CenterTitleWrapper>
          {props.subText && !props.centerTextWrap && (
            <Text color={props.textColor ? props.textColor : null} kind="p" subText center>
              {props.subText}
            </Text>
          )}
          {props.title && !props.centerTextWrap && (
            <div style={props.titleWidth && { maxWidth: props.titleWidth + 'px' }}>
              <Title
                headingSmall={props.headingSmall}
                color={props.textColor ? props.textColor : null}
                padded
                kind="h2"
                center>
                {props.title}
              </Title>
            </div>
          )}
        </CenterTitleWrapper>
      )}

      {/* adds padded as backup if padding is not defined. Only adjust padding when calling the component and not here */}
      <Section padded padding={props.padding}>
        <Row spaceBetween alignCenter wrapPoint={'tablet'}>
          {/* Left Side */}
          <TextWrap style={props.reverse ? { order: 1, paddingRight: 0, paddingLeft: '60px' } : null}>
            {props.icon &&
              !props.centerTextWrap &&
              (isChromium ? (
                <LazyLoadImage threshold="500" src={addHTTPSProtocol(props.icon)} alt={props.iconAlt} />
              ) : (
                <img src={addHTTPSProtocol(props.icon)} alt={props.iconAlt} />
              ))}
            {props.subText && !props.centerTextWrap && !props.topCenterTitle && (
              <Text color={props.textColor ? props.textColor : null} kind="p" subText ref={tagLine}>
                {props.subText}
              </Text>
            )}

            {props.title && !props.centerTextWrap && !props.topCenterTitle && !props.isPurpleSection && (
              <div style={props.titleWidth && { maxWidth: props.titleWidth + 'px' }}>
                <Title color={props.textColor ? props.textColor : null} padded kind="h2" ref={headLine}>
                  {props.title}
                </Title>
              </div>
            )}

            {props.text && !props.centerTextWrap && (
              <div style={props.textWidth && { maxWidth: props.textWidth + 'px' }}>
                <SideText color={props.textColor ? props.textColor : null} kind="div" ref={description}>
                  <Markdown customTextMarkdownStyle={props.customTextMarkdownStyle}>
                    <ReactMarkdown
                      components={{
                        link: (props) => (
                          <a href={props.href} rel="noreferrer">
                            {props.children}
                          </a>
                        )
                      }}>
                      {props.text}
                    </ReactMarkdown>
                  </Markdown>
                </SideText>
              </div>
            )}

            {props.note && !props.centerTextWrap && (
              <Note color="#90969E" kind="p">
                {props.note}
              </Note>
            )}

            {/* Normal lists with checkmarks */}
            {props.listItems && !props.detailedList && !props.slideList && (
              <List textColor={props.textColor}>
                {props.listItems.map((item, index) => {
                  if (item && !item.title) return null;
                  return (
                    <li key={index} style={props.textColor ? { color: props.textColor } : null}>
                      <Text color={props.textColor ? props.textColor : null} kind="p">
                        <Links>
                          <ReactMarkdown
                            components={{
                              link: (props) => (
                                <a href={props.href} target="_blank" rel="noreferrer">
                                  {props.children}
                                </a>
                              )
                            }}>
                            {item && item.title}
                          </ReactMarkdown>
                        </Links>
                      </Text>
                    </li>
                  );
                })}
              </List>
            )}

            <Buttons>
              {/* Primary button */}
              {props.buttonPrimary && props.buttonPrimary.url && (
                <Button href={props.buttonPrimary.url} type="openAccount">
                  {props.buttonPrimary.cta}
                </Button>
              )}

              {/* Primary button backup */}
              {props.cta && props.url && !props.secondaryCtaMarketoFormId && (
                <Button ref={mainButton} href={props.url} type={!props.buttonIcon ? 'openAccount' : ''}>
                  {props.buttonIcon && (
                    <ButtonIcon>
                      <LazyLoadImage threshold="500" src={props.buttonIcon} />
                    </ButtonIcon>
                  )}
                  {props.cta}
                </Button>
              )}

              {/* Primary button with marketo form id */}
              {props.cta && props.secondaryCtaMarketoFormId && (
                <div
                  onClick={() => {
                    displayModal('Contact Us', <MarketoForm id={props.secondaryCtaMarketoFormId} />);
                  }}>
                  <Button className="sxs-primary-btn" ref={mainButton}>
                    {props.buttonIcon && (
                      <ButtonIcon>
                        <LazyLoadImage threshold="500" src={props.buttonIcon} />
                      </ButtonIcon>
                    )}
                    {props.cta}
                  </Button>
                </div>
              )}

              {/* Secondary button */}
              {props.secondaryCta && !props.marketoFormId && (
                <Button
                  kind={props.secondaryButtonKind || 'clear'}
                  padding={props.secondaryButtonPadding}
                  href={props.secondaryUrl}>
                  {props.secondaryCta}
                </Button>
              )}

              {/* Secondary button width marketo form id */}
              {props.secondaryCta && props.secondaryUrl && props.marketoFormId && props.pageType !== 'Home' && (
                <div
                  onClick={() => {
                    displayModal('Contact Us', <MarketoForm id={props.marketoFormId} />);
                  }}>
                  <Button color={props.textColor} kind="white" padding={props.secondaryButtonPadding} ref={altButton}>
                    {props.secondaryCta}
                  </Button>
                </div>
              )}
            </Buttons>
          </TextWrap>

          {/* Right Side Options */}
          {props.image && (
            <MainImage
              imagePadding={props.imagePadding}
              imageMaxWidth={props.imageMaxWidth}
              className="sxs-img-container"
              ref={image}>
              {isChromium ? (
                <LazyLoadImage
                  style={{
                    order: props.reverse ? 0 : null,
                    maxWidth: props.imageMaxWidth ? `${props.imageMaxWidth}px` : null
                  }}
                  src={
                    props.slideList
                      ? slideImage
                        ? slideImage
                        : addHTTPSProtocol(props.listItems[0].image.file.url + '?w=800&fm=webp&q=100')
                      : addHTTPSProtocol(props.image.file.url + '?w=800&fm=webp&q=100')
                  }
                  alt={props.image.title}
                />
              ) : (
                <img
                  style={{
                    order: props.reverse ? 0 : null,
                    maxWidth: props.imageMaxWidth ? `${props.imageMaxWidth}px` : null
                  }}
                  src={
                    props.slideList
                      ? slideImage
                        ? slideImage
                        : addHTTPSProtocol(props.listItems[0].image.file.url + '?w=800')
                      : addHTTPSProtocol(props.image.file.url + '?w=800')
                  }
                  alt={props.image.title}
                  loading="lazy"
                />
              )}
            </MainImage>
          )}

          {props.secondaryList && (
            <SecondaryList style={props.reverse ? { order: 0 } : null}>
              <ul>
                {props.secondaryList.map((item, index) => {
                  return (
                    <li key={index} style={props.textColor ? { color: props.textColor } : null}>
                      <Text color={props.textColor ? props.textColor : null} kind="p">
                        {item.title}
                      </Text>
                    </li>
                  );
                })}
              </ul>
            </SecondaryList>
          )}

          {/* Has option to show children on right side if above options don't match design */}
          {props.children}
        </Row>

        {props.secondaryText && props.pageType !== 'Home' && (
          <Markdown secondary>
            <ReactMarkdown
              center
              components={{
                link: (props) => (
                  <a href={props.href} target="_blank" rel="noreferrer">
                    {props.children}
                  </a>
                )
              }}>
              {props.secondaryText}
            </ReactMarkdown>
          </Markdown>
        )}

        {props.secondaryText && props.pageType === 'Home' && (
          <Markdown home>
            <ReactMarkdown
              center
              components={{
                link: (props) => (
                  <a href={props.href} target="_blank" rel="noreferrer">
                    {props.children}
                  </a>
                )
              }}>
              {props.secondaryText}
            </ReactMarkdown>
          </Markdown>
        )}
        <Buttons>
          {/* Secondary button width marketo form id */}
          {props.secondaryCta && props.secondaryUrl && props.marketoFormId && props.pageType === 'Home' && (
            <div
              onClick={() => {
                displayModal('Contact Us', <MarketoForm id={props.marketoFormId} />);
              }}>
              <Button color={props.textColor} padding={props.secondaryButtonPadding} ref={altButton}>
                {props.secondaryCta}
              </Button>
            </div>
          )}
        </Buttons>
      </Section>

      <Modal show={showSimpleModal} handleClose={dismissModal} view={modalContent} title={modalTitle} />
    </Main>
  );
}

export default SideBySide;
