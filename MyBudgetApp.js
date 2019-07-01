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
        col1.setAttribute('title', 'Users In Debt');
        col1.setAttribute('type', 'users');
        col1.data = [
            {
                "_id": "5cd3a86eb20ead06b7b67a61",
                "picture": "https://www.w3schools.com/w3images/avatar6.png",
                "age": 28,
                "firstName": "Kendra",
                "lastName": "Atkinson",
                "phone": "+1 (918) 469-2907",
                "address": "678 Carroll Street, Leland, Mississippi, 8060",
                "category": "ModarateInDebt"
            },
            {
                "_id": "5cd3a86ecb35aed09c87d5d6",
                "picture": "https://www.w3schools.com/w3images/avatar2.png",
                "age": 24,
                "firstName": "Ballard",
                "lastName": "Douglas",
                "phone": "+1 (825) 424-2457",
                "address": "841 Cameron Court, Evergreen, Maryland, 3079",
                "category": "DebtFree"
            }
        ];
        this.container.appendChild(col1);

        const col2 = document.createElement('app-column');
        col2.setAttribute('title', 'Debts');
        col2.setAttribute('type', 'debts');
        col2.data = [
            {
                "_id": "5cd3a9c8063e9488f00ee74b",
                "balance": "$1,634.84",
                "payment": "$478.68",
                "bank": "KINETICA",
                "description": "Car Debt",
                "category": "CarLoan"
            },
            {
                "_id": "5cd3a9c808f3f4942051bb01",
                "balance": "$2,240.63",
                "payment": "$716.34",
                "bank": "ASSISTIX",
                "description": "Student Debt",
                "category": "StudentLoan"
            },
            {
                "_id": "5cd3a9c863167bc81b8acf88",
                "balance": "$3,839.27",
                "payment": "$633.46",
                "bank": "ISOSWITCH",
                "description": "Car Debt",
                "category": "CarLoan"
            }
        ];
        this.container.appendChild(col2);
    }
}

window.customElements.define('my-budget-app', MyBudgetApp);