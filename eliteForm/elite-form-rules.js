const internalValMethods = {
  email: function(email) {
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    console.log(validEmail.test(email));
    return validEmail.test(email)
  }, 
  required: function(boolean) {

  },
  alphanumeric: function(val) {
    const alphanumericRegex = /[^a-zA-Z0-9]+/g
    console.log(!alphanumericRegex.test(val));
    return !alphanumericRegex.test(val);
  },
  alpha: function(val) {
    const alphaRegex = /[^a-zA-Z]+/g;
    console.log(!alphaRegex.test(val));
    return !alphaRegex.test(val);
  },
  number: function(val) {
    const numberRegex = /[^0-9]+/g;
    console.log(!numberRegex.test(val));
    return !numberRegex.test(val);
  }
}

export default internalValMethods;