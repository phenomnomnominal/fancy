export type FancyData = Record<string, string>;

export type FancyChunk = {
    content: (data: FancyData) => string;
    isBlock?: boolean;
    styles: (data: FancyData) => FancyStyles;
};

export type FancyOptions = {
    size?: [number, number, number, number, number, number],
    weight?: [number, number, number, number, number, number],
    text?: FancyStyles;
    h1?: FancyStyles,
    h2?: FancyStyles,
    h3?: FancyStyles,
    h4?: FancyStyles,
    h5?: FancyStyles,
    h6?: FancyStyles,
    image?: FancyStyles
};

export type FancyStyles = {
    backgroundColor?: string;
    backgroundImage?: string;
    color?: string;
    fontSize?: number;
    fontWeight?: number;
    padding?: number;
};
