import BasePageObjects from "../Objects/BasePageObject";
import DeviceLib from "../libraries/deviceLib";
import openWebsite from "../support/action/openWebsite";
import clickElement from "../support/action/clickElement";
import setInputField from "../support/action/setInputField";
import checkContainsText from "../support/check/checkContainsText";
import scroll from "../support/action/scroll";
import clickFirstElement from "../support/action/clickFirstElement";
import moveTo from "../support/action/moveTo";

class BasePage extends BasePageObjects {
  async createEnvLabelAndLoadWebsite(environment) {
    if (!environment) {
      console.warn("There is no environment match by given string");
      return;
    }

    if (DeviceLib.isMobile()) {
      environment = `Mobile Web ${environment}`;
    } else {
      environment = `Desktop ${environment}`;
    }

    environment = environment.replace(/ /g, "_").toUpperCase();
    if (
      environment === "DESKTOP_QA" ||
      environment === "DESKTOP_PROD" ||
      environment === "DESKTOP_YONETIM_QA" ||
      environment === "DESKTOP_YONETIM_PROD"
    ) {
      browser.options.baseUrl = process.env[environment];
      DeviceLib.setURL(process.env[environment]);
      await openWebsite();
    } else {
      browser.options.baseUrl = process.env[environment];
      DeviceLib.setURL(process.env[environment]);
      await openWebsite();
    }
  }
  async loadWebsiteWithUrl(url) {
    browser.options.baseUrl = url;
    DeviceLib.setURL(url);
    await openWebsite();
  }
  async click(key) {
    if (DeviceLib.isMobile()) {
      //For Mobile test suites
    } else {
      await clickElement(this[key]);
    }
  }
  async clickFirstElement(key) {
    if (DeviceLib.isMobile()) {
      //For Mobile test suites
    } else {
      await clickFirstElement(this[key]);
    }
  }
  async type(key, value) {
    if (DeviceLib.isMobile()) {
      //For Mobile test suites
    } else {
      await setInputField(this[key], value);
    }
  }
  
  async checkContainsText(key, value) {
    if (DeviceLib.isMobile()) {
      //For Mobile test suites
    } else {
      await checkContainsText(this[key], value);
    }
  }
  async scrollTo(key) {
    if (DeviceLib.isMobile()) {
      //For Mobile test suites
    } else {
      await scroll(this[key]);
    }
  }
  async clickSelector(key) {
    if (DeviceLib.isMobile()) {
      //For Mobile test suites
    } else {
      await clickElement(key);
    }
  }  
  async moveTo(locator) {
    await moveTo(this[locator]);
  } 
}

export default new BasePage();
