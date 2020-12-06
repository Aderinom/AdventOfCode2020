"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Geology = void 0;
class Geology {
    constructor(Definer) {
        this.Topology = new Array;
        let rows = Definer.split("\r\n");
        rows.forEach(row => {
            this.Topology.push((row.trim().split("")).map(this.convertCharToInt));
        });
    }
    convertCharToInt(c) {
        if (c == "#") {
            return 1;
        }
        else {
            return 0;
        }
    }
    TrySlope(moveX, moveY) {
        let currentX = 0;
        let hitTrees = 0;
        let Xwidth = this.Topology[0].length;
        for (var currentY = 0; currentY < this.Topology.length; currentY += moveY) {
            hitTrees += this.Topology[currentY][currentX];
            currentX = (currentX + moveX) % Xwidth;
        }
        return hitTrees;
    }
}
exports.Geology = Geology;
//# sourceMappingURL=Classes.js.map