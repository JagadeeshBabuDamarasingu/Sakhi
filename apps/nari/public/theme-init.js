(function () {
  try {
    var saved = localStorage.getItem('sakhi_theme')
    var preferred = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    var theme = saved || preferred
    var html = document.documentElement
    html.setAttribute('data-theme', theme === 'dark' ? 'shakti-dark' : 'shakti')
    if (theme === 'dark') html.classList.add('dark')
  } catch (e) {}
})()
