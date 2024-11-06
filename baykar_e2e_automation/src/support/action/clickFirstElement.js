import waitfordisplay from "../action/waitForDisplayed";
const { $$ } = require('@wdio/globals');

/**
 * Click on the first element found by the given selector
 * @param  {String}   selector Element selector
 */
export default async (selector) => {
  try {
    await waitfordisplay(selector, true);
    const elements = await $$(selector);
    if (elements.length > 0) {
        await elements[0].click();
        await browser.pause(1000);
    } else {
        console.log("No elements found with the selector!");
    }
  } catch (error) {
      console.log("Button/selector cannot be found or is not visible!")
  }
};
