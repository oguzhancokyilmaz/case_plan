import waitForDisplayed from '../action/waitForDisplayed'

/**
 * Check if the text of the given element matches or does not match the expected text.
 * @param  {String}   selector      The selector of the element to validate.
 * @param  {String}   expectedText  The text to validate against.
 * @param  {Boolean}  mustMatch     If true, the text must match the expected text. If false, the text must not match the expected text.
 */
export default async (selector, expectedText, mustMatch) => {
    await waitForDisplayed(selector, true)
    const text = await $(selector).getText();
    if (mustMatch) {
       await expect(text).toBe(expectedText);
    } else {
       await expect(text).not.toBe(expectedText);
    }
};
