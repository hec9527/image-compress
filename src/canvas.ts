/**
 *  get HTMLCanvasElement by crateElement api
 */
export function getCanvas(width: number, height: number): [HTMLCanvasElement, CanvasRenderingContext2D] {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d') as CanvasRenderingContext2D;
    canvas.width = width;
    canvas.height = height;
    return [canvas, ctx];
}
