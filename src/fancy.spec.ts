// Test Utilities:
import * as chai from 'chai';
import * as dedent from 'dedent';
import * as sinon from 'sinon';
import * as sinonChai from 'sinon-chai';

// Test setup:
chai.use(sinonChai);
let { expect } = chai;

// Under test:
import { fancy } from '../src';

describe('fancy:', () => {
    describe('fancy - structure - headers:', () => {
        it('should handle basic headers', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                # FOO
                ## BAR
                ### BAZ
                #### BOP
            `));

            expect(log).to.have.been.calledWith(dedent(`
                %cFOO
                %cBAR
                %cBAZ
                %cBOP
            `));

            log.restore();
        });

        it('should handle interpolated headers', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                # {{ foo }}
                ## {{ bar }}
                ### {{ bar }}
                #### {{ baz }}
            `), null, { foo: 'FOO', bar: 'BAR', baz: 'BAZ' });

            expect(log).to.have.been.calledWith(dedent(`
                %cFOO
                %cBAR
                %cBAR
                %cBAZ
            `));

            log.restore();
        });
    });

    describe('fancy - structure - content:', () => {
        it('should handle plain content', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                FOO
                BAR
                BAZ
                BOP
            `));

            expect(log).to.have.been.calledWith(dedent(`
                %cFOO
                %cBAR
                %cBAZ
                %cBOP
            `));

            log.restore();
        });

        it('should handle interpolated content', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                {{ foo }}
                {{ bar }}
                {{ bar }}
                {{ baz }}
            `), null, { foo: 'FOO', bar: 'BAR', baz: 'BAZ' });

            expect(log).to.have.been.calledWith(dedent(`
                %cFOO
                %cBAR
                %cBAR
                %cBAZ
            `));

            log.restore();
        });
    });

    describe('fancy - structure - images:', () => {
        it('should handle images', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                [https://some-url.com/image.jpg]
            `));

            expect(log).to.have.been.calledWith(dedent(`
                %c%c   %c
            `), dedent(`
                background-color: white;
                color: black;
                padding: 6px 0;
                font-family: monospace;
                font-size: 12px;
                font-weight: 100;
            `), dedent(`
                background-color: white;
                background-image: url(https://some-url.com/image.jpg);
                background-size: cover;
                background-repeat: no-repeat;
                color: black;
                padding: 6px 0;
                font-family: monospace;
                font-size: 12px;
                font-weight: 100;
            `));

            log.restore();
        });
    });

    describe('fancy - formatting - text', () => {
        it('should render default text', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                TEXT
            `));

            expect(log).to.have.been.calledWith(dedent(`
                %cTEXT
            `), dedent(`
                background-color: white;
                color: black;
                padding: 6px 0;
                font-family: monospace;
                font-size: 12px;
                font-weight: 100;
            `));

            log.restore();
        });

        it('should render default text with custom values', () => {
            const log = sinon.spy(console, 'log');

            fancy(dedent(`
                TEXT
            `), {
                text: {
                    backgroundColor: 'blue',
                    color: 'white',
                    fontSize: 10,
                    fontWeight: 200,
                    padding: 10
                }
            });

            expect(log).to.have.been.calledWith(dedent(`
                %cTEXT
            `), dedent(`
                background-color: blue;
                color: white;
                padding: 10px 0;
                font-family: monospace;
                font-size: 10px;
                font-weight: 200;
            `));

            log.restore();
        });
    });
});
