/**
 * Ранний перехват beforeinstallprompt (Chrome, Edge, Яндекс),
 * чтобы не пропустить событие до загрузки React.
 * Подключается в index.html до основного приложения.
 */
;(function () {
  window.__PWA_INSTALL_PROMPT__ = null
  window.addEventListener('beforeinstallprompt', function (e) {
    e.preventDefault()
    window.__PWA_INSTALL_PROMPT__ = e
  })
})()
