import {ExcelComponent} from '@core/ExcelComponent'
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root, options) {
        super($root, { // Наследуем конструктор родителя ExcelComponent <- DomListener
            name: 'Formula',
            listeners: ['input', 'keydown'], // Массив слушателей
            subscribe: ['currentText'],
            ...options
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div id="formula" class="input" contenteditable spellcheck="false"></div>
        `
    }

    init() {
        super.init()
        this.$formula = this.$root.find('#formula')

        this.$on('table:select', $cell => {
            this.$formula.text($cell.data.value)
        })
    }

    storeChanged({currentText}) {
        this.$formula.text(currentText)
    }

    // Метод слушателя input
    onInput(event) {
        this.$emit('formula:input', $(event.target).text())
    }

    onKeydown(event) {
        const keys = ['Enter', 'Tab']
        if (keys.includes(event.key)) {
            event.preventDefault()
            this.$emit('formula:done')
        }
    }
}