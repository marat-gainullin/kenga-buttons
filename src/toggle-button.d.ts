import ValueChangeEvent from 'kenga/events/value-change-event'
import Widget from 'kenga/widget'
import HasValue from 'kenga/has-value'
import Button from './button'

export default class ToggleButton extends Button implements HasValue {
  selected: boolean
  value: boolean
  buttonGroup: Widget
  addValueChangeHandler: (handler: (evt: ValueChangeEvent) => void) => { removeHandler: () => void }
  fireValueChanged(oldValue: any): void
}
