
import * as fabric from 'fabric';
export default  class Cube { 
    constructor(props) {
        this.canvas = props.canvas;
        this.points = [];
        this.linePoints = [];
        this.cubeLines = [];
        this.cube;
    }
    initPoints(points) {
        this.points = points;
    }
    initLines() {
        this.linePoints = [
            [0, 1], [1, 2], [2, 3], [3, 0], // 前面
            [4, 5], [5, 6], [6, 7], [7, 4], // 后面
            [0, 4], [1, 5], [2, 6], [3, 7]  // 连接前后
        ];
    }
    getLines() {
        this.cubeLines = this.linePoints.map(([start, end]) => {
            return new fabric.Line([this.points[start].x, this.points[start].y, this.points[end].x, this.points[end].y], {
                stroke: 'black',
                strokeWidth: 2,
                selectable: false
            })
            
        })
    }
    drawCube() {
        this.initLines();
        this.getLines();
        this.cube = new fabric.Group(this.cubeLines, {
            left: 100,
            top: 100,
            angle: 0,
            selectable: false
        });
        this.cube.id = 'cube_group'
        this.canvas.add(this.cube);
    }
}
