import { html, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import './process-frame.css';
import { ProcessContainer } from '@unternet/kernel';

@customElement('process-frame')
export class ProcessFrame extends LitElement {
  @property({ attribute: false })
  process: ProcessContainer;

  render() {
    return this.process?.id;
  }
}