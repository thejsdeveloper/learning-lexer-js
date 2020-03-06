export class NodeVisitor {

    constructor() { }

    visit(node) {
        const methodName = `visit_${node.constructor.name}`;
        const visitor = typeof this[methodName] === 'function' ? this[methodName] : this.genericVisit();
        return visitor.call(this, node);
    }

    genericVisit() {
        return new Error(`NO visit_${node.constructor.name} method`);
    }
}