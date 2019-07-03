import BaseComponent from '../BaseComponent.js';
import './UserDetails.js';
import './DebtDetails.js';

const template = `
    <style>
    .container {
        max-height: 200px;
        max-width: 520px;
        border: solid thin #dbdbdb;
        border-radius: 4px;
        margin: 20px auto;
        box-shadow: 0 4px 6px rgba(0, 0, 0, 0.15);
    }
    </style>

    <div class="container"></div>
`;

class Card extends BaseComponent {
    constructor() {
        super(template);

        this._containerEl = this._shadowRoot.querySelector('div');
    }

    render() {
        this._containerEl.innerHTML = '';
        if (this._type == 'users') {
            const cardDetail = document.createElement('mb-user-detail');
            cardDetail.setAttribute('img', this._data.picture);
            cardDetail.setAttribute('name', this._data.firstName + ' ' + this._data.lastName);
            cardDetail.setAttribute('age', this._data.age);
            cardDetail.setAttribute('phone', this._data.phone);
            cardDetail.setAttribute('address', this._data.address);
            cardDetail.setAttribute('category', this._data.category);

            this._containerEl.appendChild(cardDetail);
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

            this._containerEl.appendChild(cardDetail);
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