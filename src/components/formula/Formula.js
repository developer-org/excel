import {ExcelComponent} from '@core/ExcelComponent'

export class Formula extends ExcelComponent {
    static className = 'excel__formula'

    constructor($root) {
        super($root, { // Наследуем конструктор родителя ExcelComponent <- DomListener
            name: 'Formula',
            listeners: ['input', 'click'] // Массив слушателей
        })
    }

    toHTML() {
        return `
            <div class="info">fx</div>
            <div class="input" contenteditable spellcheck="false"></div>
        `
    }

    // Метод слушателя input
    onInput(event) {
        console.log('Formula: onInput', event.target.textContent.trim())
    }

    // Метод слушателя click
    onClick(event) {
        console.log('Formula: onClick', event.target.textContent.trim())
    }
}