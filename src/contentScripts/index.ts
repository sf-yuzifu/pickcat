/* eslint-disable no-console */
import { onMessage } from 'webext-bridge/content-script'
import { createApp } from 'vue'
import $ from 'jquery'
import App from '~/components/Navbar.vue'
import { setupApp } from '~/logic/common-setup'
import '~/styles/index.css'
import { autoTitleChange } from '~/composables/titleChange';

// Firefox `browser.tabs.executeScript()` requires scripts return a primitive value
(() => {
  $('head').append(`<meta name="viewport" content="width=device-width, initial-scale=1">`)
  console.info('[vitesse-webext] Hello world from content script')

  // communication example: send previous tab title from background page
  onMessage('tab-prev', ({ data }) => {
    console.log(`[vitesse-webext] Navigate from page "${data.title}"`)
  })

  $('.c-navigator--navigator').hide()

  const root = document.createElement('div')
  root.classList.add('c-navigator--navigator')
  root.classList.add('c-navigator--nav_fixed')

  // mount component to context window
  const container = document.createElement('div')
  container.id = __NAME__

  const styleEl = document.createElement('link')
  styleEl.setAttribute('rel', 'stylesheet')
  styleEl.setAttribute('href', browser.runtime.getURL('dist/contentScripts/style.css'))
  document.head.appendChild(styleEl)

  const navbar_item: Array<{ name: string, href: string }> = []
  const navbar_more: Array<{ name: string, href: string }> = []

  for (const i of document.querySelectorAll('.c-navigator--nav_wrap li a') as NodeListOf<HTMLAnchorElement>) {
    if (!i.textContent || navbar_more.length !== 0) {
      navbar_more.push({
        name: i.textContent ?? '',
        href: i.getAttribute('href') ?? '',
      })
      continue
    }
    navbar_item.push({
      name: i.textContent ?? '',
      href: i.getAttribute('href') ?? '',
    })
  }

  navbar_more.shift()

  const app = createApp(App)
  app.config.globalProperties.navbar_item = navbar_item
  app.config.globalProperties.navbar_more = navbar_more
  setupApp(app)
  app.mount(root)

  Array.from(document.querySelectorAll<HTMLLinkElement>('link[rel="shortcut icon"]')).forEach((link) => {
    link.remove()
  })

  const head = document.createElement('link')
  head.setAttribute('rel', 'icon')
  head.setAttribute('href', browser.runtime.getURL('assets/icon.png'))

  document.head.appendChild(head)
  $('.c-navigator--navigator').after(root)

  setInterval(() => {
    autoTitleChange()
  }, 100)
})()
