// Dependencies:
import { FancyOptions } from './fancy-types';

// Constants:
const DEFAULT_BACKGROUND_COLOR = 'white';
const DEFAULT_COLOR = 'black';
const DEFAULT_FONT_SIZE = 12;
const DEFAULT_FONT_WEIGHT = 100;
const DEFAULT_PADDING_SIZE = 6;

export function getOptions (options?: FancyOptions): FancyOptions {
    if (options == null) {
        options = {};
    }
    return {
        size: [4, 3, 2, 1.5, 1.25, 1.1],
        weight: [9, 7, 5, 3, 2, 1.5],
        ...options,
        text: {
            backgroundColor: DEFAULT_BACKGROUND_COLOR,
            color: DEFAULT_COLOR,
            fontSize: DEFAULT_FONT_SIZE,
            fontWeight: DEFAULT_FONT_WEIGHT,
            padding: DEFAULT_PADDING_SIZE,
            ...options.text
        }
    };
}
