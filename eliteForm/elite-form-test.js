import {LitElement, html} from 'lit';
import './elite-form'
import validateForm from './validateForm'

export class Test extends LitElement {
  // static styles = css`
  //   elite-form{
  //     color: red;
  //   }
  // `;
  // styles= '{border: '1px solid red', 'background-color': 'gray'}'
  // .styles= ${styles}


  submitForm() {
    validateForm(this, this.handleSubmit)
  }

  // @click=${() => checkAndGet(this.handleSubmit)}


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
            between: [3, 7],
            checkExisting: (inputValue) => fetch('http://localhost:3000/signup/checkusername', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({username: inputValue})
            })
            .then(res => res.json())
            .then(data => {
              if (data === true) {
                return true
              } 
            })
          }}
          errorBehavior = 'debounce'
          .labelStyles= ${labelStyles}
          .styles=${{color: 'darkgreen', 'background-color': 'aliceblue'}}
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
            checkExisting: (inputValue) => fetch('http://localhost:3000/signup/checkemail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({email: inputValue})
          })
          .then(res => res.json())
          .then(data => {
            if (data === true) {
              return true
            } 
          })
          // endsWith: ['yahoo.com', 'bing.com']
          }}
          validationName='yahoo email'
          note='**note** please enter valid yahoo email'
          .noteStyles= ${{color: 'purple'}}
          errorBehavior = 'debounce'
        ></elite-form>
        <!-- <div> howdy </div> -->
        <!-- <elite-form
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
        ></elite-form> -->
        <!-- <div> yessir </div>
        <input type="range" id='custom1'>
        <input type="date" id='custom2'>
        <div> hello </div> -->
        <button  @click=${this.submitForm} type='submit'>submit</button>
      </div>
    `;
  }

  handleSubmit(arg) {
    console.log(arg);
  }

}
window.customElements.define('test-', Test);