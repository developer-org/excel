import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, option = {}) {
        super($root, option.listeners) // Наследуем конструктор родителя DomListener
        this.name = option.name || ''
    }

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Добавление слушателей для каждого компонента Formula, Table...
    init() {
        this.initDomListeners()
    }

    destroy() {
        this.removeDomListeners()
    }
}