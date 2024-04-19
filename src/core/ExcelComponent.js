import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
    constructor($root, options = {}) {
        super($root, options.listeners) // Наследуем конструктор родителя DomListener
        this.name = options.name || ''
        this.emitter = options.emitter
        this.subscribe = options.subscribe || []
        this.store = options.store
        this.unsubscribers = []


        this.prepare()
    }

    // Настраиваем наш компонент до init
    prepare() {}

    // Возвращает шаблон компонента
    toHTML() {
        return ''
    }

    // Уведомляем слушателей про событие event
    $emit(event, ...args) {
        this.emitter.emit(event, ...args)
    }

    // Подписываемся на событие event
    $on(event, fn) {
        const unsub = this.emitter.subscribe(event, fn)
        this.unsubscribers.push(unsub)
    }

    $dispatch(action) {
        this.store.dispatch(action)
    }

    // Сюда приходят только те изменения в полях, на которые подписались
    storeChanged() {

    }

    isWatching(key) {
        return this.subscribe.includes(key)
    }

    // Инициализируем компонент
    // Добавление слушателей для каждого компонента Formula, Table...
    init() {
        this.initDomListeners()
    }

    // Удаляем компонент
    // Удаление слушателей для каждого компонента Formula, Table...
    destroy() {
        this.removeDomListeners()
        this.unsubscribers.forEach(unsub => unsub())
    }
}