import {Dom} from "./dom";

interface DomListenerProps {
    root: HTMLElement | Dom
}

export class DomListener {
    private root: DomListenerProps;

    constructor(root: DomListenerProps) {
        if (!root) {
            throw new Error('No root provided')
        }
        this.root = root;
    }

}