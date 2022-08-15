import Widget from 'kenga/widget';
import Button from './button';

export default class DropDownButton extends Button {
  dropDownMenu: Widget;
  showDropDownMenu: () => void;
}
