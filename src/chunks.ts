// Dependencies:
import { FancyChunk, FancyData, FancyOptions, FancyStyles } from './fancy-types';
import { getContentStyle, getImageStyle } from './styles';

// Constants:
const HEADER_TOKEN = '#';
const HEADER_REGEX = new RegExp(`^(${HEADER_TOKEN}*)\\\s?(.*)`);
const IMAGE_START_TOKEN = '[';
const IMAGE_END_TOKEN = ']';
const IMAGE_REGEX = new RegExp(`\\${IMAGE_START_TOKEN}(.*?)\\${IMAGE_END_TOKEN}`, 'g');
const INTERPOLATION_START_TOKEN = '{{';
const INTERPOLATION_END_TOKEN = '}}';
const INTERPOLATION_REGEX = new RegExp(`${INTERPOLATION_START_TOKEN}(.*?)${INTERPOLATION_END_TOKEN}`, 'g');

export function getChunks (layout: string, options: FancyOptions): Array<FancyChunk> {
    const chunks: Array<FancyChunk> = [];

    const lines = layout.split(/\n/);
    lines.forEach((line, index) => {
        const [, header, content] = line.trimLeft().match(HEADER_REGEX);
        const contentStyles = getContentStyle(header, options);
        const chunksFromLine = getChunksFromLine(contentStyles, content, options);
        const [lastChunk] = chunksFromLine.slice(0).reverse();
        lastChunk.isBlock = index !== lines.length - 1;
        chunks.push(...chunksFromLine);
    });
    return chunks;
}

function getChunksFromLine (styles: FancyStyles, content: string, options: FancyOptions): Array<FancyChunk> {
    const contentAndImageChunks = content.split(IMAGE_REGEX);
    return contentAndImageChunks.map((content, index) => isEven(index) ? getContentChunk(content, styles) : getImageChunk(content, styles, options));
}

function getImageChunk (content: string, styles: FancyStyles, options: FancyOptions): FancyChunk {
    return {
        content: () => '   ',
        styles: (data: FancyData) => getImageStyle(data[content.trim()] || content, styles, options)
    };
}

function getContentChunk (content: string, styles: FancyStyles): FancyChunk {
    const contentChunks = content.split(INTERPOLATION_REGEX);
    return {
        content: (data: FancyData) => contentChunks.map((chunk, index) => isEven(index) ? chunk : data[chunk.trim()]).join(''),
        styles: () => styles
    };
}

function isEven (num: number): boolean {
    return !(num % 2);
}
