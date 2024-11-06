import checkIfElementExists from '../check/checkIfElementExists'
import waitForDisplayed from './waitForDisplayed'
import clickElement from './clickElement'
const { $ } = require('@wdio/globals')

/**
 * Set the value of the given input field to a new value
 * @param  {String}   value   The value to set the selector to
 * @param  {String}   selector Element selector
 */
export default async(selector, value) => {
  const command = 'setValue'
  let checkValue = value
  await waitForDisplayed(selector, true)
  if (!value) {
    checkValue = ''
  }
 await $(selector)[command](checkValue)
 await browser.pause(1000)
}
