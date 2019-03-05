import { isAddress } from 'web3-utils'

import { ValidationError } from './errors'
import { stringsMatchIgnoreCase } from './strings'

export const isEthereumAddress = str => isAddress(str)

export const assertEthereumAddress = str => {
  if (!isEthereumAddress(str)) {
    throw new ValidationError(`Invalid Ethereum address: ${str}`)
  }
}

export const addressesMatch = stringsMatchIgnoreCase

export const isInAddressList = (addressList, address) =>
  !!addressList.find(a => addressesMatch(a, address))
