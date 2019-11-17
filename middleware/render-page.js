module.exports = async function loadPages (req, res, next) {
  const page = req.context.page
  if (!page) return next()

  const output = await page.render(req.context)
  res.send(output)
}
