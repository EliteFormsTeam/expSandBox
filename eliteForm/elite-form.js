import {LitElement, html} from 'lit';
import internalValMethods from './elite-form-rules'
import dbValidation from './db-validation'
import debounce from './debounce'

export class EliteForm extends LitElement {

  static properties = {
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
    url: {}
  }

  static state = {
    internalValMethods: internalValMethods, 
    dbValidation: dbValidation,  
    debounce: debounce
    // we import this from elite-forms-rules
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
    this.styles = {}, 
    this.url = ''
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
         
          placeholder=${this.placeholder} 
          errorBehavior=${this.errorBehavior}
        }>
        <div ?hidden=${!this.note}>${this.note}</div><br>
        <div ?hidden=${!this.help}>${this.help}</div><br>
        ${error}
      </div>
    `;
  }
  // @blur=${this.handleValidation}

  handleSubmitTemp(event) { //*****not being used
    const { value } = event.target;
    this.value = value;
    // console.log(this.value);
  }

  // debounce(func, wait=500) {
  //   let timeout
  //   return function(...args) {
  //     const context = this
  //     clearTimeout(timeout)
  //     timeout = setTimeout(() => func.apply(context, args), wait)
  //   }
  // }

  handleInput(event) {
    const withDebounce = debounce(() => this.handleValidation(), 1000)
    const { value } = event.target;
    this.value = value
    console.log(this.value)
    if (this.errorBehavior === 'debounce') {
      return withDebounce()    
    } else {
      this.handleValidation()
    }

    

    // if (this.id === 'email') {
    //   dbValidation.checkExistingEmail(value, this.url)
    // } 
    // else if (this.id === 'username') {
    //   dbValidation.checkExistingUsername(value, this.url)
    // } else {
    //   this.handleValidation()
    // }
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