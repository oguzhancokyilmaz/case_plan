import checkIfElementExists from "../check/checkIfElementExists";
import waitfordisplay from "../action/waitForDisplayed";
const { $ } = require('@wdio/globals');

/**
 * Perform a hover action on the given element
 * @param {String} selector Element selector
 */
export default async (selector) => {
  try {
    await waitfordisplay(selector, true);
    await checkIfElementExists(selector);
    const element = await $(selector);
    await element.moveTo();
    await browser.pause(1000);
  } catch (error) {
    console.error("Element cannot be found or is not visible for hover!");
  }
};
