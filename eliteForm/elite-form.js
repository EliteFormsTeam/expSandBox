import {LitElement, html} from 'lit';
import './elite-form-rules'

export class EliteForm extends LitElement {

  static properties = {
    type: {},
    label: {},
    placeholder: {},
    fieldId: {},
    validationRules: {},
    errors: {},
    errorBehavior: {},
    styles: {},
  }

  constructor() {
    super();
    this.type = '';
    this.label = '';
    this.placeholder = '';
    this.fieldId = '';
    this.value = '';
    this.validationRules = {};
    this.errors = '';
    this.errorBehavior = {};
    this.styles = {};
  }

  render() {
    return html`
      <div>
        <input >
      </div>
    `;
  }
}

window.customElements.define('elite-form', EliteForm)