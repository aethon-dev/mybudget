import './Header.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
        width: 100%;
    }

    .col-header {
        width: 100%;
        height: 20%;
        border: 1px solid;
    }

    .col-content {
        width: 100%;
        height: 80%;
        border: 1px solid;
    }

    </style>

    <div class="col-header"></div>
    <div class="col-content"></div>
`;

class Column extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.columnHeader = this._shadowRoot.querySelector('.col-header');
        this.columnContent = this._shadowRoot.querySelector('.col-content');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const header = document.createElement('col-header');
        header.setAttribute('title', this._title);
        this.columnHeader.appendChild(header);
        this.columnContent.innerHTML = 'columnContent';
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this._title = newValue;
                break;
        }
    }
}

window.customElements.define('app-column', Column);