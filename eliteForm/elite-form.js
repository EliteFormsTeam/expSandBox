import {LitElement, html} from 'lit';
import internalValMethods from './elite-form-rules'

export class EliteForm extends LitElement {

  static properties = {
    eliteForm: {},
    id: {},
    type: {},
    label: {},
    placeholder: {},
    note: {},
    name: {},
    validationRules: {}, // this is the prop that the dev passes in
    errors: {},
    errorBehavior: {}, 
    styles: {}, 
    validationName: {},
  }

  static state = {
    internalValMethods: internalValMethods  // we import this from elite-forms-rules
  }

  constructor() {
    super();
    this.eliteForm = true;
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

    const error = []
    for (let err in this.error) {
      error.push(html`<div>${this.error[err]}</div>`)
    }

    return html`
      <div>
        <label for=${this.id}>${this.label && this.label}</label>
        <input 
          id=${this.id} 
          type=${this.type}
          @input=${this.handleInput} 
          @blur=${this.handleInput}
          placeholder=${this.placeholder} 
        }>
        <div ?hidden=${!this.note}>${this.note}</div><br>
        <div ?hidden=${!this.help}>${this.help}</div><br>
        ${error}
      </div>
    `;
  }

  handleSubmitTemp(event) { //*****not being used
    const { value } = event.target;
    this.value = value;
    // console.log(this.value);
    this.requestUpdate();
  }

  handleInput(event) {
    const { value } = event.target;
    this.value = value
    this.handleValidation()
  }

  handleValidation() {
    const error = {}
    for (let rule in this.validationRules) { 
      const result = internalValMethods[rule](this, this.validationRules[rule])
      if (result.error) error[rule] = result.message
    }
    this.error = error
    this.requestUpdate()
  }
  
}

window.customElements.define('elite-form', EliteForm)