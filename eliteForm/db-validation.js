const dbValidation = {
  checkExistingUsername(username, URL) {   
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({username: username})

    })
    .then(res => res.json())
    .then(data => {
      if (data === true) {
        alert ('username unavailable')
      }
    })
  }, 

  checkExistingEmail(email, URL) {    
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({email: email})

    })
    .then(res => res.json())
    .then(data => {
      if (data === true) {
        alert ('email exists for existing account. please sign in.')
      }
    })
  }  

}

export default dbValidation