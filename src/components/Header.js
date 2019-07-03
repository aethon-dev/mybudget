import BaseComponent from "./BaseComponent.js";

const template = `
    <style>
    @import url("https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css");

    :host {
        display: block;
        text-align: center;
    }

    .search-bar {
        width: 80%;
        border-style: none;
        border-radius: 20px;
        text-indent: 28px;
        padding: 12px 15px;
        margin: 8px 0;
        box-sizing: border-box;
        box-shadow: 0 6px 8px rgba(0, 0, 0, 0.15);
        transition: all 0.3s ease;
    }

    .search-bar:focus {
        outline-width: 0;
        box-shadow: 0 3px 4px rgba(0, 0, 0, 0.15);
    }

    i {
        font-family: "FontAwesome";
        font-style: normal;
        color: #707070;
        position: relative;
        margin-right: -35px;
    }
    </style>

    <h1 class="header-title"></h1>
    <i class="fas fa-search"></i>
    <input class="search-bar" type="text" />
`;

class Header extends BaseComponent {
    constructor() {
        super(template);

        this._titleEl = this._shadowRoot.querySelector('.header-title');
        this._searchBarEl = this._shadowRoot.querySelector('.search-bar');

        this._searchBarEl.addEventListener('keyup', (event) => {
            this.dispatchEvent(new CustomEvent('onSearch', { detail: { searchTerm: this._searchBarEl.value }, composed: true, bubbles: true }));
            console.log(this._searchBarEl.value);
        });
    }

    render() {
        const placeholder = this._type && this._type === "users" ? 'Search by user name' : 'Search by debt description';
        this._searchBarEl.setAttribute('placeholder', placeholder);
        this._titleEl.innerHTML = this._title;
    }

    static get observedAttributes() {
        return ['title', 'type'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this._title = newValue;
                break;

            case 'type':
                this._type = newValue;
                break;
        }
    }
}

window.customElements.define('mb-col-header', Header);