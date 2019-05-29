import { services } from 'ask-sdk-model'
import monetization = services.monetization
import InSkillProduct = monetization.InSkillProduct
export type InskillProducts = Array<InSkillProduct>

/**
 * Get purchaseable products
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 */
export const getAllPurchasableProducts = (inSkillProductList: InskillProducts): InskillProducts => {
  return inSkillProductList.filter(record => {
    if (record.entitled === 'ENTITLED') return false
    return record.purchasable === 'PURCHASABLE'
  })
}

/**
 * Get entitled products
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 */
export const getAllEntitledProducts = (inSkillProductList: InskillProducts): InskillProducts => {
  return searchProductByEntitledStatus(inSkillProductList, 'ENTITLED')
}
/**
 * search by entitled state
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 * @param status {services.monetization.EntitledState}
 */
export const searchProductByEntitledStatus = (inSkillProductList: InskillProducts, status: monetization.EntitledState): InskillProducts => {
  return inSkillProductList.filter(record => record.entitled === status);
}

/**
 * Get product by the product name
 * @param inSkillProductList {services.monetization.InSkillProduct[]}
 * @param name {string}
 */
export const getProductByName = <T extends string>(inSkillProductList: InskillProducts, name: T): InSkillProduct | null => {
  if (inSkillProductList.length < 1) return null
  const product = inSkillProductList.find(product => product.name === name)
  if (!product) return null
  return product
}