export async function json(req, res) {
  const buffers = [];

  for await (const chunk of req) {
    buffers.push(chunk);
  }

  try {
    const jsonStr = Buffer.concat(buffers).toString();
    if (jsonStr.trim() === '') {
      req.body = null;
    } else {
      req.body = JSON.parse(jsonStr);
    }
  } catch (error) {
    req.body = null;
    console.error(error);
  }

  res.setHeader("Content-Type", "application/json");
}
