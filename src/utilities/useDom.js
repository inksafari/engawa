function attach(callback) {
  document.addEventListener('astro:after-swap', callback)
  if (document.readyState === 'loading') {
    // Loading hasn't finished yet
    document.addEventListener('DOMContentLoaded', callback)
  } else {
    // `DOMContentLoaded` has already fired
    callback()
  }
}

function detach(callback) {
  document.addEventListener('astro:before-swap', callback)
}

export { attach, detach }
