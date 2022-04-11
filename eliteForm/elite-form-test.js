import {LitElement, html} from 'lit';
import './elite-form'
import '../LitElements/name.js';
import '../LitElements/email.js';
import '../LitElements/password';

export class Test extends LitElement {

  render() {

    return html`
      <div id='main'>
        <elite-form 
          type='text' 
          name='username'
          placeholder='username'
          id='username'
          .validationRules= ${{
            required: true,
            alphanumeric: true
          }}
        ></elite-form>
        <elite-form
          type='email'
          label='Email:'
          name='email'
          placeholder='email'
          id='email'
          .validationRules= ${{
            required: true,
            email: true,
            endsWith: ['yahoo.com', 'bing.com']
          }}
          validationName='yahoo email'
          help='**(help)** please enter valid yahoo email'
        ></elite-form>
        <elite-form
          type='password'
          label='Password:'
          name='password'
          placeholder='password'
          id='password'
          .validationRules= ${{
            required: true,
            password: true,
          }}
          validationName='a strong password'
        ></elite-form>
        <button @click=${() => this.checkandget(['username', 'email', 'password'], this.handleSubmit)} type='submit'>submit</button>
      </div>



      
    `;
  }

  checkandget(arr, callback) { // pass the array of ids of fields as the first argument
    const fields = this.shadowRoot.children.main.children;
    console.log(fields)
    // console.log(fields[0].val);
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