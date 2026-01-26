window.addEventListener('DOMContentLoaded', () => {
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
