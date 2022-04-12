import {LitElement, html, css} from 'lit';
import {styleMap} from 'lit/directives/style-map.js';
import internalValMethods from './elite-form-rules'
import dbValidation from './db-validation'
import debounce from './debounce'



export class EliteForm extends LitElement {
  static get styles() {
    return css`
      .elite-form{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 10px;
        font-family: 'Roboto Slab', serif;
       }`
  }

  // static styles = [
  //   css`
  //     :host {
  //       color: blue;
  //       display: flex;
  //       flex-direction: column;
  //       justify-content: space-between;
  //       /* align-items: center; */
  //       padding: 10px;
  //     }`
  // ];

  static properties = {
    eliteForm: {},
    id: {},
    class: {},
    type: {},
    label: {},
    placeholder: {},
    note: {},
    name: {},
    validationRules: {}, // this is the prop that the dev passes in
    errors: {},
    errorBehavior: {}, 
    validationName: {},
  }

  static state = {
    internalValMethods: internalValMethods, 
    dbValidation: dbValidation,  // we import this from elite-forms-rules
    debounce: debounce
  }

  constructor() {
    super();
    this.eliteForm = true;
    this.id = '';
    this.class = '';
    this.type = '';
    this.label = '';
    this.placeholder = '';
    this.note = '';
    this.name = '';
    this.errors = '';
    this.errorBehavior = ''; 
    this.styles = ''; // styles for the most outer div
    this.labelStyles = '';  
    this.inputStyles = ''; 
    this.noteStyles = ''; 
    this.errorStyles = '';
  }

  // style=${styleMap(this.styles)}

  render() {
    const error = []
    for (let err in this.error) {
      error.push(html`<li>${this.error[err]}</li>`)
    }

    return html`
      <div class='elite-form' style=${styleMap(this.styles)}>
        <label 
          for=${this.id}
          style=${styleMap(this.labelStyles)}>
            ${this.label && this.label}
        </label>
        <input 
          id=${this.id} 
          type=${this.type}
          @input=${this.handleInput} 
          @blur=${this.handleValidation}
          placeholder=${this.placeholder} 
          style=${styleMap(this.inputStyles)}
          errorBehavior=${this.errorBehavior}
        >
        <div 
          class="note" 
          ?hidden=${!this.note} 
          style=${styleMap(this.noteStyles)}>
            ${this.note}
        </div>
        <ul 
          class="error" 
          style=${styleMap(this.errorStyles)}>
          ${error} 
        </ul>
      </div>
    `;
  }

  withDebounce = debounce(() => this.handleValidation(), 1000)

  handleInput(event) {
    const { value } = event.target;
    this.value = value
    console.log(this.value)
    if (this.errorBehavior === 'debounce') {
      this.withDebounce()    
    } else {
      this.handleValidation()
    }
  }

  async handleValidation() {
    const error = {}
    for (let rule in this.validationRules) {
      if (rule === 'checkExistingEmail' || rule === 'checkExistingUsername') {
        console.log(
          'inside async'
        )
          const result = await internalValMethods[rule](this, this.validationRules[rule])
          if (result.error) {
            error[rule] = result.message
          }
      }
      const result = internalValMethods[rule](this, this.validationRules[rule])
      if (result.error) {
        error[rule] = result.message
      }
    }
    this.error = error
    this.requestUpdate()
  }

  // console.log('inside handlevalidation: ', rule)
  // // console.log(this.validationRules[rule])
  // if (rule === 'checkExistingEmail' || rule === 'checkExistingEmail') {
  //   const result = await internalValMethods[rule](this, this.validationRules[rule])
  //   if (result.error) {
  //     error[rule] = result.message
  //   }
}

window.customElements.define('elite-form', EliteForm)