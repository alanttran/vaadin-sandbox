export function registerShadowStyle(themeFor, id, styleString) {
  const themeModuleElement = document.createElement('dom-module');
  if (themeFor) {
    const elementClass =
      window.customElements && window.customElements.get(themeFor);
    if (elementClass && elementClass.hasOwnProperty('__finalized')) {
      console.warn(`The custom element definition for ${themeFor} was finalized before a style module was registered.
              Make sure to add component specific style modules before
              importing the corresponding custom element.`);
      alert('theme servlet warn');
    }
    themeModuleElement.setAttribute('theme-for', themeFor);
  }
  themeModuleElement.innerHTML = `
            <template>
              <style>
              ${styleString}     
                   
              </style>
            </template>
          `;
  themeModuleElement.register(id);
  console.log('registered shadow style ' + id + ' for ' + themeFor);
  document.body.appendChild(themeModuleElement);
}
