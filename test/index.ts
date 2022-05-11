import compress from '../src';

const el = document.getElementById('file') as HTMLInputElement;
const img = document.getElementById('img') as HTMLImageElement;
const msg = document.getElementById('msg') as HTMLParagraphElement;
let url: string;

el.addEventListener('change', e => {
    const file: File = (e.target as any).files[0];
    if (!file) return;
    (e.target as any).value = '';

    compress(file).then(blob => {
        console.log({
            file,
            blob,
            originSize: file.size / 1024,
            compressSize: blob.size / 1024,
            percent: 1 - blob.size / file.size,
        });
        msg.innerHTML = `
            originSize: ${(file.size / 1024) | 0} kb <br/>
            compressedSize: ${(blob.size / 1024) | 0} kb<br/>
            compressedPercent: ${((1 - blob.size / file.size) * 100).toFixed(2)}%`;

        url && URL.revokeObjectURL(url);
        url = URL.createObjectURL(blob);
        img.src = url;
    });
});
