import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './date-widget';
import './home-screen.css';

@customElement('home-screen')
export class HomeScreen extends LitElement {
  renderRoot = this;

  render() {
    return html`<date-widget></date-widget>`;
  }
}