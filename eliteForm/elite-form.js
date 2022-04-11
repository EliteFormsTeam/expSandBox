import {LitElement, html} from 'lit';
import internalValMethods from './elite-form-rules'

export class EliteForm extends LitElement {

  static properties = {
    id: {},
    type: {},
    label: {},
    placeholder: {},
    note: {},
    name: {},
    // value: {},
    validationRules: {}, // this is the prop that the dev passes in
    errors: {},
    errorBehavior: {}, 
    styles: {}, 
  }

  static state = {
    internalValMethods: internalValMethods  // we import this from elite-forms-rules
  }

  constructor() {
    super();
    this.id = '';
    this.type = '';
    this.label = '';
    this.placeholder = '';
    this.note = '';
    this.name = '';
    this.errors = '';
    this.errorBehavior = '';
    this.styles = {}
  }

  // line 45, type should be modified to takes the attribute dynamically
  render() {
    return html`
      <div>
        <label for=${this.id}>${this.label && this.label}</label>
        <input 
          id=${this.id} 
          type="text" 
          @input=${this.handleInput} 
          placeholder=${this.placeholder} 
        }>
        <p>${this.note && this.note}</p>
        <div ?hidden=${!this.error} >${this.error}</div>
      </div>
    `;
  }

  handleInput(event) {
    const { value } = event.target;
    this.value = value;
    // console.log(this.value);
    this.requestUpdate();
  }
  
}

window.customElements.define('elite-form', EliteForm)