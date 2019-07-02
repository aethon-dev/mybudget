import './Header.js';
import './Card/Card.js';

const template = document.createElement('template');
template.innerHTML = `
    <style>
    :host {
        width: 100%;
        height: 100%;
        overflow: hidden;
        background: #f5f5f5;
    }

    ::-webkit-scrollbar {
        width: 0px; 
        background: transparent;
    }

    .col-header {
        width: 100%;
        height: 20%;
        border-left: thin solid;
    }

    .col-content {
        width: 100%;
        height: 80%;
        border-left: thin solid;
        overflow-y: auto;
        scrollbar-width: none;
    }

    </style>

    <div class="col-header"></div>
    <div class="col-content"></div>
`;

class Column extends HTMLElement {
    constructor() {
        super();
        this._shadowRoot = this.attachShadow({ mode: 'open' });
        this._shadowRoot.appendChild(template.content.cloneNode(true));

        this.columnHeader = this._shadowRoot.querySelector('.col-header');
        this.columnContent = this._shadowRoot.querySelector('.col-content');

        this.columnHeader.addEventListener('onSearch', (event) => {
            this.filterData(event.detail.searchTerm);
        });
    }

    connectedCallback() {
        this.render();
    }

    render() {
        const header = document.createElement('col-header');
        header.setAttribute('title', this._title);
        header.setAttribute('type', this._type);
        this.columnHeader.appendChild(header);

        this.renderContentArea();
    }

    renderContentArea() {
        this.columnContent.innerHTML = '';
        if (this._filteredData && Array.isArray(this._filteredData)) {
            this._filteredData.forEach((data, index) => {
                const card = document.createElement('mb-card');
                card.setAttribute('type', this._type);
                card.data = data;
                this.columnContent.appendChild(card);
            });
        }
    }

    filterData(searchTerm) {
        console.log(searchTerm);
        const term = searchTerm.toLowerCase();
        if (term && term === "") {
            this._filteredData = this._data;
        }
        else {
            this._filteredData = this._data.filter(data => {
                const searchKey = this._type === "users" ? data.firstName + " " + data.lastName : data.description;
                return searchKey.toLowerCase().includes(term);
            });
        }
        this.renderContentArea();
    }

    set data(data) {
        this._data = data;
        this._filteredData = this._data;
        this.renderContentArea();
    }

    get data() {
        return this._data;
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

window.customElements.define('app-column', Column);