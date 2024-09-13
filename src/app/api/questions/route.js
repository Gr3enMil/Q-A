export async function POST(req) {
  const body = await req.json();
  const { name, question } = body;


  // Návrat odpovědi
  return new Response(JSON.stringify({ name, question, answer: null }), {
    status: 200,
    headers: {
      'Content-Type': 'application/json',
    },
  });
}