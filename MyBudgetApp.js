import './src/components/Column.js';
import userData from './src/models/user.js';
import debtData from './src/models/debts.js';

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
        const usersColumn = document.createElement('app-column');
        usersColumn.setAttribute('title', 'Users In Debt');
        usersColumn.setAttribute('type', 'users');
        usersColumn.data = userData.users;
        this.container.appendChild(usersColumn);

        const debtsColumn = document.createElement('app-column');
        debtsColumn.setAttribute('title', 'Debts');
        debtsColumn.setAttribute('type', 'debts');
        debtsColumn.data = debtData.debts;
        this.container.appendChild(debtsColumn);
    }
}

window.customElements.define('my-budget-app', MyBudgetApp);