import BaseComponent from "./BaseComponent.js";

const template = `
    <style>
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

    .search-icon {
        opacity: 0.6;
        position: absolute;
    }

    .search-icon img {
        position: relative;
        top: 20px;
        left: 15px;
    }
    </style>

    <h1 class="header-title"></h1>
    <span class="search-icon">
        <img 
            src="static/images/search-icon.svg" 
            alt="Search icon"
            height="14px"
            width="15px"
            z-index="100" />
    </span>
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