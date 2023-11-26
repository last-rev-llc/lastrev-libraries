import React, { useEffect, useState } from 'react';
import styled, { css as customCss } from 'styled-components';
import css from '../utils/style-helper';
import colors from '../utils/colors';
import responsive from '../utils/responsive';
// import 'url-search-params-polyfill'
import Trustpilot from './Trustpilot';

// function setUrlParams(currentLink, parterId) {
//   currentLink.search = ''; // where is this value being setted??
//   currentLink.searchParams.set('utm_source', parterId);
//   currentLink.searchParams.set('utm_medium', 'web');
//   currentLink.searchParams.set('utm_campaign', 'partner');
//   return currentLink;
// }

const ButtonWrapper = styled.div`
  ${(p) =>
    p.usesTrustpilot &&
    customCss`
          display: flex;
          align-items: center;

          a {
            margin-right: 15px;
          }


          ${responsive.mobilePlus`
            padding-bottom: 15px;
            flex-direction: column-reverse;
            a {
              margin-top: 20px;
            }
          `}
    `}

  ${(props) =>
    props.customFontsize &&
    customCss`
    button {
      font-size: 12px;
    }
  `}

    ${(p) =>
    css([
      [
        p.center,
        `
      marign: 50px;
      display: flex;
      justify-content: center;
    `
      ],
      [
        p.inline,
        `
      display: inline-block;
    `
      ]
    ])}
`;

const ButtonStyle = styled.button`
  display: inline-block;
  text-decoration: none;
  cursor: pointer;
  padding: 15px 24px;
  font-size: 15px;
  text-align: center;
  font-weight: 700;
  line-height: 1em;
  -webkit-font-smoothing: antialiased;
  transition-duration: 0.4s;
  opacity: 1;
  min-width: 150px;
  margin: 6px 0;
  border: none;
  &:hover {
    opacity: 1;
    color: white;
  }
  &:focus,
  &:active {
    color: white;
  }

  ${(p) =>
    css([
      [
        p.kind === 'small',
        `
      font-size: 14px;
      padding: 7px 14px;
      background: #F0EEE9;
      border-radius: 4px;
      width: auto;
      min-width: auto;
      &:hover {
        background: #d6d4ce;
        color: inherit;
      }
      &:focus, &:active {
        color: white;
      }
    `
      ],

      [
        p.kind === 'gray',
        `
      background: #F7F7F7;
      color: #17A69C;
      border-radius: 4px;
      &:hover {
        background: #17A69C;
        color: white;
      }
      &:focus, &:active {
        background: #F7F7F7;
        color: #17A69C;
      }
    `
      ],

      [
        p.kind === 'whiteOutline',
        `
      background: none;
      border: 1px solid white;
      border-radius: 4px;
      color: white;
      min-height: 48px;
      &:hover {
        background: white;
        color: ${colors.purple};
      }
      &:focus, &:active {
        background: white;
        color: ${colors.purple};
      }
    `
      ],
      [
        p.kind === 'landing',
        `
        background: none;
        border: none;
        color: #3049C9;
        min-height: 48px;
        text-decoration: underline;
        &:hover {
          text-decoration: none;
          color: #3049C9;
        }
      `
      ],
      [
        p.kind === 'CTA-landing',
        `
        padding: 1rem 4rem;
        color: white;
        background-color: #3049C9;
        border-radius: 50px;
        border: none;
        font-size: 1rem;
        box-sizing: border-box;
        &:hover {
          cursor:pointer;
        }
      `
      ],

      [
        p.kind === 'greenOutline',
        `
        border-radius: 8px;
        border: 1px solid ${p.isSelected ? colors.green : colors.gray};
        background: ${p.isSelected ? colors.lightGreen : '#FFFFFF'};
        color: ${p.isSelected ? colors.green : '#000000'};
        outline: none;
        &:hover{
          background: ${colors.lightGreen};
          border-color: ${colors.green};
          color: ${colors.green};
        }
        &:focus, &:active {
          background: ${colors.lightGreen};
          color: ${colors.green};
        }
      `
      ],

      [
        p.kind === 'GrayOutline',
        `
      background: none;
      border: 1px solid #f0eee9;
      border-radius: 4px;
      color: #17a69c;
      &:hover {
        background: #17a69c;
        color: white;
      }
      &:focus, &:active {
        background: #17a69c;
        color: white;
      }
    `
      ],
      [
        p.kind === 'GreenOutline',
        `
      background: none;
      border: 1px solid ${colors.green};
      border-radius: 4px;
      color: #17a69c;
      &:hover {
        background: #17a69c;
        color: white;
      }
      &:focus, &:active {
        background: #17a69c;
        color: white;
      }
    `
      ],
      [
        !p.kind || p.kind === 'primary',
        `
      background-color: ${colors.green};
      color: white;
      border-radius: 4px;
      &:hover {
        color: white;
        background-color: ${colors.darkTeal};
      }
    `
      ],
      [
        p.kind === 'newWhite',
        `
        background-color: #fff;
        color: black;
        width: 240px;
        font-size: 20px;
        border-radius: 80px;
        padding: 10px;
        &:hover {
          background-color: #e0e0e0;
          color: black;
        }
        `
      ],
      [
        p.kind === 'newBlue',
        `
        background-color: #3049C9;
        color: white;
        width: 240px;
        font-size: 20px;
        border-radius: 80px;
        padding: 10px;
        &:hover {
          background-color: #2038B5;
          color: white;
        }
        ${responsive.mobilePlus`
        width: 160px;
        font-size: 16px;
        `}
        ${responsive.mobile`
        width: 100px;
        font-size: 16px;
        `}
        `
      ],
      [
        p.kind === 'newBlueLarge',
        `
        background-color: #3049C9;
        color: white;
        width: 300px;
        font-size: 20px;
        border-radius: 80px;
        padding: 10px;
        &:hover {
          background-color: #2038B5;
          color: white;
        }
        ${responsive.mobile`
        width: 250px;
        `}
        `
      ],
      [
        p.kind === 'newBlackLink',
        `
        background-color: white;
        color: black;
        font-size: 30px;
        text-decoration: underline;
        padding: 0px;
        &:hover {
          font-size: 31px;
          color: black;
        }
        `
      ],

      [
        p.kind === 'whiteBg',
        `
      background-color: white;
      color: ${colors.green};
      border-radius: 4px;
      &:hover {
        color: ${colors.darkTeal};
      }
      &:focus, &:active {
        color: ${colors.darkTeal};
      }
    `
      ],
      [
        p.kind === 'whiteBgGreenBorder',
        `
      background-color: white;
      color: ${colors.green};
      border-radius: 4px;
      border: 1px solid #489A93;
      margin-left: 37px;
      ${responsive.mobile`
        margin-left: 0;
      `}
      &:hover {
        color: ${colors.darkTeal};
      }
      &:focus, &:active {
        color: ${colors.darkTeal};
      }
    `
      ],
      [
        p.kind === 'whiteBgGreenBorderSameBgHover',
        `
      background-color: white;
      color: ${colors.green};
      border-radius: 4px;
      border: 1px solid #489A93;
      margin-left: 37px;
      outline: none;
      ${responsive.mobile`
        margin-left: 0;
      `}
      &:focus, &:active {
        background-color: white;
        color: ${colors.green};
      }
      &:hover {
        color: #ffffff;
        background-color: ${colors.green};
        border: 1px solid ${colors.green};
      }
    `
      ],
      [
        p.kind === 'white',
        `
      background: none;
      color: ${colors.green};
      &:hover {
        color: ${colors.darkTeal};
      }
      &:focus, &:active {
        color: ${colors.darkTeal};
      }
    `
      ],
      [
        p.kind === 'link',
        `
      font-size: 1rem;
      font-weight: normal;
      background: none;
      color: #9e9e9e;
      transition: font-weight 100ms ease-in-out;
      &:hover {
        color: #808080;
        text-decoration: underline;
        font-weight: 600;
      }
      &:focus, &:active {
        color: #808080;
      }
    `
      ],

      [
        p.kind === 'clear',
        `
      background: none;
      color: white;
      &:hover {
        color: white;
      }
      &:focus, &:active {
        color: white;
      }
    `
      ],

      [
        p.kind === 'play',
        `
      background-color: none;
      background: none;
      color: ${colors.yellow};
      position: relative;
      padding-left: 45px;
      &:before {
        content: '';
        width: 30px;
        height: 30px;
        background: url("/static/images/icon-play.svg");
        background-size: cover !important;
        position: absolute;
        top: 11px;
        left: 0px;
      }
      &:hover {
        color: ${colors.yellow};
      }
      &:focus, &:active {
        color: ${colors.yellow};
      }
    `
      ],

      [
        p.kind === 'playGreen',
        `
      background-color: none;
      background: none;
      color: ${colors.dark};
      position: relative;
      padding-left: 45px;
      &:before {
        content: '';
        width: 30px;
        height: 30px;
        background: url("/static/images/icon-play-green.png");
        background-size: cover !important;
        position: absolute;
        top: 11px;
        left: 0px;
      }
      &:hover {
        color: ${colors.dark};
      }
      &:focus, &:active {
        color: ${colors.dark};
      }
    `
      ],

      [
        p.kind === 'arrow',
        `
      background-color: none;
      background: none;
      color: ${colors.green};
      position: relative;
      padding: 5px 5px 5px 25px !important;
      min-width: auto;
      margin-bottom: 12px;
      &:hover {
        color: ${colors.darkTeal};
      }
      &:focus, &:active {
        color: ${colors.darkTeal};
      }
      &:before {
        content: '';
        width: 12px;
        height: 10px;
        background: url("/static/images/back-arrow.png");
        background-size: cover !important;
        position: absolute;
        top: 11px;
        left: 0px;
      }
    `
      ],

      [
        p.kind === 'arrowRight',
        `
      background-color: none;
      background: none;
      color: ${colors.green};
      position: relative;
      padding: 5px 0;
      padding-right: 20px;
      min-width: auto;
      margin-bottom: 12px;
      &:hover {
        color: ${colors.darkTeal};
      }
      &:focus, &:active {
        color: ${colors.darkTeal};
      }
      &:before {
        content: '';
        width: 14px;
        height: 15px;
        background: url("https://s3-us-west-1.amazonaws.com/lively-marketing-assets/images/icons/green-arrow-right.svg") no-repeat;
        background-size: cover !important;
        position: absolute;
        top: 8px;
        right: 0px;
      }
    `
      ],

      [
        p.active,
        `
      background: none;
      border: 1px solid black;
    `
      ],

      [
        p.color === 'white' && p.kind === 'arrow',
        `
      &:before {
        height: 12px;
        background: url("https://s3-us-west-1.amazonaws.com/lively-marketing-assets/images/icons/arrow-left-white.svg") no-repeat;
      }
    `
      ],

      [
        p.color,
        `
    color: ${p.color};
    &:hover {
      color: ${p.color};
    }
    `
      ],

      [
        p.padding,
        `
      padding: ${p.padding};
    `
      ],

      [
        p.noPadding,
        `
      padding: 0;
    `
      ],

      [
        p.transition,
        `
      opacity: 0;
      transition-duration: initial;
    `
      ],

      [
        p.transitionFromBottom,
        `
      opacity: 0;
      transform: translateY(40px);
      transition-duration: initial;
    `
      ],
      [
        p.margin,
        `
        margin: ${p.margin};
        `
      ],
      [
        p.height,
        `
        height: ${p.height};
        `
      ],
      [
        p.tinyFont,
        `
        font-size: 0.75rem;
        `
      ]
    ])}
`;

const ContentWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 1.4em;
  width: ${({ width }) => width};
  line-height: ${({ kind }) => kind === 'link' && 1};
`;

const Button = React.forwardRef((props, ref) => {
  let [partnerUrl, setPartnerUrl] = useState(null);
  useEffect(() => {
    if (props.type === 'openAccount') {
      let params = new URLSearchParams(location.search);
      let currentLink = null;
      // edge case: in contentful a content user might use a # for call to actions
      try {
        if (props.href === '#') {
          currentLink = '';
        } else {
          currentLink = new URL(props.href);
        }
      } catch (e) {
        currentLink = props.href;
      }

      // edge case: in contentful a content user might use a relative path such as /example which is an invalid url
      if (props?.href?.indexOf('#') === -1 && currentLink.href) {
        // on partner pages the partnerID is set in contentful, the cta's need a slight delay in order to update correctly
        setTimeout(function () {
          // the global nav bar has no way at the moment to know what url to use individual/employer
          // updates employerRoutes to link to employers
          if (props.employerRoutes) {
            for (let i = 0; i < props.employerRoutes.length; i++) {
              if (window.location.href.indexOf(props.employerRoutes[i]) > -1) {
                currentLink.href = 'https://secure.livelyme.com/signup/employer';
                setPartnerUrl(currentLink.href);
              }
            }
          }

          // if there is a partner param in the url set that as partner id
          if (params.get('partner') !== null) {
            setPartnerUrl(currentLink.href + '?partner=' + params.get('partner'));
            // setUrlParams(currentLink, params.get('partner'));
            // setPartnerUrl(currentLink.href);
          }
          // if no partner param in url but in local storage
          if (params.get('partner') === null && localStorage.getItem('partnerID') !== null) {
            // edge case: content managers might include an empty partner param in call to actions from contentful
            // when that is the case simply update the partner id with what is in session storage
            if (currentLink.href.indexOf('?') >= 0) {
              currentLink.searchParams.set('partner', localStorage.getItem('partnerID'));
              setPartnerUrl(currentLink.href);
              // setUrlParams(currentLink, localStorage.getItem('partnerID'));
              // setPartnerUrl(currentLink.href);
            } else {
              setPartnerUrl(currentLink.href + '?partner=' + localStorage.getItem('partnerID'));
              // setUrlParams(currentLink, localStorage.getItem('partnerID'));
              // setPartnerUrl(currentLink.href);
            }
          }
        }, 300);
      }
    } else {
      setPartnerUrl(null);
    }
  }, []);

  return (
    <ButtonWrapper
      customFontsize={props.customFontsize}
      center={props.center}
      inline={props.inline}
      ref={ref}
      usesTrustpilot={props.usesTrustpilot}>
      <a
        rel="noreferrer"
        href={partnerUrl !== null ? partnerUrl : props.href}
        target={props.external ? '_blank' : null}>
        <ButtonStyle {...props} href={null}>
          <ContentWrap width={props.width} kind={props.kind}>
            {props.children}
          </ContentWrap>
        </ButtonStyle>
      </a>
      {props.usesTrustpilot && <Trustpilot />}
    </ButtonWrapper>
  );
});

Button.displayName = 'Button';
export default Button;
