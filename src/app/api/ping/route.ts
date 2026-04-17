export async function GET() {
  return Response.json({
    status: 'alive',
    subject: 'AB',
    hint: 'check /robots.txt',
  })
}
