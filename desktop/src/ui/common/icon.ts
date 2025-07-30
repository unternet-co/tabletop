import { html, css, LitElement } from 'lit';
import { customElement, property } from 'lit/decorators.js';
import { createElement, Home } from 'lucide';

export const icons = {
  home: Home,
} as const;

export type IconName = keyof typeof icons;

export interface IconOptions {
  width: number;
  height: number;
}

export function icon(name: IconName | string, opts?: IconOptions) {
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
  svg.classList.add('icon');

  return svg;
}

// @customElement('un-icon')
// export class IconElement extends LitElement {
//   @property({ type: String })
//   icon: IconName | null = null;

//   @property({ type: String })
//   size: string = '12px';

//   @property({ type: Boolean })
//   spin: boolean = false;

//   render() {
//     const iconRenderer = icon(this.icon || 'help');
//     const size = sizeMap[this.size || 'medium'];

//     // Use the icon renderer with size overrides
//     const svgElement = iconRenderer({
//       width: size,
//       height: size,
//     });

//     const spinClass = this.spin ? 'spin' : '';

//     return html`
//       <span class="container ${spinClass}" part="container">
//         ${svgElement}
//       </span>
//     `;
//   }

//   static get styles() {
//     return css`
//       :host {
//         display: inline-block;
//         width: min-content;
//         color: inherit;
//       }

//       .container svg {
//         display: block;
//       }

//       .spin svg {
//         --spin-duration: 3s;
//         animation: spin var(--spin-duration) linear infinite;
//       }

//       @keyframes spin {
//         0% {
//           transform: rotate(0deg);
//         }
//         100% {
//           transform: rotate(360deg);
//         }
//       }
//     `;
//   }
// }
