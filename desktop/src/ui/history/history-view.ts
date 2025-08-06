import { html, LitElement } from 'lit';
import './history-view.css';
import { customElement, state } from 'lit/decorators.js';
import { Message } from '../../types';
import { dependencies } from '../../common/dependencies';
import { MessageService } from '../../services/message-service';

@customElement('history-view')
export class HistoryView extends LitElement {
  renderRoot = this;
  messageService = dependencies.resolve<MessageService>('MessageService');

  constructor() {
    super();
    this.messageService.subscribe(() => this.requestUpdate());
  }

  render() {
    const msg = this.messageService.messages
      .filter(m => m.type === 'reply')
      .at(-1);

    if (msg) {
      return html`
        <div class="message" data-active>${msg.text}</div>
      `;
    }
  }
}