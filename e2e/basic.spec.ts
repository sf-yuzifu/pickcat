import { expect, isDevArtifact, name, test } from './fixtures'

test('example test', async ({ page }, testInfo) => {
  testInfo.skip(!isDevArtifact(), 'contentScript is in closed ShadowRoot mode')

  await page.goto('https://example.com')

  await page.locator(`#${name} button`).click()
  await expect(page.locator(`#${name} h1`)).toHaveText('PICKCAT')
})
