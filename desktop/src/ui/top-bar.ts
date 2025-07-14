import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import './top-bar.css';

@customElement('top-bar')
export class TopBar extends LitElement {
  renderRoot = this;
}