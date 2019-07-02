import './UserDetails.js';
import './DebtDetails.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    .container {
        width: 80%;
        height: 200px;
        box-sizing: border-box;
        border: 1px solid;
        margin: 20px auto;
    }
    </style>

    <div class="container"></div>
`;

class Card extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.container = this._shadowRoot.querySelector('div');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.container.innerHTML = '';
        if (this._type == 'users') {
            const cardDetail = document.createElement('mb-user-detail');
            cardDetail.setAttribute('img', this._data.picture);
            cardDetail.setAttribute('name', this._data.firstName + ' ' + this._data.lastName);
            cardDetail.setAttribute('age', this._data.age);
            cardDetail.setAttribute('phone', this._data.phone);
            cardDetail.setAttribute('address', this._data.address);
            cardDetail.setAttribute('category', this._data.category);

            this.container.appendChild(cardDetail);
        }
        else if (this._type == 'debts') {
            const cardDetail = document.createElement('mb-debt-details');
            cardDetail.setAttribute('description', this._data.description);
            cardDetail.setAttribute('balance', this._data.balance);
            cardDetail.setAttribute('payment', this._data.payment);
            cardDetail.setAttribute('category', this._data.category);
            cardDetail.setAttribute('bank', this._data.bank);

            if (this._data.escalate && this.data.escalate.staff) {
                cardDetail.escalateList = this.data.escalate.staff;
            }

            this.container.appendChild(cardDetail);
        }

    }

    set data(data) {
        this._data = data;
    }

    get data() {
        return this._data;
    }

    static get observedAttributes() {
        return ['type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'type':
                this._type = newValue;
                break;

        }
    }
}

window.customElements.define('mb-card', Card);