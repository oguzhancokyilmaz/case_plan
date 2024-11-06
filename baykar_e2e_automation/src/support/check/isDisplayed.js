import waitForDisplayed from '../action/waitForDisplayed'

/**
 * Check if the given element is visible or not based on the trueCase parameter
 * @param  {String}   selector   Element selector
 * @param  {Boolean}  trueCase   Check for a visible element if true, and for a hidden element if false
 */
export default async(selector, trueCase) => {
  const element = await $(selector);
  const isDisplayed = await element.isDisplayed();

  if (trueCase) {
    await expect(element).toBeDisplayed(`Expected element "${selector}" to be displayed`);
  } else {
    await expect(element).not.toBeDisplayed(`Expected element "${selector}" not to be displayed`);
  }

  return isDisplayed;
}
