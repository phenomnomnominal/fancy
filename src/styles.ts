// Dependencies:
import { FancyOptions, FancyStyles } from './fancy-types';

// Constants:
const HEADER_NAMES = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'];

export function getCSS (options: FancyStyles): string {
    return [
        `background-color: ${options.backgroundColor};`,
        options.backgroundImage ? `background-image: url(${options.backgroundImage});` : null,
        options.backgroundImage ? `background-size: cover;` : null,
        options.backgroundImage ? `background-repeat: no-repeat;` : null,
        `color: ${options.color};`,
        `padding: ${options.padding}px 0;`,
        `font-family: monospace;`,
        `font-size: ${options.fontSize}px;`,
        `font-weight: ${options.fontWeight};`
    ].filter(Boolean).join('\n');
}

export function getContentStyle (headerTokens: string, options: FancyOptions): FancyStyles {
    const type = headerTokens.length;
    return type > 0 && type < 7 ? header(options, type) : text(options);
}

export function getImageStyle (url: string, styles: FancyStyles, options: FancyOptions): FancyStyles {
    return {
        ...styles,
        ...options.image,
        backgroundImage: url
    };
}

function text (options: FancyOptions): FancyStyles {
    return {
        ...options.text
    };
}

function header (options: FancyOptions, length: number): FancyStyles {
    const index = length - 1;
    return {
        ...options.text,
        fontSize: options.text.fontSize * options.size[index],
        fontWeight: options.text.fontWeight * options.weight[index],
        ...options[HEADER_NAMES[index]]
    };
}
