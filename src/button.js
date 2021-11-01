import Ui from 'kenga/utils';
import ImageParagraph from 'kenga-labels/image-paragraph';

class Button extends ImageParagraph {
    constructor(text, icon, iconTextGap, onAction) {
        if (arguments.length < 3)
            iconTextGap = '4px';
        if (arguments.length < 2)
            icon = null;
        if (arguments.length < 1)
            text = '';
        super(document.createElement('button'), text, icon, iconTextGap);
        const self = this;
        this.opaque = true;

        let actionHandlers = 0;
        let clickReg = null;
        const superAddActionHandler = this.addActionHandler;

        function addActionHandler(handler) {
            if (actionHandlers === 0) {
                clickReg = Ui.on(self.element, Ui.Events.CLICK, () => {
                    self.fireAction();
                });
            }
            actionHandlers++;
            let reg = superAddActionHandler(handler);
            return {
                removeHandler: function() {
                    if (reg) {
                        reg.removeHandler();
                        reg = null;
                        actionHandlers--;
                        if (actionHandlers === 0) {
                            clickReg.removeHandler();
                            clickReg = null;
                        }
                    }
                }
            };
        }
        Object.defineProperty(this, 'addActionHandler', {
            get: function() {
                return addActionHandler;
            }
        });
        this.onAction = onAction;
    }
}

export default Button;