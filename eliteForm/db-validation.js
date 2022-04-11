const dbValidation = {
  checkExisting(node, URL) {
    const body = {}
    body[node.id] = node.value
    fetch(URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)

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