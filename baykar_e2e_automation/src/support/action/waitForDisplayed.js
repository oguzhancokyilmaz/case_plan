/**
 * Wait for the given element to become visible
 * @param  {String}   selector      Element selector
 * @param  {String}   falseCase Whether or not to expect a visible or hidden
 *                              state
 *
 */
const { $ } = require('@wdio/globals')

export default async (selector, falseCase) => {
  const ms = 10000;
  await $(selector).waitForDisplayed({ timeout: ms, reverse: !falseCase });
};
