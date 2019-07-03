import BaseComponent from '../BaseComponent.js';

const template = `
    <style>
        :host {
            display: flex;
            flex-direction: row;
            justify-content: center;
            line-height: 1.7em;

        }

        .escalate {
            width: 32%;
            height: auto;
            margin: 2% 6% 2% 2%;
            padding-top: 5%;
        }

        .hidden {
            visibility: hidden;
        }

        .details {
            width: 66%;
            height: auto;
            margin: 2% 2% 2% 6%;
        }

        .key {
            font-weight: bold;
            color: #2f364d;
        }

        .value {

        }

        .escalate button {
            margin-bottom: 10%;
            width: 100%;
            background-color: #db483d;
            border: none;
            border-radius: 4px;
            color: white;
            padding: 5px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            transition-duration: 0.4s;
        }

        .escalate button:hover {
            box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15),0 6px 8px rgba(0, 0, 0, 0.15);
        }

        .escalate ul {
            list-style-type: none;
            margin: 0;
            padding: 5%;
            text-align: left;
            border: solid thin;
        }
    </style>

    <div class="details">
        <h2 class="description"></h2>
        <span class="key">Balance: </span><span class="value balance"></span></br>
        <span class="key">Payment: </span><span class="value payment"></span></br>
        <span class="key">Category: </span><span class="value category"></span></br>
        <span class="key">Bank: </span><span class="value bank"></span></br>
    </div>
    <div class="escalate">
        <button>Escalate</button>
        <ul>
        </ul>
    </div>
`;

class CardDebtDetails extends BaseComponent {
    constructor() {
        super(template);

        this._descriptionEl = this._shadowRoot.querySelector('.description');
        this._balanceEl = this._shadowRoot.querySelector('.balance');
        this._paymentEl = this._shadowRoot.querySelector('.payment');
        this._categoryEl = this._shadowRoot.querySelector('.category');
        this._bankEl = this._shadowRoot.querySelector('.bank');
        this._escalateEl = this._shadowRoot.querySelector('.escalate');
        this._escalateListEl = this._shadowRoot.querySelector('ul');
    }

    render() {
        this._descriptionEl.innerHTML = this._description;
        this._balanceEl.innerHTML = this._balance;
        this._paymentEl.innerHTML = this._payment;
        this._categoryEl.innerHTML = this._category;
        this._bankEl.innerHTML = this._bank;

        if (this._escalateList) {
            this._escalateList.forEach(user => {
                const liEl = document.createElement('li');
                liEl.innerHTML = user;
                this._escalateListEl.appendChild(liEl);
            });
        }
        else {
            this._escalateEl.classList.add('hidden');
        }
    }

    get escalateList() {
        return this._escalateList;
    }

    set escalateList(list) {
        if (list && Array.isArray(list)) {
            this._escalateList = list;
        }
    }

    static get observedAttributes() {
        return ['description', 'balance', 'payment', 'category', 'bank'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'description':
                this._description = newValue;
                break;

            case 'balance':
                this._balance = newValue;
                break;

            case 'payment':
                this._payment = newValue;
                break;

            case 'category':
                this._category = newValue;
                break;

            case 'bank':
                this._bank = newValue;
                break;
        }
    }
}

window.customElements.define('mb-debt-details', CardDebtDetails);