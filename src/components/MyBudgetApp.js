import BaseComponent from './BaseComponent.js';
import './Column.js';
import userData from '../models/user.js';
import debtData from '../models/debts.js';

const template = `
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

class MyBudgetApp extends BaseComponent {
    constructor() {
        super(template);
        this._containerEl = this._shadowRoot.querySelector('.container');
    }

    render() {
        const usersColumnEl = document.createElement('mb-column');
        usersColumnEl.setAttribute('title', 'Users In Debt');
        usersColumnEl.setAttribute('type', 'users');
        usersColumnEl.data = userData.users;
        this._containerEl.appendChild(usersColumnEl);

        const debtsColumnEl = document.createElement('mb-column');
        debtsColumnEl.setAttribute('title', 'Debts');
        debtsColumnEl.setAttribute('type', 'debts');
        debtsColumnEl.data = debtData.debts;
        this._containerEl.appendChild(debtsColumnEl);
    }
}

window.customElements.define('mb-app', MyBudgetApp);