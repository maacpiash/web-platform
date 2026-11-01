// Written once, injected into the <head> of the apps before first paint, so dark/light mode never flashes on load.
// Astro: <script is:inline set:html={noFlashScript} />.
// Solid Start: <script innerHTML={noFlashScript} />

export const noFlashScript = `(function () {
  try {
    var stored = localStorage.getItem('theme')
    var theme = stored || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light')
    document.documentElement.setAttribute('data-theme', theme)
  } catch (e) {}
})()`
