import {LitElement, html} from 'lit';
import './elite-form-rules'

export class EliteForm2 extends LitElement {

  static properties = {
    id: {},
    type: {},
    label: {},
    placeholder: {},
    validationRules: {},
    note: {},
    errorBehavior: {}, 
    styles: {}, 
  }

  constructor() {
    super();
    this.id = '',
    this.type = '',
    this.label = '',
    this.placeholder = '',
    // this.validationRules = {}, 
    this.note = '',
    this.errorBehavior = {},
    this.styles = {}
  }

  render() {
    // let type = ${this.text};

    return html`
      <div>
        <label for=${this.id}>${this.label && this.label}</label>
        <input id=${this.id} type="text" @input=${this.handleInput} placeholder=${this.placeholder} }>
        <p>${this.note && this.note}</p>
        <div ?hidden=${!this.error} >${this.error}</div>
      </div>
    `;
  }

  handleInput(event) {
    const { value } = event.target;
    this.value = value
    // this.error = this.validation();
    this.requestUpdate();
  }

  // onblur=${this.validationFunc(this.validationRules)


  // validationFunc(ruleObj){

  // }



}

window.customElements.define('elite-form2', EliteForm2)