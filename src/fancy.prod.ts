// Depedencies:
import { FancyData, FancyOptions } from './fancy-types';

export function fancy (layout: string, options?: FancyOptions, data: FancyData = {}): void {
    return template(layout, options)(data);
}

export function template (_: string, __: FancyOptions): (data: FancyData) => void {
    return (_: FancyData = {}) => { return; };
}
