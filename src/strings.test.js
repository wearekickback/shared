import {
  stringsMatchIgnoreCase,
  trimOrEmpty,
  trimOrEmptyStringProps,
  pluralize,
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

describe('.pluralize', () => {
  it('to work', () => {
    expect(pluralize('animal')).toEqual('animals')
    expect(pluralize('animal', 2)).toEqual('animals')
    expect(pluralize('animal', 1)).toEqual('animal')
  })
})

describe('.trimOrEmpty', () => {
  it('to work', () => {
    expect(trimOrEmpty('animal  ')).toEqual('animal')
    expect(trimOrEmpty('      animal  ')).toEqual('animal')
    expect(trimOrEmpty(false)).toEqual('')
    expect(trimOrEmpty(null)).toEqual('')
    expect(trimOrEmpty(123)).toEqual('')
  })
})

describe('.trimOrEmptyStringProps', () => {
  it('to work', () => {
    expect(trimOrEmptyStringProps({
      a: false,
      b: true,
      c: 123,
      d: '   animal  ',
      e: 'test',
      f: null
    })).toEqual({
      a: '',
      b: '',
      c: '',
      d: 'animal',
      e: 'test',
      f: ''
    })
  })
})
