import { createGlobalStyle, DefaultTheme } from 'styled-components';

const primaryFont = `-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;`;

const typeScale = {
  header1: '1.8rem',
  header2: '1.6rem',
  header3: '1.4rem',
  header4: '1.2rem',
  header5: '1.1rem',
  header6: '1rem',
  paragraph: '1rem',
  smallParagraph: '0.92rem',
  helperText: '0.8rem',
  copyrightText: '0.7rem',
};

const darkerGray = {
  5: '#CED4DA',
  10: '#ADB5BD',
  50: '#6C757D',
  100: '#252525',
  200: '#202020',
  300: '#151515',
  hover: '#303030',
};

const bet365Text = {
  100: 'white',
  200: '#dddddd',
};

export const looksrareTheme: DefaultTheme = {
  background: {
    primary: '#121619',
    secondary: '#21262A',
    tertiary: '#343A3F',
    quaternary: '#353535',
    quinary: '#444444',
    senary: '#606060',
  },
  colors: {
    // primary: '#2de370',
    primary: '#08B2E3', // maybe
    // primary: '#FF6978', // maybe
    primaryHover: '#0BC355',
    green: '#2de370',
    pink: '#E54F6D',
    yellow: '#C7EF00',
  },
  hover: {
    primary: '#21262A',
    secondary: '#0BC355',
  },
  text: {
    primary: 'white',
    secondary: '#c7ccd1',
    tertiary: '#878D96',
  },
  border: {
    primary: 'rgb(77, 83, 88)',
  },
  font: {
    primary: primaryFont,
  },
  typeScale: typeScale,
};

export const blackTheme: DefaultTheme = {
  colors: {
    primary: '#5158BB',
    primaryHover: darkerGray.hover,
    secondary: '#EDF7F6',
    tertiary: '#47B5FF',
    gray: darkerGray,
    green: '#31D0AA',
    red: '#ED4B9E',
  },
  text: {
    primary: bet365Text[100],
    secondary: bet365Text[200],
  },
  font: {
    primary: primaryFont,
  },
  typeScale: typeScale,
};

export const GlobalStyle = createGlobalStyle`
  html,
  body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
      Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    box-sizing: border-box;
  }

  blockquote,
  dl,
  dd,
  h1,
  h2,
  h3,
  h4,
  h5,
  h6,
  figure,
  p,
  pre {
    margin: 0;
  }

  ol,
  ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }
`;
