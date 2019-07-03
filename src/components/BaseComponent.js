class BaseComponent extends HTMLElement {
    constructor(template) {
        super();

        this.template = template;
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(this._template.content.cloneNode(true));
    }

    get template() {
        this._template;
    }

    set template(template) {
        if (template instanceof Element || template instanceof HTMLDocument) {
            this._template = template;
        }
        else if (typeof template === 'string' || template instanceof String) {
            const templateEl = document.createElement('template');
            templateEl.innerHTML = template;
            this._template = templateEl;
        }
        else throw Error('Template should be a string or a DOMElement');
    }

    connectedCallback() {
        this.render();
    }

    render() { }
}

export default BaseComponent;