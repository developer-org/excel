import {capitalize} from '@core/utils'

export class DomListener {
    constructor($root, listeners = []) { // Получает массив слушателей если они есть
        if (!$root) {
            throw new Error(`No $root provided for DomListener`)
        }
        this.$root = $root
        this.listeners = listeners
    }

    // Добавление слушателей
    initDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            if (!this[method]) {
                throw new Error(`Method ${method} is not implemented in ${this.name || ''} Component`)
            }
            this[method] = this[method].bind(this)
            this.$root.on(listener, this[method])
        })
    }

    // Удаление слушателей
    removeDomListeners() {
        this.listeners.forEach(listener => {
            const method = getMethodName(listener)
            this.$root.off(listener, this[method])
        })
    }
}

// Приведение вида input => onInput
function getMethodName(eventName) {
    return 'on' + capitalize(eventName)
}