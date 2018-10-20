import {
  stringsMatchIgnoreCase,
} from './'

describe('string matching', () => {
  it('ignores case', () => {
    expect(stringsMatchIgnoreCase('abc', 'ABC')).toEqual(true)
    expect(stringsMatchIgnoreCase('abc23324', 'ABC23324')).toEqual(true)
    expect(stringsMatchIgnoreCase('2332', '998')).toEqual(false)
    expect(stringsMatchIgnoreCase('你好', '你好')).toEqual(true)
    expect(stringsMatchIgnoreCase('你好', '你好吗')).toEqual(false)
  })
})
