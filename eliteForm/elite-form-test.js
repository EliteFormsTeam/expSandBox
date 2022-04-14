import {LitElement, html, css} from 'lit';
import './elite-form';
import './elite-wrapper';
import validateForm from './validateForm';

export class Test extends LitElement {
  static styles = css`
    :host {
      
    }
  /* styling for the submit button starts*/
    /* .btn {
      width: 100%;
      display: block;
      margin: 50px 0px;
      padding: 14px 16px;
      background: transparent;
      outline: none;
      border: 0;
      color: #000000;
      letter-spacing: 0.1em;
      font-weight: bold;
      font-family: monospace;
      font-size: 16px;
    }

    .block-cube {
      position: relative;
    }
    .block-cube .bg-top {
      position: absolute;
      height: 10px;
      background: #ffffff;
      background: linear-gradient(90deg, #020024 0%, #340979 37%, #00d4ff 94%);
      bottom: 100%;
      left: 5px;
      right: -5px;
      transform: skew(-45deg, 0);
      margin: 0;
    }
    .block-cube .bg-top .bg-inner {
      bottom: 0;
    }
    .block-cube .bg {
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      background: #ffffff;
      background: linear-gradient(90deg, #020024 0%, #340979 37%, #00d4ff 94%);
    }
    .block-cube .bg-right {
      position: absolute;
      background: #ffffff;
      background: #00d4ff;
      top: -5px;
      z-index: 0;
      bottom: 5px;
      width: 10px;
      left: 100%;
      transform: skew(0, -45deg);
    }
    
    .block-cube .bg-right .bg-inner {
      left: 0;
    }
    .block-cube .bg .bg-inner {
      transition: all 0.2s ease-in-out;
    }
    .block-cube .bg-inner {
      background: #ffffff;
      position: absolute;
      left: 2px;
      top: 2px;
      right: 2px;
      bottom: 2px;
    }
    .block-cube .text {
      position: relative;
      z-index: 2;
    }
    .block-cube.block-input input {
      position: relative;
      z-index: 2;
    }
   
    .block-cube.block-input .bg-top,
    .block-cube.block-input .bg-right,
    .block-cube.block-input .bg {
      background: rgba(255, 255, 255, 0.5);
      transition: background 0.2s ease-in-out;
    }
    .block-cube.block-input .bg-right .bg-inner,
    .block-cube.block-input .bg-top .bg-inner {
      transition: all 0.2s ease-in-out;
    }
   
    .block-cube.block-cube-hover:focus .bg .bg-inner, 
    .block-cube.block-cube-hover:hover .bg .bg-inner {
      top: 100%;
    }

    .text:hover {
      color: white;
    } */
  /* styling for the submit button ends*/

  `;

  render() {
    /* overriding stylings starts */
    const styles = {
      width: '600px',
      padding: '30px',
    }

    const labelStyles = {
      color: '#340979',
    };

    const inputStyles = {
      width: '100%',
      border: '0px',
      padding: '12px 20px',
      margin: '8px 0',
      'box-sizing': 'border-box',
      'border-bottom': '2px solid #340979',
      '-webkit-transition': '0.5s',
      transition: '0.5s',
      outline: 'none',
    };

    const noteStyles = {
      color: '#0099cc',
    };

    const errorStyles = {
      color: '#5c00e6',
    }; 
    /* overriding stylings ends */

    function handleSubmit(arg) {
      console.log(arg)
    }

    return html`
      <div id='main'>
        <elite-wrapper .onSubmit=${handleSubmit}>
          <elite-form 
            type='text'
            label='User Name:' 
            name='username'
            class='elite-form'
            placeholder='username'
            id='username'
            .validationRules= ${{
              // required: true,
              alphanumeric: true,
              between: [2,7],
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
            .styles=${styles}
            .labelStyles= ${labelStyles}
            .inputStyles= ${inputStyles}
            .errorStyles= ${errorStyles}
            .noteStyles= ${noteStyles}
            errorBehavior = 'debounce'
          ></elite-form>
          
          <elite-form
            type='email'
            label='Email:'
            name='email'
            class='elite-form'
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
            note='**note** please enter valid email'
            errorBehavior = 'debounce'
            .styles=${styles}
            .labelStyles= ${labelStyles}
            .inputStyles= ${inputStyles}
            .errorStyles= ${errorStyles}
            .noteStyles= ${noteStyles}
          ></elite-form>
          
          <!-- <button 
            class='btn block-cube block-cube-hover' 
            @click=${() => validateForm(this, this.handleSubmit)}
            type='submit'>
            <div class='bg-top'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg-right'>
              <div class='bg-inner'></div>
            </div>
            <div class='bg'>
              <div class='bg-inner'></div>
            </div>
            <div class='text'>
              Submit
            </div>
          </button> -->

        </elite-wrapper>
      </div>
    `;
  }

  handleSubmit(arg) {
    console.log('arg', arg);
  }

}
window.customElements.define('test-', Test);