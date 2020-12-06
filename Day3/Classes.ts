
export class Geology {

    Topology: number[][];

    constructor(Definer: String) {
        this.Topology = new Array;

        let rows = Definer.split("\r\n");
        rows.forEach(row => {
            this.Topology.push((row.trim().split("")).map(this.convertCharToInt));
        })

    }
   
    private convertCharToInt(c: string): number {
        if (c == "#") {
            return 1;
        } else {
            return 0;
        }
    }

    public TrySlope(moveX: number, moveY: number) {

        let currentX: number = 0;
        let hitTrees: number = 0;
        let Xwidth: number = this.Topology[0].length;
        
        for (var currentY = 0; currentY < this.Topology.length; currentY += moveY) {
            hitTrees += this.Topology[currentY][currentX ];
            currentX = (currentX + moveX) % Xwidth ;
        }
        return hitTrees;
    }
}
