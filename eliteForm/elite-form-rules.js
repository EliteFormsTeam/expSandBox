const internalValMethods = {
  email: function(email) {
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    console.log(validEmail.test(email));
    return validEmail.test(email)
  }, 
  required: function(boolean) {

  },
}

export default internalValMethods;