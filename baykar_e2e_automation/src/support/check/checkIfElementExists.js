/**
 * Check if the given element exists in the DOM one or more times
 * @param  {String}  selector  Element selector
 * @param  {Boolean} falseCase Check if the element (does not) exists
 * @param  {Number}  exactly   Check if the element exists exactly this number
 *                             of times
 */
const { expect, $, $$ } = require('@wdio/globals')

export default async (selector) => {
  try {
    const nrOfElements = await $$(selector);

    await expect(nrOfElements.length).toBeGreaterThanOrEqual(
      1,
      `Element with selector "${selector}" should exist on the page`
    );
  } catch (error) {
    throw new Error(`Element not found with selector "${selector}"`);
  }
};
