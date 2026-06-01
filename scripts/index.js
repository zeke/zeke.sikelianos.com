window.addEventListener('DOMContentLoaded', () => {
  const newsletterForm = document.querySelector('.newsletter-signup__form')
  if (newsletterForm) {
    const input = newsletterForm.querySelector('.newsletter-signup__input')
    const button = newsletterForm.querySelector('.newsletter-signup__button')
    const status = newsletterForm.querySelector('.newsletter-signup__status')

    newsletterForm.addEventListener('submit', async (e) => {
      e.preventDefault()
      const email = input.value.trim()
      if (!email) return

      button.disabled = true
      status.hidden = true
      status.className = 'newsletter-signup__status'

      try {
        const res = await fetch(newsletterForm.action, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        })

        if (res.ok) {
          input.hidden = true
          button.hidden = true
          status.textContent = 'You\'re subscribed. Talk soon.'
          status.hidden = false
        } else {
          const body = await res.json().catch(() => ({}))
          status.textContent = body.error || 'Something went wrong. Try again.'
          status.classList.add('is-error')
          status.hidden = false
          button.disabled = false
        }
      } catch (_) {
        status.textContent = 'Could not reach the server. Try again later.'
        status.classList.add('is-error')
        status.hidden = false
        button.disabled = false
      }
    })
  }


  if ('browserDateFormatter' in window) {
    browserDateFormatter()
  }

  const singleLineShells = document.querySelectorAll('pre code.hljs.language-shell, pre code.hljs.language-bash')
  singleLineShells.forEach((block) => {
    if (!block.textContent.includes('\n')) {
      block.classList.add('shell-single-line')
    }
  })

  const codeBlocks = document.querySelectorAll('pre > code')
  codeBlocks.forEach((block) => {
    const wrapper = block.parentElement
    if (!wrapper || wrapper.querySelector('.code-copy-button')) return

    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'code-copy-button'
    button.textContent = 'Copy'

    button.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(block.textContent)
        button.textContent = 'Copied'
        button.disabled = true
        setTimeout(() => {
          button.textContent = 'Copy'
          button.disabled = false
        }, 2000)
      } catch (error) {
        console.error('Clipboard copy failed', error)
      }
    })

    wrapper.appendChild(button)
  })
})
