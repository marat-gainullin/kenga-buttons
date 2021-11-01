import Ui from 'kenga/utils';
import Button from './button';

class DropDownButton extends Button {
    constructor(text, icon, iconTextGap, onAction) {
        if (arguments.length < 3)
            iconTextGap = '4px';
        if (arguments.length < 2)
            icon = null;
        if (arguments.length < 1)
            text = '';
        super(text, icon, iconTextGap, onAction);
        const self = this;

        const dropDown = document.createElement('div');
        dropDown.classList.add('p-dropdown-chevron');
        this.element.appendChild(dropDown);

        let dropDownMenu;
        let mouseDownReg;
        let mouseClickReg;
        Object.defineProperty(this, 'dropDownMenu', {
            get: function () {
                return dropDownMenu;
            },
            set: function (aValue) {
                if (dropDownMenu !== aValue) {
                    if (mouseDownReg) {
                        mouseDownReg.removeHandler();
                        mouseDownReg = null;
                    }
                    if (mouseClickReg) {
                        mouseClickReg.removeHandler();
                        mouseClickReg = null;
                    }
                    dropDownMenu = aValue;
                    if (dropDownMenu) {
                        mouseDownReg = Ui.on(dropDown, Ui.Events.MOUSEDOWN, evt => {
                            evt.stopPropagation();
                            dropDownMenu.popupRelativeTo(self.element, false);
                        }, false);
                        mouseClickReg = Ui.on(dropDown, Ui.Events.CLICK, evt => {
                            evt.stopPropagation();
                        }, false);
                    }
                }
            }
        });

        function showDropDownMenu() {
            Ui.startMenuSession(dropDownMenu);
            dropDownMenu.showRelativeTo(dropDown, false);
        }

        Object.defineProperty(this, 'showDropDownMenu', {
            get: function () {
                return showDropDownMenu;
            }
        });
    }
}

export default DropDownButton;