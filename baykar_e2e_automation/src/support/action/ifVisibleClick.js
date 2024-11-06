import waitForDisplayed from '../action/waitForDisplayed'

/**
 * Click the given element if it is visible
 * @param  {String} selector Element selector
 */
export default async (selector) => {
  try {
    const element = await $(selector);
    const isDisplayed = await element.isDisplayed();

    if (isDisplayed) {
      await element.click();
      console.log(`Clicked on element "${selector}"`);
    } else {
      console.log(`Element "${selector}" is not visible. No action taken.`);
    }
  } catch (error) {
    console.error(`An error occurred while trying to click on element "${selector}":`, error);
  }
}
