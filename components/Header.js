const template = document.createElement('template');

template.innerHTML = `
    <style>
    :host {
        display: block;
        font-family: Helvetica, sans-serif;
        text-align: center;
    }

    .search-bar {
        width: 80%;
        border-style: solid;
        border-radius: 20px;
        padding: 12px 15px;
        margin: 8px 0;
        box-sizing: border-box;
    }

    .search-bar:focus {
        outline-width: 0;
    }
    </style>

    <h1 class="header-title"></h1>
    <input class="search-bar" type="text" />
`;

class Header extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.titleEl = this._shadowRoot.querySelector('.header-title');
        this.searchBarEl = this._shadowRoot.querySelector('.search-bar');
    }

    connectedCallback() {
        this.render();
    }

    render() {
        this.titleEl.innerHTML = this._title;
    }

    static get observedAttributes() {
        return ['title'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'title':
                this._title = newValue;
                break;
        }
    }
}

window.customElements.define('col-header', Header);