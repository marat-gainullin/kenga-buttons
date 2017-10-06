import RadioButton from './radio-button';

class CheckBox extends RadioButton {
    constructor(text, selected, onActionPerformed) {
        if (arguments.length < 2)
            selected = false;
        if (arguments.length < 1)
            text = '';
        super(text, selected, onActionPerformed);

        const box = this.element.firstElementChild;
        box.type = 'checkbox';
    }
}

export default CheckBox;
       