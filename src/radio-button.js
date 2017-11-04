import Ui from 'kenga/utils';
import Widget from 'kenga/widget';
import ValueChangeEvent from 'kenga/events/value-change-event';
import Invoke from 'septima-utils/invoke';

class RadioButton extends Widget {
    constructor(text, selected, onAction) {
        if (arguments.length < 2)
            selected = false;
        if (arguments.length < 1)
            text = '';
        super(document.createElement('label'));
        const label = this.element;
        label.classList.add('p-boolean-widget');
        const box = document.createElement('input');
        box.type = 'radio';
        this.opaque = false;
        this.onAction = onAction;

        let horizontalTextPosition = Ui.HorizontalPosition.RIGHT;

        const self = this;

        function applyText() {
            label.innerText = text;
            label.appendChild(box);
        }

        function aplySelected() {
            if (selected === null) {
                box.indeterminate = true;
            } else {
                box.indeterminate = false;
                box.checked = !!selected;
            }
        }

        function applyPosition() {
            label.style.direction =
                horizontalTextPosition === Ui.HorizontalPosition.RIGHT || horizontalTextPosition === Ui.HorizontalPosition.CENTER ?
                'rtl' : 'ltr';
        }

        aplySelected();
        applyText();
        applyPosition();

        const clickReg = Ui.on(box, Ui.Events.CLICK, evt => {
            self.fireAction();
        });

        Object.defineProperty(this, 'text', {
            get: function() {
                return text;
            },
            set: function(aValue) {
                if (text !== aValue) {
                    text = aValue;
                    applyText();
                }
            }
        });

        /**
         * Horizontal position of the text relative to the icon.
         */
        Object.defineProperty(this, "horizontalTextPosition", {
            get: function() {
                return horizontalTextPosition;
            },
            set: function(aValue) {
                if (horizontalTextPosition !== aValue) {
                    horizontalTextPosition = aValue;
                    applyPosition();
                }
            }
        });

        Object.defineProperty(this, 'selected', {
            get: function() {
                return selected;
            },
            set: function(aValue) {
                if (selected !== aValue) {
                    const oldValue = selected;
                    selected = aValue;
                    aplySelected();
                    fireValueChanged(oldValue);
                }
            }
        });

        Object.defineProperty(this, 'value', {
            get: function() {
                return self.selected;
            },
            set: function(aValue) {
                self.selected = aValue;
            }
        });

        const valueChangeHandlers = new Set();

        function addValueChangeHandler(handler) {
            valueChangeHandlers.add(handler);
            return {
                removeHandler: function() {
                    valueChangeHandlers.delete(handler);
                }

            };
        }

        Object.defineProperty(this, 'addValueChangeHandler', {
            get: function() {
                return addValueChangeHandler;
            }
        });

        function fireValueChanged(oldValue) {
            const event = new ValueChangeEvent(self, oldValue, selected);
            valueChangeHandlers.forEach(h => {
                Invoke.later(() => {
                    h(event);
                });
            });
        }

        this.addActionHandler(() => {
            if (box.indeterminate) {
                self.value = null;
            } else {
                self.value = box.checked;
            }
        });

        let buttonGroup = null;

        Object.defineProperty(this, 'buttonGroup', {
            get: function() {
                return buttonGroup;
            },
            set: function(aValue) {
                const oldGroup = buttonGroup;
                buttonGroup = aValue;
                if (oldGroup)
                    oldGroup.remove(self);
                if (buttonGroup)
                    buttonGroup.add(self);
            }
        });
    }
}

export default RadioButton;
       