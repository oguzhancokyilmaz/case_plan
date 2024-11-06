/**
 * Open the given URL
 * @param  {String}   type Type of navigation (getUrl or site)
 * @param  {String}   resolution set the site's resolution
 */

import DeviceLib from "../../libraries/deviceLib";

export default async () => {
  if (DeviceLib.isMobile()) {
    const width = 390; // Varsayılan genişlik
    const height = 844;
    browser.setWindowSize(width, height);
    const url = browser.options.baseUrl;
    console.log(url);
    browser.url(url)
  } else {
    const url = browser.options.baseUrl;
    console.log(url);
    await browser.url(url);
    browser.pause(10000)
  }
};
