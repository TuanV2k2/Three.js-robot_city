export const W = 'w'
export const A = 'a'
export const S = 's'
export const D = 'd'
export const A_1 = '1'
export const A_2 = '2'
export const A_3 = '3'
export const A_4 = '4'
export const SHIFT = 'shift'
export const ACTIONS = [A_1, A_2, A_3, A_4]
export const DIRECTIONS = [W, A, S, D]

export class KeyDisplay {

    map: Map<string, HTMLDivElement> = new Map()

    constructor() {
        const w: HTMLDivElement = document.createElement("div")
        const a: HTMLDivElement = document.createElement("div")
        const s: HTMLDivElement = document.createElement("div")
        const d: HTMLDivElement = document.createElement("div")
        const shift: HTMLDivElement = document.createElement("div")

        this.map.set(W, w)
        this.map.set(A, a)
        this.map.set(S, s)
        this.map.set(D, d)
        this.map.set(SHIFT, shift)

        this.map.forEach( (v, k) => {
            v.style.color = 'blue'
            v.style.fontSize = '50px'
            v.style.fontWeight = '800'
            v.style.position = 'absolute'
            v.textContent = k
        })

        this.updatePosition()

        this.map.forEach( (v, _) => {
            document.body.append(v)
        })
    }

    public updatePosition() {
        let element = this.map.get(W);
        if (element) element.style.top = `${window.innerHeight - 150}px`;

        element = this.map.get(A);
        if (element) element.style.top = `${window.innerHeight - 100}px`;

        element = this.map.get(S);
        if (element) element.style.top = `${window.innerHeight - 100}px`;

        element = this.map.get(D);
        if (element) element.style.top = `${window.innerHeight - 100}px`;

        element = this.map.get(SHIFT);
        if (element) element.style.top = `${window.innerHeight - 100}px`;

        element = this.map.get(W);
        if (element) element.style.left = `${300}px`;

        element = this.map.get(A);
        if (element) element.style.left = `${200}px`;

        element = this.map.get(S);
        if (element) element.style.left = `${300}px`;

        element = this.map.get(D);
        if (element) element.style.left = `${400}px`;

        element = this.map.get(SHIFT);
        if (element) element.style.left = `${50}px`;
    }

    public down (key: string) {
        if (this.map.get(key.toLowerCase())) {
            this.map.get(key.toLowerCase()).style.color = 'red'
        }
    }

    public up (key: string) {
        if (this.map.get(key.toLowerCase())) {
            this.map.get(key.toLowerCase()).style.color = 'blue'
        }
    }

}
