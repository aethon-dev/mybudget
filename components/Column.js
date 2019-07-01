const template = document.createElement('template');

template.innerHTML = `
    <style>
    :host {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
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
        this.columnHeader.innerHTML = 'columnHeader';
        this.columnContent.innerHTML = 'columnContent';
    }
}

window.customElements.define('app-column', Column);