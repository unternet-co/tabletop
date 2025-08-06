import { createElement, Home, X } from 'lucide';
import { customElement, property } from 'lit/decorators.js';
import { css, html, LitElement, PropertyValues } from 'lit';

export const icons = {
  home: Home,
  close: X,
} as const;

export type IconName = keyof typeof icons;

export interface IconOptions {
  width?: number;
  height?: number;
}

function icon(name: IconName | string, opts?: IconOptions) {
  const icon = icons[name as IconName];

  const defaults = {
    stroke: 'currentColor',
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
    fill: 'none',
    width: '14',
    height: '14',
  };

  const svg = createElement(icon, { ...defaults, ...opts });

  return svg;
}

@customElement('un-icon')
export class IconElement extends LitElement {
  @property({ type: String })
  icon: IconName | null = null;

  @property({ type: Number })
  size: number = 14;

  @property({ type: Boolean })
  spin: boolean = false;

  updated(changedProps: PropertyValues) {
    if (changedProps.has('spin') && this.spin) {
      this.classList.add('spin');
    } else if (changedProps.has('spin') && !this.spin) {
      this.classList.remove('spin');
    }
  }

  render() {
    const svg = icon(this.icon, {
      width: this.size,
      height: this.size,
    });

    return svg;
  }

  static get styles() {
    return css`
      :host {
        display: inline-block;
        width: min-content;
        color: inherit;
      }

      svg {
        display: block;
      }

      .spin svg {
        --spin-duration: 3s;
        animation: spin var(--spin-duration) linear infinite;
      }
    `;
  }
}
