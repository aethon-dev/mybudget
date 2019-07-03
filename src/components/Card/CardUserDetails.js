import BaseComponent from '../BaseComponent.js';
import constants from '../../constants.js';

const template = `
    <style>
        :host {
            display: flex;
            flex-direction: row;
            justify-content: center;
            line-height: 1.45em;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 4px;
        }

        .picture {
            width: 32%;
            height: auto;
            margin: 2%;
        }

        .details {
            width: 66%;
            height: 100%;
            margin: 2%;
            overflow: auto;
        }

        .key {
            font-weight: bold;
        }

        .value {
            color: ${constants.colors.textEnhansed};
        }
    </style>

    <div class="picture">
        <img>
    </div>
    <div class="details">
        <h2 class="name"></h2>
        <span class="key">Age: </span><span class="value age"></span></br>
        <span class="key">Phone: </span><span class="value phone"></span></br>
        <span class="key">Address: </span><span class="value address"></span></br>
        <span class="key">Category: </span><span class="value category"></span></br>
    </div>
`;

class CardUserDetails extends BaseComponent {
    constructor() {
        super(template);

        this._imgEl = this._shadowRoot.querySelector('img');
        this._nameEl = this._shadowRoot.querySelector('.name');
        this._ageEl = this._shadowRoot.querySelector('.age');
        this._phoneEl = this._shadowRoot.querySelector('.phone');
        this._addressEl = this._shadowRoot.querySelector('.address');
        this._categoryEl = this._shadowRoot.querySelector('.category');
    }

    render() {
        this._imgEl.src = this._img;
        this._imgEl.alt = this._name;
        this._nameEl.innerHTML = this._name;
        this._ageEl.innerHTML = this._age;
        this._phoneEl.innerHTML = this._phone;
        this._addressEl.innerHTML = this._address;
        this._categoryEl.innerHTML = this._category;
    }

    static get observedAttributes() {
        return ['img', 'name', 'age', 'phone', 'address', 'category'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'img':
                this._img = newValue;
                break;

            case 'name':
                this._name = newValue;
                break;

            case 'age':
                this._age = newValue;
                break;

            case 'phone':
                this._phone = newValue;
                break;

            case 'address':
                this._address = newValue;
                break;

            case 'category':
                this._category = newValue;
                break;
        }
    }
}

window.customElements.define('mb-user-detail', CardUserDetails);