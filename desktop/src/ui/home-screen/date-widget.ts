import { html, css, LitElement } from 'lit';
import { customElement } from 'lit/decorators.js';

@customElement('date-widget')
export class DateWidget extends LitElement {
  private intervalId: number | null = null;

  connectedCallback() {
    super.connectedCallback();
    this.intervalId = window.setInterval(() => this.requestUpdate(), 1000);
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    window.clearInterval(this.intervalId);
  }

  render() {
    const now = new Date();

    const hour = now.toLocaleTimeString([], { hour: 'numeric' });
    const minute = now.getMinutes().toString().padStart(2, '0');

    const formattedDate = now.toLocaleDateString([], {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    });

    return html`
      <div class="time-container">
        <div class="time">${hour}<span class="colon">:</span>${minute}</div>
        <div class="date">${formattedDate}</div>
      </div>
    `;
  }

  static styles = css`
    :host {
      display: flex;
      flex-direction: column;
      text-align: center;
    }

    .time {
      font-size: 60px;
      color: var(--color-text-muted);
    }

    .date {
      font-size: 18px;
    }

    .colon {
      animation: pulse 2s ease-in-out infinite;
    }

    @keyframes pulse {
      0% { opacity: 1; }
      40% { opacity: 1; }
      50% { opacity: 0; }
      90% { opacity: 0; }
      100% { opacity: 1; }
    }
  `;
}