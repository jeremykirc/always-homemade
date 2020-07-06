export async function signUp(data) {
  const response = await fetch('/api/v1/users', {
    body: JSON.stringify(data),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    method: 'POST',
  });
  return response.json();
}
