@e2e
Feature: As a User
  To identify scenarios for Baykar web software testing

  @baykar
  Scenario: Navbar items check scenario
    Given open the site for "prod" environment on "Desktop"
    * url should be "https://baykartech.com/tr/"
    Given wait 2 seconds
    When all links in the navbar are clicked and page load is verified

  @language
  Scenario: Language change check scenario
    Given open the site for "prod" environment on "Desktop"
    * url should be "https://baykartech.com/tr/"
    Given wait 2 seconds
    Given change language "EN"
    * wait 2 seconds
    Given change language "TR"

  @filter
  Scenario: filter and search check scenario
    Given open url "https://kariyer.baykartech.com/tr/open-positions/" on "Desktop"
    Given wait 2 seconds
    When action with table
      | locator            | action | value                                     |
      | searchBox          | scroll |                                           |
      | unitFilterCheckbox | click  |                                           |
      | searchBox          | type   | Test                                      |
      | pozitionTitle      | verify | Akıllı Web Sistemleri Yazılım Test Uzmanı |