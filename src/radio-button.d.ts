import Widget from 'kenga/widget'
import ValueChangeEvent from 'kenga/events/value-change-event'
import Utils from 'kenga/utils'
import HasValue from 'kenga/has-value'

export default class RadioButton extends Widget implements HasValue {
  text: string
  /**
   * Horizontal position of the text relative to the icon.
   */
  horizontalTextPosition: Utils.HorizontalPosition
  selected: boolean
  value: boolean
  buttonGroup: Widget
  addValueChangeHandler: (handler: (evt: ValueChangeEvent) => void) => { removeHandler: () => void }
  fireValueChanged(): void
}
