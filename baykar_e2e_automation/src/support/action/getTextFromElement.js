import checkIfElementExists from './../check/checkIfElementExists'

export default async(selector) => {
  await checkIfElementExists(selector)

  const element = await $(selector)
  return await element.getText()
  
}
