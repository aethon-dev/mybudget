const template = document.createElement('template');
template.innerHTML = `
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
            margin: 2%;
        }

        .hidden {
            visibility: hidden;
        }

        .details {
            width: 66%;
            height: auto;
            margin: 2%;
        }

        .key {
            font-weight: bold;
        }
    </style>

    <div class="details">
        <h2 class="description"></h2>
        <span class="key">Balance: </span><span class="balance"></span></br>
        <span class="key">Payment: </span><span class="payment"></span></br>
        <span class="key">Category: </span><span class="category"></span></br>
        <span class="key">Bank: </span><span class="bank"></span></br>
    </div>
    <div class="escalate">
        <button>Escalate</button>
        <ul>
        </ul>
    </div>
`;

class DebtDetails extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.descriptionEl = this._shadowRoot.querySelector('.description');
        this.balanceEl = this._shadowRoot.querySelector('.balance');
        this.paymentEl = this._shadowRoot.querySelector('.payment');
        this.categoryEl = this._shadowRoot.querySelector('.category');
        this.bankEl = this._shadowRoot.querySelector('.bank');
        this.escalateEl = this._shadowRoot.querySelector('.escalate');
        this.escalateListEl = this._shadowRoot.querySelector('ul');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.descriptionEl.innerHTML = this._description;
        this.balanceEl.innerHTML = this._balance;
        this.paymentEl.innerHTML = this._payment;
        this.categoryEl.innerHTML = this._category;
        this.bankEl.innerHTML = this._bank;

        if (this._escalateList && Array.isArray(this._escalateList)) {
            this._escalateList.forEach(user => {
                const liEl = document.createElement('li');
                liEl.innerHTML = user;
                this.escalateListEl.appendChild(liEl);
            });
        }
        else {
            this.escalateEl.classList.add('hidden');
        }
    }

    get escalateList() {
        return this._escalateList;
    }

    set escalateList(list) {
        this._escalateList = list;
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

window.customElements.define('mb-debt-details', DebtDetails);