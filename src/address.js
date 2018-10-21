import { isAddress } from 'web3-utils'

import { stringsMatchIgnoreCase } from './strings'

export const isEthereumAddress = str => isAddress(str)

export const assertEthereumAddress = str => {
  if (!isEthereumAddress(str)) {
    throw new Error(`Invalid Ethereum address: ${str}`)
  }
}

export const addressesMatch = stringsMatchIgnoreCase

export const isInAddressList = (addressList, address) =>
  !!addressList.find(a => addressesMatch(a, address))
