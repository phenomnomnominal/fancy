// Depedencies:
import { getChunks } from './chunks';
import { FancyData, FancyOptions } from './fancy-types';
import { getOptions } from './options';
import { getCSS } from './styles';

export function fancy (layout: string, options?: FancyOptions, data: FancyData = {}): void {
    return template(layout, options)(data);
}

export function template (layout: string, options: FancyOptions): (data: FancyData) => void {
    options = getOptions(options);
    const chunks = getChunks(layout, options);
    return (data: FancyData = {}) => {
        const content = chunks.map(chunk => `%c${chunk.content(data)}${chunk.isBlock ? '\n' : ''}`);
        const css = chunks.map(chunk => getCSS(chunk.styles(data)));

        // tslint:disable:no-console
        console.log(content.join(''), ...css);
    };
}
