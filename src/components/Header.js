const template = document.createElement('template');

template.innerHTML = `
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
        box-shadow: 0 5px 7px rgba(0, 0, 0, 0.15);
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

class Header extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.titleEl = this._shadowRoot.querySelector('.header-title');
        this.searchBarEl = this._shadowRoot.querySelector('.search-bar');

        this.searchBarEl.addEventListener('keyup', (event) => {
            this.dispatchEvent(new CustomEvent('onSearch', { detail: { searchTerm: this.searchBarEl.value }, composed: true, bubbles: true }));
            console.log(this.searchBarEl.value);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const placeholder = this._type && this._type === "users" ? 'Search by user name' : 'Search by debt description';
        this.searchBarEl.setAttribute('placeholder', placeholder);
        this.titleEl.innerHTML = this._title;
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

window.customElements.define('col-header', Header);