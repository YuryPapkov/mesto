export default class Section {
    constructor({ items, renderer }, sectionSelector) {
            this._renderedItems = items;
            this._renderer = renderer;
            this._sectionSelector = sectionSelector;
            this._container = document.querySelector(sectionSelector);
        }
        //функция - отрисовщик секции
    renderItems() {
            this._renderedItems.forEach(item => {
                const element = this._renderer(item);
            });
        }
        //функция, которая добавляет DOM-элемент в контейнер
    insertItem(element) {
        this._container.append(element);
    }

}
