import { fileToHTMLImageElement, urlToHTMLImageElement } from './adapter';
import { getCanvas } from './canvas';

interface CompressOption {
    /** the output image quality, min 0, max 1, default is 0.9 */
    quality: number;
    /** the output image width, default is input image width. if height is set, but not width, it should be automatic calculation by origin image aspect ratio */
    width: number;
    /** the output image height, default is input image height. if width is set, but not height, is should be automatic calculation by origin image aspect ratio */
    height: number;
    /** the output image extension, default is jpeg */
    mime: string;
}

const defaultOption: Partial<CompressOption> = {
    quality: 0.9,
    mime: 'jpeg',
};

/**
 *  compress image from File、 HTMLImageElement or remote Url
 */
export async function compress(
    file: File | HTMLImageElement | string,
    option: Partial<CompressOption> = {}
): Promise<Blob> {
    let img: HTMLImageElement;

    if (file instanceof HTMLImageElement) {
        img = file;
    } else if (file instanceof File) {
        img = await fileToHTMLImageElement(file);
    } else {
        img = await urlToHTMLImageElement(file);
    }

    if (option.width && option.height == undefined) {
        option.height = (option.width * img.height) / img.width;
    }
    if (option.height && option.width == undefined) {
        option.width = (img.width / img.height) * option.height;
    }

    const opt: Partial<CompressOption> = { ...defaultOption, width: img.width, height: img.height, ...option };
    const [canvas, ctx] = getCanvas(opt.width!, opt.height!);

    return new Promise((resolve, reject) => {
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
        canvas.toBlob(
            blob => {
                if (blob) {
                    resolve(blob);
                } else {
                    reject();
                }
            },
            `image/${opt.mime}`,
            opt.quality
        );
    });
}

export default compress;
