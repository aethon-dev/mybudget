import './components/Column.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .container {
        display: flex;
        flex-direction: row;
        justify-content: center;
        height: 100vh;
    }
    </style>

    <div class="container"></div>
`;

class MyBudgetApp extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        // Cloning the template is more efficient than running createElement everytime an element is constructed
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.container = this._shadowRoot.querySelector('.container');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const col1 = document.createElement('app-column');
        const col2 = document.createElement('app-column');

        this.container.appendChild(col1);
        this.container.appendChild(col2);
    }
}

window.customElements.define('my-budget-app', MyBudgetApp);