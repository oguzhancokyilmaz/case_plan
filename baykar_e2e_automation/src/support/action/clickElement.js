import checkIfElementExists from "../check/checkIfElementExists";
import waitfordisplay from "../action/waitForDisplayed";
const { $ } = require('@wdio/globals')
/**
 * Perform an click action on the given element
 * @param  {String}   selector Element selector
 */
export default async (selector) => {
  try {
    await waitfordisplay(selector, true);
    await checkIfElementExists(selector);
    await $(selector).click();
    await browser.pause(1000)
  } catch (error){
      console.log("Button/selector can not found or visible !")
  }
  
};
