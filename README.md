# Kenga buttons
Kenga buttons. Simple and specific i.e. drop down button.
This package contains radio button and chackbox widgets.

## Install
To install `kenga-buttons` package to your project, type the following command:
`npm install kenga-buttons --save`

## Using
The simple way to use a `Button` is to write something like `const b = new Button('Click me!'); b.onAction = () => { ... }`
The label holds property 'icon', which can be assigned to any DOM element (typically 'IMG').

## Architecture
All buttons inside this package are descendants of `ImageParagraph` widgets from 'kenga-labels' package.

They all have 'onAction' event handler with is fired when user clicks on the button, or hits `return` or `space` key.

Besides ordinary buttons, this package contains `DropDownButton` widgets, which has an extra clickable section with drop down menu.

`RadioButton`, `ToggleButton` and `CheckBox` widgets support grouping and hold property `buttonGroup`.
Also, `RadioButton`, `ToggleButton` and `CheckBox` widgets support `value` property of boolean type and fire value change events.

