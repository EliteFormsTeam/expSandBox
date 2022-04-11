import {LitElement, html} from 'lit';
import './elite-form'
import '../LitElements/name.js';
import '../LitElements/email.js';
import '../LitElements/password';

export class Test extends LitElement {

  render() {

    return html`
      <div id="main">
        <elite-form 
          id='email'
          type='email' 
          label='Email:'
          placeholder='email'
          note='note for email'
          validationRules: {
            required: true,
            email: true, 
          },
        ></elite-form>
        <elite-form 
          id='name'
          type='text' 
          label='Name:'
          placeholder='name'
          note='note for name'
          validationRules: {
            required: true,
          },
        ></elite-form>
        <button @click=${() => this.checkandget(["email", "name"], this.handleSubmit)} type='submit'>submit</button>
      </div>

      
    `;
  }

  checkandget(arr, callback) { // pass the array of ids of fields as the first argument
    const fields = this.shadowRoot.children.main.children;
    // console.log(fields)
    // console.log(fields[0].value);
    let formElementsCheck = true;

    const cache = {};

    for (let i = 0; i < arr.length; i++){
      const { value, id } = fields[arr[i]];
      cache[id] = value;
    }

    if (formElementsCheck){
      callback(cache);
    } else console.log('bad form');
  }

  handleSubmit(arg) {
    console.log(arg);
  }

}

window.customElements.define('test-', Test);