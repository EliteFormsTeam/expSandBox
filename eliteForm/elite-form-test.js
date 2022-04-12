import {LitElement, html, css} from 'lit';
import './elite-form'
import '../LitElements/name.js';
import '../LitElements/email.js';
import '../LitElements/password';

export class Test extends LitElement {
  // static styles = css`
  //   elite-form{
  //     color: red;
  //   }
  // `;
  // styles= '{border: '1px solid red', 'background-color': 'gray'}'
  // .styles= ${styles}


  render() {

    const labelStyles= {border: '1px solid orange', 'background-color': 'lightgray'};

    return html`
      <div id='main'>
        <elite-form 
          type='text'
          label='User Name:' 
          name='username'
          placeholder='username'
          id='username'
          .validationRules= ${{
            required: true,
            alphanumeric: true,
            between: [3, 7]
          }}
          .labelStyles= ${labelStyles}
          .styles=${{color: 'darkgreen', 'background-color': 'aliceblue'}}

          url = 'http://localhost:3000/signup/checkusername'
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
          note='**note** please enter valid yahoo email'
          .noteStyles= ${{color: 'purple'}}
          url = 'http://localhost:3000/signup/checkemail', 
          errorBehavior = 'debounce'
        ></elite-form>
        <div> howdy </div>
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
        <div> yessir </div>
        <input type="range" id='custom1'>
        <input type="date" id='custom2'>
        <div> hello </div>
        <button @click=${() => this.xcheckandget(this.handleSubmit)} type='submit'>submit</button>
      </div>

      
    `;
  }

  /* This function is responsible for doing one last data validation of all the input fields
  by default, it will data validate EVERY elite-form element and cache their values plus any other 
  custom vanilla html input field values into an object and then invoke the callback. here, the callback
  is to be the developers own handleSubmit function. 
  there is an option to inclue an array, if the developer wanted to only do data validation for a certain
  subset of the input fields*/
  checkandget(callback, arr) {
    const fields = this.shadowRoot.children.main.children
    console.log(fields)
    let fieldsCheck = true
    const cache = {}

    for (let singleElement in fields) {
      const currentElement = fields[singleElement]
      if (!isNaN(Number(singleElement))) {
        if (Array.isArray(arr)) {
          if (currentElement.eliteForm && arr.includes(currentElement.id)) {
            cache[currentElement.id] = currentElement.value
            currentElement.handleValidation()
            if (Object.keys(currentElement.error).length > 0) fieldsCheck = false
          }else if (arr.includes(currentElement.id)) {
            const { id, value } = fields[singleElement]
            cache[id] = value
          }
        } else if (currentElement.eliteForm) {
          cache[currentElement.id] = currentElement.value
          currentElement.handleValidation()
          if (Object.keys(currentElement.error).length > 0) fieldsCheck = false
        } else {
          const { id, value } = fields[singleElement]
          cache[id] = value
        }
      }
    }
    if (fieldsCheck) {
      callback(cache)
    } else {
      console.log('bad form')
    }
  }

  handleSubmit(arg) {
    console.log(arg);
  }

}

window.customElements.define('test-', Test);