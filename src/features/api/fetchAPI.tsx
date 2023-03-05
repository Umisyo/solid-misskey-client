export default async function fetchAPI(endpoint: string, body?: object) {
  const requestUrl = `https://${localStorage.getItem(
    'instance'
  )}/api/${endpoint}`
  const requestBody = {
    i: localStorage.getItem('UserToken'),
    ...body
  }

  return await fetch(requestUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(requestBody)
  })
    .then(res => {
      if (!res.ok) {
        throw new Error(res.statusText)
      }
      return res.json()
    })
    .catch(err => {
      throw new Error(err)
    })
}
