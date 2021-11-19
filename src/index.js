import '@vaadin/vaadin-themable-mixin/register-styles';
import { registerShadowStyle } from './registerShadowStyle';

// STEP 0 - import @illumina custom properties at global level
import './style.css';

// STEP 1 - import individual style overrides
import idsTextfieldCSS from '!!raw-loader!./vaadin-theme/components/vaadin-text-field.css';

// STEP 2 - register styles for vaadin components
registerShadowStyle('vaadin-text-field', 'ids-vdn-text-field', idsTextfieldCSS);

// STEP3 - require vaadin component imports after dom-modules are created
require('./vaadin-imports.js');
