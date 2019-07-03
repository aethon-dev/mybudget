import BaseComponent from './BaseComponent.js';
import './Header.js';
import './Card/Card.js';

const template = `
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
        height: 18%;
        border-left: thin solid;
    }

    .col-content {
        width: 100%;
        height: 82%;
        border-left: thin solid;
        overflow-y: auto;
        scrollbar-width: none;
    }

    </style>

    <div class="col-header"></div>
    <div class="col-content"></div>
`;

class Column extends BaseComponent {
    constructor() {
        super(template);

        this._columnHeaderEl = this._shadowRoot.querySelector('.col-header');
        this._columnContentEl = this._shadowRoot.querySelector('.col-content');

        this._columnHeaderEl.addEventListener('onSearch', (event) => {
            this._filterData(event.detail.searchTerm);
        });
    }

    render() {
        const header = document.createElement('mb-col-header');
        header.setAttribute('title', this._title);
        header.setAttribute('type', this._type);
        this._columnHeaderEl.appendChild(header);

        this._renderContentArea();
    }

    _renderContentArea() {
        this._columnContentEl.innerHTML = '';
        if (this._filteredData && Array.isArray(this._filteredData)) {
            this._filteredData.forEach((data, index) => {
                const card = document.createElement('mb-card');
                card.setAttribute('type', this._type);
                card.data = data;
                this._columnContentEl.appendChild(card);
            });
        }
    }

    _filterData(searchTerm) {
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
        this._renderContentArea();
    }

    set data(data) {
        this._data = data;
        this._filteredData = this._data;
        this._renderContentArea();
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

window.customElements.define('mb-column', Column);