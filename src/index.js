class SADActionFeed extends HTMLElement {

    constructor() {
        super();

        this._url = null;
        this._cache = true;
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
        if (attrName === 'data-url') {
            if (newValue) {
                this._url = newValue;
            } else {
                this._url = null;
            }
        } else if (attrName === 'data-cache') {
            if (newValue) {
                this._cache = newValue === 'true';
            } else {
                this._cache = true;
            }
        }
    }

    connectedCallback() {
        const mountPoint = document.createElement('div');
        mountPoint.className = 'list-feed list-feed-solid';
        //this.attachShadow({ mode: 'open' }).appendChild(mountPoint);
        this.appendChild(mountPoint);

        this.loadData((data) => {
            data.result.forEach((element) => {
                this.makeItem(mountPoint, {
                    date: element.date,
                    text: element.text
                });
            });
        });
    }

    loadData(callback) {
        const data = new FormData();
        if (!this._cache) {
            data.append('cache', Math.random().toString());
        }

        const http = new XMLHttpRequest();
        http.open('POST', this._url);
        http.send(data);

        http.onreadystatechange = function() {
            if (this.readyState === 4 && this.status === 200) {
                callback(JSON.parse(http.responseText));
            }
        };
    }

    makeItem(parentElement, attributes) {
        const item = document.createElement('div');
        item.className = 'list-feed-item';

        const itemText = document.createElement('div');
        itemText.innerHTML = attributes.text;
        item.appendChild(itemText);

        const itemDate = document.createElement('div');
        itemDate.className = 'text-muted';
        itemDate.innerHTML = attributes.date;
        item.appendChild(itemDate);

        parentElement.appendChild(item);
    }
}

SADActionFeed.observedAttributes = ['data-url', 'data-cache'];

customElements.define('sa-action-feed', SADActionFeed);

