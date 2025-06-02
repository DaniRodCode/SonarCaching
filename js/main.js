import { AppRoot } from './components/AppRoot.js';

customElements.define('app-root', AppRoot);

window.addEventListener('DOMContentLoaded', () => {
  AppRoot.iniciar();
});