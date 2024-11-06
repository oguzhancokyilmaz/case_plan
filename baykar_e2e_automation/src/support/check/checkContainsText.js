/**
 * Check if the given elements contains text
 * @param  {String}   selector       Element selector
 * @param  {String}   expectedText  The text to check against
 */
export default async (selector, expectedText) => {
    const elem = await $(selector);
    await elem.waitForDisplayed();
    const text = await elem.getText();
    await expect(text).toContain(expectedText);
};
