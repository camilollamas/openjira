// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {

  const { message = 'Bad request' } = req.query

  res.status(400).json({ 
    ok: false,
    message
  })
}
