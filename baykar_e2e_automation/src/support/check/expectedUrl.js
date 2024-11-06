/**
 * Checks if the current page URL is exactly equal to the given URL.
 * @param {String} expectedUrl The URL to compare with the current page URL.
 * @returns {Boolean} True if the URLs are exactly the same, false otherwise.
 */
export default async (expectedUrl) => {
    const currentUrl = await browser.getUrl();
    await expect(currentUrl).toEqual(expectedUrl);
}
