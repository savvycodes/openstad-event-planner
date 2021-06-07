import 'goober';

declare module 'goober' {
  export interface DefaultTheme {
    primary: string;
    danger: string;
    sizes: {
      sm: number;
      md: number;
      lg: number;
    };
    font: {
      size: number;
      family: string;
    };
  }
}
