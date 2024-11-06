import { Given, When, Then} from "@cucumber/cucumber";
import DeviceLib from "../libraries/deviceLib";
import basePage from "../pages/BasePage";
import expectedUrl from "../support/check/expectedUrl";
import languageData from "../libraries/language.json"
import BasePageObjects from "../Objects/BasePageObject.js";

Given(
  /^open the site for "([^"]*)?" environment on "([^"]*)?"$/,
 async (environment, device) => {
    DeviceLib.setDevice(device);
  await  basePage.createEnvLabelAndLoadWebsite(environment);
  }
);
Given(
  /^open url "([^"]*)?" on "([^"]*)?"$/,
 async (environment, device) => {
    DeviceLib.setDevice(device);
  await  basePage.loadWebsiteWithUrl(environment);
  }
);
Given(/^url should be "([^"]*)?"$/, async (url) => {
  expectedUrl(url);
 });
When(/^wait (\d+) seconds$/, async (seconds) => {
  await browser.pause(seconds * 1000);
});
When('action with table', async function (dataTable) {
  for (const { locator, action, value } of dataTable.hashes()) {
    switch(action) {
      case 'type':
        await basePage.type(locator, value)
        await browser.pause(1000)
        break;
      case 'click':
        await basePage.click(locator)
        await browser.pause(1000)
        break;
      case 'verify':
        await basePage.checkContainsText(locator, value)
        await browser.pause(1000)
        break;
      case 'scroll':
        await basePage.scrollTo(locator)
        await browser.pause(1000)
        break;
      case 'hover':
        await basePage.moveTo(locator)
        await browser.pause(1000)
        break;
    }
  }
  })
When('all links in the navbar are clicked and page load is verified', async () => {
    const navbarLinks = await $$('.nav-link');
    const dropdownLinks = await $$('.dropdown');
    const nonDropdownLinks = await $$('div#navbarHeaderNav > div > a');
  
    console.log(`Total main menu items: ${navbarLinks.length}`);
    console.log(`Dropdown menu items: ${dropdownLinks.length}`);
    console.log(`Non-dropdown menu items: ${nonDropdownLinks.length}`);
  
    for (let i = 1; i <= dropdownLinks.length; i++) {
      const dropdownSelector = `.dropdown:nth-of-type(${i})`;
      const dropdown = await $(dropdownSelector);
  
      await dropdown.click();
      await browser.pause(500);
  
      const dropdownItems = await $$('.show .megaNav .mega-link');
      console.log(`Dropdown #${i} has ${dropdownItems.length} items`);
  
      for (let j = 1; j <= dropdownItems.length; j++) {
        const dropdownItemSelector = `.show .megaNav .mega-link:nth-of-type(${j})`;
        let dropdownItem = await $(dropdownItemSelector);

        if (!(await dropdownItem.isDisplayed())) {
          await browser.pause(500);
          await dropdown.click(); 
          await browser.pause(500);
          dropdownItem = await $(dropdownItemSelector); 
        }
  
        const itemText = await dropdownItem.getText();
  
        await dropdownItem.click();
        await browser.pause(500);
        const currentUrl = await browser.getUrl();
        console.log(`Clicked on dropdown item "${itemText}" - Current URL: ${currentUrl}`);
 
        await dropdown.click();
        await browser.pause(500);
      }
    }

    for (let k = 0; k < nonDropdownLinks.length; k++) {
      const nonDropdownLink = nonDropdownLinks[k];
      const linkText = await nonDropdownLink.getText();
  
      console.log(`Attempting to click on non-dropdown item "${linkText}"`);
  
      await nonDropdownLink.click();
      await browser.pause(500);
  
      const currentUrl = await browser.getUrl();
      console.log(`Clicked on non-dropdown item "${linkText}" - Current URL: ${currentUrl}`);
  
      await browser.url('https://baykartech.com/tr/');
      await browser.pause(500);
  }
});

When(/^change language "(.*)"$/, async function(language) {
  await $(basePage.languageToggle).click();
  await browser.pause(1000);

  const expectedLanguageData = languageData[language];
  const menuLocators = [basePage.menuItem1, basePage.menuItem2, basePage.menuItem3];

  for (let i = 0; i < menuLocators.length; i++) {
      const menuItem = await $(menuLocators[i]);
      const actualText = (await menuItem.getText()).replace(/\s/g, ""); 
      const expectedText = expectedLanguageData[`word${i + 1}`];

      await expect(menuItem).toHaveTextContaining(expectedText);
  }
});