import {LitElement, html} from 'lit';
import internalValMethods from './elite-form-rules'

export class EliteForm extends LitElement {

  static properties = {
    type: {},
    label: {},
    placeholder: {},
    id: {},
    name: {},
    validationRules: {}, // this isthe prop that the dev passes in
    errors: {},
    errorBehavior: {}, 
    styles: {}, 
    help: {},
    validationName: {},
  }

  static state = {
    internalValMethods: internalValMethods  // we import this from elite-forms-rules
  }

  constructor() {
    super();
    this.value = '';
    this.type = 'text',
    this.label = '',
    this.placeholder = '',
    this.id = '',
    this.errors = '',
    this.styles = {}
  }

  render() {

    const error = []
    for (let err in this.error) {
      error.push(html`<div>${this.error[err]}</div>`)
    }

    return html`
      <div>
        <div ?hidden=${!this.label}>${this.label}</div><br>
        <input type=${this.type} @input=${this.handleInput} @blur=${this.handleInput} placeholder=${this.placeholder}><br>
        <div ?hidden=${!this.help}>${this.help}</div><br>
        ${error}
      </div>
    `;
  }

  handleSubmitTemp(event) { //*****not being used
    const { value } = event.target;
    this.value = value
    console.log(this.value)
    this.requestUpdate()
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
    console.log(this.error)
    this.requestUpdate()
  }
  
}

window.customElements.define('elite-form', EliteForm)