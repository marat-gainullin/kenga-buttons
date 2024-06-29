import RadioButton from './radio-button';

class CheckBox extends RadioButton {
    constructor(text, selected, onAction) {
        if (arguments.length < 2)
            selected = false;
        if (arguments.length < 1)
            text = '';
        super(text, selected, onAction);

        this.box.type = 'checkbox';
    }
}

export default CheckBox;
       