const template = document.createElement('template');
template.innerHTML = `
    <style>
        :host {
            display: flex;
            flex-direction: row;
            justify-content: center;
        }

        img {
            width: 100%;
            height: 100%;
            object-fit: cover;
        }

        .picture {
            width: 32%;
            height: auto;
            margin: 2%;
        }

        .details {
            width: 66%;
            height: auto;
            margin: 2%;
        }
    </style>

    <div class="picture">
        <img>
    </div>
    <div class="details">
        <h2 class="name"></h2>
        <span>Age: </span><span class="age"></span></br>
        <span>Phone: </span><span class="phone"></span></br>
        <span>Address: </span><span class="address"></span></br>
        <span>Category: </span><span class="category"></span></br>
    </div>
`;

class UserDetails extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.imgEl = this._shadowRoot.querySelector('img');
        this.nameEl = this._shadowRoot.querySelector('.name');
        this.ageEl = this._shadowRoot.querySelector('.age');
        this.phoneEl = this._shadowRoot.querySelector('.phone');
        this.addressEl = this._shadowRoot.querySelector('.address');
        this.categoryEl = this._shadowRoot.querySelector('.category');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.imgEl.src = this._img;
        this.imgEl.alt = this._name;
        this.nameEl.innerHTML = this._name;
        this.ageEl.innerHTML = this._age;
        this.phoneEl.innerHTML = this._phone;
        this.addressEl.innerHTML = this._address;
        this.categoryEl.innerHTML = this._category;
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

window.customElements.define('mb-user-detail', UserDetails);