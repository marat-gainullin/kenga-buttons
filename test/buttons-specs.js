/* global expect */
/* global NaN */
import '../src/layout.css';
import '../src/theme.css';

import Invoke from 'septima-utils/invoke';
import Logger from 'septima-utils/logger';
import Resource from 'septima-remote/resource';
import Ui from 'kenga/utils';
import Button from '../src/button';
import CheckBox from '../src/check-box';
import RadioButton from '../src/radio-button';
import ToggleButton from '../src/toggle-button';
import DropDownButton from '../src/drop-down-button';

describe('Buttons Api', () => {
    it('Button.Structure', done => {
        Resource.Icon.load('base/assets/binary-content.png')
                .then(icon => {
                    const btn1 = new Button();
                    expect(btn1.text).toBeFalsy();
                    expect(btn1.icon).toBeNull();
                    expect(btn1.iconTextGap).toEqual(4);
                    expect(btn1.actionPerformed).toBeFalsy();
                    const btn2 = new Button('sample');
                    expect(btn2.text).toEqual('sample');
                    expect(btn2.icon).toBeNull();
                    expect(btn2.iconTextGap).toEqual(4);
                    expect(btn2.actionPerformed).toBeFalsy();
                    const btn3 = new Button('sample', icon);
                    expect(btn3.text).toEqual('sample');
                    expect(btn3.icon).toEqual(icon);
                    expect(btn3.iconTextGap).toEqual(4);
                    expect(btn3.actionPerformed).toBeFalsy();
                    const btn4 = new Button('sample', icon, 6);
                    expect(btn4.text).toEqual('sample');
                    expect(btn4.icon).toEqual(icon);
                    expect(btn4.iconTextGap).toEqual(6);
                    expect(btn4.actionPerformed).toBeFalsy();
                    const action = () => {
                    };
                    const btn5 = new Button('sample', icon, 6, action);
                    expect(btn5.text).toEqual('sample');
                    expect(btn5.icon).toEqual(icon);
                    expect(btn5.iconTextGap).toEqual(6);
                    expect(btn5.onAction).toBe(action);
                    done();
                })
                .catch(done.fail);
    });
    it('Button.Markup.1', done => {
        const btn = new Button();
        document.body.appendChild(btn.element);
        btn.text = 'Sample button';
        expect(btn.iconTextGap).toEqual(4);
        Resource.Icon.load('base/assets/binary-content.png')
                .then(loaded => {
                    btn.icon = loaded;
                    // defaults
                    // right text
                    expect(btn.horizontalTextPosition).toEqual(Ui.HorizontalPosition.RIGHT);
                    expect(btn.verticalTextPosition).toEqual(Ui.VerticalPosition.CENTER);
                    ((() => {
                        const image = btn.element.firstElementChild;
                        const paragraph = btn.element.lastElementChild;
                        expect(image.offsetLeft).toEqual(6);
                        expect(paragraph.offsetLeft).toEqual(6 + 16 + 4);
                    })());
                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;
                    // left text
                    btn.horizontalTextPosition = Ui.HorizontalPosition.LEFT;
                    ((() => {
                        const image = btn.element.lastElementChild;
                        const paragraph = btn.element.firstElementChild;
                        expect(paragraph.offsetLeft).toEqual(6);
                        expect(image.offsetLeft).toEqual(6 + paragraph.offsetWidth + 4);
                    })());
                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;

                    // center text
                    btn.horizontalTextPosition = Ui.HorizontalPosition.CENTER;

                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    ((() => {
                        const image = btn.element.firstElementChild;
                        const paragraph = btn.element.lastElementChild;
                        expect(image.offsetTop).toEqual(1 + 0);
                        expect(paragraph.offsetTop).toEqual(1 + 16 + 4);
                    })());
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;
                    ((() => {
                        const image = btn.element.lastElementChild;
                        const paragraph = btn.element.firstElementChild;
                        expect(image.offsetTop).toBeGreaterThan(paragraph.offsetTop);
                    })());
                    // center center
                    btn.verticalTextPosition = Ui.VerticalPosition.CENTER;

                    btn.onAction = () => {
                        Logger.info('btn action');
                    };

                    document.body.removeChild(btn.element);
                    done();
                })
                .catch(done.fail);
    });
    it('Button.Markup.2', done => {
        const btn = new Button();
        document.body.appendChild(btn.element);
        expect(btn.iconTextGap).toEqual(4);
        Resource.Icon.load('base/assets/binary-content.png')
                .then(loaded => {
                    btn.icon = loaded;
                    // defaults
                    // right text
                    expect(btn.horizontalTextPosition).toEqual(Ui.HorizontalPosition.RIGHT);
                    expect(btn.verticalTextPosition).toEqual(Ui.VerticalPosition.CENTER);
                    ((() => {
                        const image = btn.element.firstElementChild;
                        const paragraph = btn.element.lastElementChild;
                        expect(image.offsetLeft).toEqual(6);
                        expect(paragraph.offsetLeft).toEqual(6 + 16 /*+ 4 gap is ignored without text or image*/);
                    })());
                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;
                    // left text
                    btn.horizontalTextPosition = Ui.HorizontalPosition.LEFT;
                    ((() => {
                        const image = btn.element.lastElementChild;
                        const paragraph = btn.element.firstElementChild;
                        expect(paragraph.offsetLeft).toEqual(6);
                        expect(image.offsetLeft).toEqual(6 + paragraph.offsetWidth /*+ 4 gap is ignored without text or image*/);
                    })());
                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;

                    // center text
                    btn.horizontalTextPosition = Ui.HorizontalPosition.CENTER;

                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    ((() => {
                        const image = btn.element.firstElementChild;
                        const paragraph = btn.element.lastElementChild;
                        expect(image.offsetTop).toEqual(1 + 0);
                        expect(paragraph.offsetTop).toEqual(1 + 16 /*+ 4 gap is ignored without text or image*/);
                    })());
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;
                    ((() => {
                        const image = btn.element.lastElementChild;
                        const paragraph = btn.element.firstElementChild;
                        expect(image.offsetTop).toEqual(paragraph.offsetTop);
                    })());
                    // center center
                    btn.verticalTextPosition = Ui.VerticalPosition.CENTER;

                    btn.onAction = () => {
                        Logger.info('btn action');
                    };

                    document.body.removeChild(btn.element);
                    done();
                })
                .catch(done.fail);
    });
    it('ToggleButton.Structure', done => {
        Resource.Icon.load('base/assets/binary-content.png')
                .then(icon => {
                    const btn1 = new ToggleButton();
                    expect(btn1.text).toBeFalsy();
                    expect(btn1.icon).toBeNull();
                    expect(btn1.selected).toBeFalsy();
                    expect(btn1.iconTextGap).toEqual(4);
                    expect(btn1.actionPerformed).toBeFalsy();
                    const btn2 = new ToggleButton('sample');
                    expect(btn2.text).toEqual('sample');
                    expect(btn2.icon).toBeNull();
                    expect(btn2.selected).toBeFalsy();
                    expect(btn2.iconTextGap).toEqual(4);
                    expect(btn2.actionPerformed).toBeFalsy();
                    const btn3 = new ToggleButton('sample', icon);
                    expect(btn3.text).toEqual('sample');
                    expect(btn3.icon).toEqual(icon);
                    expect(btn3.selected).toBeFalsy();
                    expect(btn3.iconTextGap).toEqual(4);
                    expect(btn3.actionPerformed).toBeFalsy();
                    const btn4 = new ToggleButton('sample', icon, true);
                    expect(btn4.text).toEqual('sample');
                    expect(btn4.icon).toEqual(icon);
                    expect(btn4.selected).toBeTruthy();
                    expect(btn4.iconTextGap).toEqual(4);
                    expect(btn4.actionPerformed).toBeFalsy();
                    const btn5 = new ToggleButton('sample', icon, true, 6);
                    expect(btn5.text).toEqual('sample');
                    expect(btn5.icon).toEqual(icon);
                    expect(btn5.selected).toBeTruthy();
                    expect(btn5.iconTextGap).toEqual(6);
                    expect(btn5.actionPerformed).toBeFalsy();
                    const action = () => {
                    };
                    const btn6 = new ToggleButton('sample', icon, true, 6, action);
                    expect(btn6.text).toEqual('sample');
                    expect(btn6.icon).toEqual(icon);
                    expect(btn6.selected).toBeTruthy();
                    expect(btn6.iconTextGap).toEqual(6);
                    expect(btn6.onAction).toBe(action);

                    btn1.onValueChange = event => {
                        expect(event.source).toEqual(btn1);
                        expect(event.target).toEqual(btn1);
                        expect(event.oldValue).toBeFalsy();
                        expect(event.newValue).toBeTruthy();
                    };

                    spyOn(btn1, 'onValueChange');

                    expect(btn1.value).toBeFalsy();
                    expect(btn1.selected).toBeFalsy();
                    btn1.value = true;
                    expect(btn1.value).toBeTruthy();
                    expect(btn1.selected).toBeTruthy();
                    return new Promise((resolve) => {
                        Invoke.later(() => {
                            expect(btn1.onValueChange).toHaveBeenCalled();
                            resolve();
                        });
                    });
                })
                .then(done)
                .catch(done.fail);
    });
    it('ToggleButton.Markup', done => {
        const toggle = new ToggleButton();
        document.body.appendChild(toggle.element);
        toggle.text = 'Sample toggle button';
        expect(toggle.iconTextGap).toEqual(4);
        Resource.Icon.load('base/assets/binary-content.png')
                .then(loaded => {
                    toggle.icon = loaded;
                    // defaults
                    // right text
                    expect(toggle.horizontalTextPosition).toEqual(Ui.HorizontalPosition.RIGHT);
                    expect(toggle.verticalTextPosition).toEqual(Ui.VerticalPosition.CENTER);
                    ((() => {
                        const image = toggle.element.firstElementChild;
                        const paragraph = toggle.element.lastElementChild;
                        expect(image.offsetLeft).toEqual(6);
                        expect(paragraph.offsetLeft).toEqual(6 + 16 + 4);
                    })());
                    // top and bottom
                    toggle.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    toggle.verticalTextPosition = Ui.VerticalPosition.TOP;
                    // left text
                    toggle.horizontalTextPosition = Ui.HorizontalPosition.LEFT;
                    ((() => {
                        const image = toggle.element.lastElementChild;
                        const paragraph = toggle.element.firstElementChild;
                        expect(paragraph.offsetLeft).toEqual(6);
                        expect(image.offsetLeft).toEqual(6 + paragraph.offsetWidth + 4);
                    })());
                    // top and bottom
                    toggle.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    toggle.verticalTextPosition = Ui.VerticalPosition.TOP;

                    // center text
                    toggle.horizontalTextPosition = Ui.HorizontalPosition.CENTER;

                    // top and bottom
                    toggle.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    ((() => {
                        const image = toggle.element.firstElementChild;
                        const paragraph = toggle.element.lastElementChild;
                        expect(image.offsetTop).toEqual(1 + 0);
                        expect(paragraph.offsetTop).toEqual(1 + 16 + 4);
                    })());
                    toggle.verticalTextPosition = Ui.VerticalPosition.TOP;
                    ((() => {
                        const image = toggle.element.lastElementChild;
                        const paragraph = toggle.element.firstElementChild;
                        expect(image.offsetTop).toBeGreaterThan(paragraph.offsetTop);
                    })());
                    // center center
                    toggle.verticalTextPosition = Ui.VerticalPosition.CENTER;

                    toggle.onAction = () => {
                        Logger.info('toggle action');
                    };

                    document.body.removeChild(toggle.element);
                    done();
                })
                .catch(done.fail);
    });
    it('DropdownButton.Structure', () => {
        const btn = new DropDownButton();
        expect(btn.dropDown).toBeFalsy();
        const menu = {};
        btn.dropDownMenu = menu;
        expect(btn.dropDownMenu).toEqual(menu);
    });
    it('DropdownButton.Markup', done => {
        const btn = new DropDownButton();
        document.body.appendChild(btn.element);
        btn.text = 'Sample drop down button';
        expect(btn.iconTextGap).toEqual(4);
        Resource.Icon.load('base/assets/binary-content.png')
                .then(loaded => {
                    btn.icon = loaded;
                    // defaults
                    // right text
                    expect(btn.horizontalTextPosition).toEqual(Ui.HorizontalPosition.RIGHT);
                    expect(btn.verticalTextPosition).toEqual(Ui.VerticalPosition.CENTER);
                    const image = btn.element.firstElementChild;
                    const paragraph = image.nextElementSibling;
                    ((() => {
                        expect(image.offsetLeft).toEqual(6);
                        expect(paragraph.offsetLeft).toEqual(6 + 16 + 4);
                    })());
                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;
                    // left text
                    btn.horizontalTextPosition = Ui.HorizontalPosition.LEFT;
                    ((() => {
                        expect(paragraph.offsetLeft).toEqual(6);
                        expect(image.offsetLeft).toEqual(6 + paragraph.offsetWidth + 4);
                    })());
                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;

                    // center text
                    btn.horizontalTextPosition = Ui.HorizontalPosition.CENTER;

                    // top and bottom
                    btn.verticalTextPosition = Ui.VerticalPosition.BOTTOM;
                    ((() => {
                        expect(image.offsetTop).toEqual(1 + 0);
                        expect(paragraph.offsetTop).toEqual(1 + 16 + 4);
                    })());
                    btn.verticalTextPosition = Ui.VerticalPosition.TOP;
                    ((() => {
                        expect(image.offsetTop).toBeGreaterThan(paragraph.offsetTop);
                    })());
                    // center center
                    btn.verticalTextPosition = Ui.VerticalPosition.CENTER;

                    btn.onAction = () => {
                        Logger.info('drop down action');
                    };

                    document.body.removeChild(btn.element);
                    done();
                })
                .catch(done.fail);
    });

    function expectCheckRadio(CheckRadio) {
        const check1 = new CheckRadio();
        expect(check1.text).toEqual('');
        expect(check1.selected).toBe(false);
        expect(check1.onAction).toBeFalsy();

        const check2 = new CheckRadio('Sample check box');
        expect(check2.text).toEqual('Sample check box');
        expect(check2.selected).toBe(false);
        expect(check2.onAction).toBeFalsy();

        check2.text = 'Sample check box 1';
        expect(check2.text).toEqual('Sample check box 1');
        check2.selected = true;
        expect(check2.selected).toBe(true);
        function action() {}

        check2.onAction = action;
        expect(check2.onAction).toBe(action);

        const check3 = new CheckRadio('Sample check box', true);
        expect(check3.text).toEqual('Sample check box');
        expect(check3.selected).toBe(true);
        expect(check3.onAction).toBeFalsy();

        const check4 = new CheckRadio('Sample check box', true, action);
        expect(check4.text).toEqual('Sample check box');
        expect(check4.selected).toBe(true);
        expect(check4.onAction).toBe(action);
    }

    it('Checkbox.Structure', done => {
        expectCheckRadio(CheckBox);
        done();
    });

    function expectCheckRadioMarkup(Logger, Ui, CheckRadio) {
        const check = new CheckRadio();
        document.body.appendChild(check.element);
        check.text = 'Sample check box';
        check.onAction = e => {
            Logger.info('Check action');
        };
        check.onValueChange = e => {
            Logger.info(`Check value: ${e.newValue}`);
        };
        expect(check.element.firstElementChild.tagName.toLowerCase()).toEqual('input');
        check.horizontalTextPosition = Ui.HorizontalPosition.LEFT;
        expect(check.element.lastElementChild.tagName.toLowerCase()).toEqual('input');
        document.body.removeChild(check.element);
    }

    it('Checkbox.Markup', () => {
        expectCheckRadioMarkup(Logger, Ui, CheckBox);
    });
    it('RadioButton.Structure', () => {
        expectCheckRadio(RadioButton);
    });
    it('RadioButton.Markup', () => {
        expectCheckRadioMarkup(Logger, Ui, RadioButton);
    });
});

export default {};