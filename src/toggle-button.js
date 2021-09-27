import Ui from 'kenga/utils';
import ValueChangeEvent from 'kenga/events/value-change-event';
import Button from './button';

class ToggleButton extends Button {
    constructor(text, icon, selected, iconTextGap, onAction) {
        if (arguments.length < 4)
            iconTextGap = 4;
        if (arguments.length < 3)
            selected = false;
        if (arguments.length < 2)
            icon = null;
        if (arguments.length < 1)
            text = '';
        super(text, icon, iconTextGap, onAction);
        const self = this;

        function applySelected() {
            if (selected) {
                self.element.classList.add('p-toggle-selected');
            } else {
                self.element.classList.remove('p-toggle-selected');
            }
        }

        Object.defineProperty(this, 'selected', {
            get: function() {
                return selected;
            },
            set: function(aValue) {
                if (selected !== aValue) {
                    const oldValue = selected;
                    selected = aValue;
                    applySelected();
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
                Ui.later(() => {
                    h(event);
                });
            });
        }

        this.addActionHandler(() => {
            self.selected = !self.selected;
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

export default ToggleButton;
