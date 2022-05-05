# image-compress

image-compress is a tool to compress image by HTMLCanvasElement and HTML5 Api

## Usage

### npm

```ts
import compress from 'image-compress';
const el = document.getElementById('file') as HTMLInputElement;

el.addEventListener('change', e => {
    const file: File = (e.target as any).files[0];
    if (!file) return;
    compress(file, { width: 1024 }).then(blob => {
        // upload blob or show blob localhost
    });
});
```

### umd

```html
<script src=""></script>
```

```js
const el = document.getElementById('file');

el.addEventListener('change', e => {
    const file: File = e.target.files[0];
    if (!file) return;
    compressImage(file, { width: 1024 }).then(blob => {
        // upload blob or show blob localhost
    });
});
```

## Arguments

compressImage function should receive two arguments

```js
compressImage(file, option);
```

### file

file is required, which should be `HTMLImageElement` or `File` object or `string` to load remote resource.

### option

option is optional

| attribute | type     | description                                                                                                                                              |
| --------- | -------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| quality   | `number` | the output image quality, min 0, max 1, default is 0.9                                                                                                   |
| width     | `number` | the output image width, default is input image width. if height is set, but not width, it should be automatic calculation by origin image aspect ratio   |
| height    | `number` | the output image height, default is input image height. if width is set, but not height, is should be automatic calculation by origin image aspect ratio |
| mime      | `string` | the output image extension, default is jpeg                                                                                                              |
