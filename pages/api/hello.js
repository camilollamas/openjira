// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  res.status(200).json({ 
      ok: true,
      message: 'Todo bien',
      method: req.method,
      body: req.body,
      query: req.query,
    })
}
