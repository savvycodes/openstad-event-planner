import 'goober';

declare module 'goober' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      danger: string;
      white: string;
      black: string;
      background: string;
      lightGray: string;
      darkGray: string;
      darkestGray: string;
    };
    sizes: {
      sm: number;
      md: number;
      lg: number;
    };
    font: {
      size: number;
      family: string;
    };
    effects: {
      boxShadowPrimary: string;
    };
  }
}
