const fs = require('fs/promises')
const path = require('path')

// Pangram occasionally attributes a percent or two of a genuinely human post to
// AI. Below this threshold a page is treated as human-written, which puts its
// indicator at the bottom of the page instead of the top.
const AI_THRESHOLD = 0.05

const EMPTY = { pages: [], byPath: {}, generatedAt: null, aiPercent: 0, totalPages: 0, totalWords: 0 }

/**
 * Load data/slop.json (a copy of slop-detector's results/latest.json) and shape
 * it for templates: a sorted list for the /slop-detection table, plus a lookup
 * by page href for the per-page indicator.
 */
module.exports = async function loadSlop (file) {
  file = file || path.join(process.cwd(), 'data', 'slop.json')

  let latest
  try {
    latest = JSON.parse(await fs.readFile(file, 'utf8'))
  } catch (err) {
    return EMPTY
  }

  const pages = (latest.pages || []).map(toPage)
  const byPath = {}
  pages.forEach(page => { byPath[page.href] = page })

  return {
    pages,
    byPath,
    generatedAt: latest.generatedAt,
    totalPages: latest.totalPages,
    totalWords: latest.totalWords,
    totalWordsFormatted: (latest.totalWords || 0).toLocaleString('en-US'),
    aiPercent: round(latest.fractionAi + latest.fractionAiAssisted, 1)
  }
}

function toPage (page) {
  const fractionAi = (page.fractionAi || 0) + (page.fractionAiAssisted || 0)
  const aiPercent = Math.round(fractionAi * 100)

  return {
    href: page.path,
    title: page.title,
    slug: page.slug,
    wordCount: page.wordCount,
    dataUrl: page.dataUrl,
    isAi: fractionAi >= AI_THRESHOLD,
    aiPercent,
    humanPercent: 100 - aiPercent,
    emoji: aiPercent >= 100 ? '🤖' : (fractionAi >= AI_THRESHOLD ? '⚠️' : '✅'),
    summary: fractionAi >= AI_THRESHOLD ? `${aiPercent}% AI` : `${100 - aiPercent}% human`
  }
}

function round (value, places) {
  const factor = 10 ** places
  return Math.round((value || 0) * 100 * factor) / factor
}
