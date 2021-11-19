# Vaadin Sandbox

This project creates a blank project to import Vaadin web components and test it with Illumina styles.

## To run the project

`npm install`
`npm run dev`

## Proposed package structure

- components/
  - vaadin-button.css
  - vaadin-checkbox.css
  - ...
- Inter (web)/
- style.css (compiled)
  - ids-variables
  - Inter.css

## Vaadin override learnings

### 1. Import ids theme CSS variables at the global level

Basic import should be enough to package styles at the global level with the app. Make sure you have css-loader/style-loader.

```javascript
import '@illumina-design-system/tokens/ids-variables.css';
```

### 2. Vaadin themable mixin

In order to reliably override Vaadin web components - the style overrides will need to be packaged with the components themselves. To do so, individual stylesheets need to be imported in javascript & registered. Reference: [Vaadin Themable Mixin](https://github.com/vaadin/vaadin-themable-mixin).

The specific syntax below uses raw-loader just this instance because there is an existing css-loader/style-loader.

```javascript
import idsTextfieldCSS from '!!raw-loader!./vaadin-theme/text-field.css';
```

#### 3. Use the registerStyles function or variation of to package styles with the component.

Note: the blank project uses a slightly modified registerStyles function from Roel

```javascript
import '@vaadin/vaadin-themable-mixin/register-styles.js';
import { registerShadowStyle } from './registerShadowStyle';

registerShadowStyles(
  'vaadin-text-field',
  'ids-vdn-text-field',
  idsTextfieldCSS
);
```

### 4. Vaadin imports last

It's recommended to create a separate file with Vaadin component imports and synchronously require the file AFTER registeringStyles.

```javascript
require('./vaadin-imports.js');
```

### CSS :host Syntax

Since the styles will be packaged with the web components, the CSS syntax is as follows

```css
vaadin-component /*-->*/ :host
vaadin-component[attribute1][attribute2] /*-->*/ :host([attribute1][attribute2])
vaadin-component:not(something) /*-->*/ :host(:not(something))
vaadin-component::part(label) /*-->*/ [part='label']
vaadin-component:hover /*-->*/ :host(:hover)
```

## Vaadin complex components

This lists out complex components' API and subcomponents that may need their own individual stylesheets to be overriden properly.

- Vaadin Combobox
  - `vaadin-combo-box-dropdown`
  - `vaadin-combo-box-dropdown-wrapper`
  - `vaadin-combo-box-item`
  - `vaadin-combo-box-light`
  - `vaadin-combo-box-overlay`
  - Uses
    - `vaadin-text-field`
    - `vaadin-list-box`
- Vaadin Grid
  - `vaadin-grid-column`
  - `vaadin-grid-column-group`
  - `vaadin-grid-selection-column`
  - `vaadin-grid-cell-content` (might not have shadowDOM)
  - `vaadin-grid-filter-column`
  - `vaadin-grid-filter`
  - `vaadin-grid-sort-column`
  - `vaadin-grid-sorter`
  - `vaadin-grid-templatizer`
  - `vaadin-grid-tree-column`
  - `vaadin-grid-tree-toggle`
  - Uses
    - `vaadin-checkbox`
- Vaadin Notification
  - `vaadin-notification-card`
  - `vaadin-notification-container`
  - Uses
    - `vaadin-button` (optional)
- Vaadin Dialog
  - `vaadin-dialog-overlay`
  - Uses
    - `vaadin-button` (optional)
- Vaadin Menu Bar
  - `vaadin-menu-bar-button`
  - `vaadin-menu-bar-submenu`
