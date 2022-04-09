const validationRules = {
  email: function(email) {
    const validEmail = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/
    return validEmail.test(email)
  }, 
  required: function(boolean) {

  }, 
  min: function() {},
  max: function() {}

}

export default validationRules