/**
 * #### file adapter
 * convert file object into HTMLImageElement
 */
export function fileToHTMLImageElement(file: File): Promise<HTMLImageElement> {
    const url = URL.createObjectURL(file);
    return urlToHTMLImageElement(url);
}

/**
 * #### file adapter
 * load image from url, return a promise which resolve a HTMLImageElement
 */
export function urlToHTMLImageElement(url: string): Promise<HTMLImageElement> {
    return new Promise((resolve, reject) => {
        const img = document.createElement('img');
        img.onload = () => resolve(img);
        img.onerror = () => reject();
        img.src = url;
    });
}
