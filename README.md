# @phenomnomnominal/fancy

[![npm version](https://img.shields.io/npm/v/@phenomnomnominal/fancy.svg)](https://img.shields.io/npm/v/@phenomnomnominal/fancy.svg)
[![Code Climate](https://codeclimate.com/github/phenomnomnominal/fancy/badges/gpa.svg)](https://codeclimate.com/github/phenomnomnominal/fancy)
[![Test Coverage](https://codeclimate.com/github/phenomnomnominal/fancy/coverage.svg)](https://codeclimate.com/github/phenomnomnominal/fancy/coverage)

## Installation

```zsh
npm install @phenomnomnominal/fancy --save-dev
```

## Fancy

**fancy** is a pretty dumb little library for making slightly more interesting console error messages.

You can do kind of Markdown-y things like this:

```typescript
fancy(`
    # Error:
    ## Error type:
    Oh no, this thing here happened
    [http://some.website/picture-of-a-cat.png]
`);
```

It works good as in Chrome, kinda in Safari, not really in Firefox, and I haven't looked at Edge 😎.

### Currently supported

* Headings: `#`, `##`, `###`, `####`, `#####`, `######`
* Plain text: `Just normal text`
* Images: `[URL]`

## API

### `fancy (layout: string, options?: FancyOptions, data: FancyData = {}): void`

`fancy` will parse and log a message!


```typescript
import { fancy } from '@phenomnomnominal/fancy';

fancy(`
    # Heading:
    ## Sub-heading
    Here is a message for you!
`);
```

### `template (layout: string, options: FancyOptions): (data: FancyData) => void`

`template` will parse a message and return a template which can then be reused with different data!

```typescript
import { template } from '@phenomnomnominal/fancy';

const message = template(`
    # {{ heading }}:
    ## {{ subheading }}
    {{ message }}
`);

message({ 
    heading: 'Heading',
    subheading: 'Sub-heading',
    message: 'Here is a message for you!'
});
```

### Style options

You can change how `fancy` renders your content! You can set styles for each of the different types of content, `h1`, `h2`, `h3`, `h4`, `h5`, `h6`, `text`. The following properties can be changed:

* `backgroundColor`: `string`
* `color`: `string`
* `fontSize`: `number`
* `fontWeight`: `number`
* `padding`: `number`

```typescript
fancy(`
    # HEADING 1
    ## HEADING 2
    TEXT
`, {
    h1: {
        backgroundColor: 'yellow',
        color: 'blue'
    },
    h2: {
        padding: 30
    },
    text: {
        fontSize: 20,
        fontWeight: 200
    }
})
```

You can also modify `fontSize`, and `fontWeight` of all the headings at once, based on the settings for text content:

```typescript
fancy(`
    # HEADING 1
    ## HEADING 2
    TEXT
`, {
    size: [10, 8, 6, 4, 3, 2], // Resulting sizes will be size[i] * text.fontSize
    weight: [9, 8, 7, 6, 5, 4] // Resulting sizes will be weight[i] * text.fontWeight
    text: {
        fontSize: 10,
        fontWeight: 100
    }
}
```

## Production mode

You probably don't want to ship all of `fancy` to production. If you're using webpack, you can use the production version:

```typescript
plugins: [
    new webpack.NormalModuleReplacementPlugin(/@phenomnomnominal\/fancy/, function (resource) {
        // resource.request = require.resolve('@phenomnomnominal/fancy').replace('index.js', 'index.prod.js');
    })
]
```
