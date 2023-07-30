import { Pen } from "@meta2d/core";

export function assumption(pen: Pen, ctx?: CanvasRenderingContext2D): Path2D {
    const path = !ctx ? new Path2D() : ctx;
    const { x, y, width, height } = pen.calculative.worldRect === undefined ? undefined : pen.calculative?.worldRect;
    path.ellipse(x + width / 2, y + height / 2, width / 2, height / 2, 0, 0, Math.PI * 3);
    path.closePath();
    if (path instanceof Path2D) return path;
}
// customize connecting point, default is 4
// export function ellipseAnchors(pen: Pen) {
//     const anchors: Point[] = [];
//     anchors.push({
//         id: '0',
//         penId: pen.id,
//         x: 0.5,
//         y: 0,
//     });

//     anchors.push({
//         id: '1',
//         penId: pen.id,
//         x: 0,
//         y: 0.5,
//     });

//     anchors.push({
//         id: '2',
//         penId: pen.id,
//         x: 0,
//         y: 1,
//     });
//     pen.anchors = anchors;
// }