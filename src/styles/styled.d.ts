import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      text: string;
      textLight: string;
      white: string;
      black: string;
      background: string;
      hover: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    breakpoints: {
      mobile: string;
      tablet: string;
      desktop: string;
    };
    transitions: {
      default: string;
    };
    shadows: {
      small: string;
      medium: string;
      large: string;
    };
  }
}

export type Theme = DefaultTheme;

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
} 