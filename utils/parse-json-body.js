
export async function parseJSONBody(req) {
  let body = "";

  for await (const chunks of req) {
    body += chunks;
  }
  try {
    return JSON.parse(body);
  } catch (error) {
   console.log(error)
  }
}
