jest.mock('fs');

const findAutomations = require('../src/lib/findAutomations').default

describe('Find automations system', () => {
  test('Filter ts with no recursive returns 3', () => {
    return findAutomations('sample', {
      recursive: false,
      filter: (file) => /\.ts$/.test(file)
    }).then(data => {
      expect(data.length).toBe(3)
    })
  });

  test('Filter ts with recursion returns 4', () => {
    return findAutomations('sample', {
      recursive: true,
      filter: (file) => /\.ts$/.test(file)
    }).then(data => {
      expect(data.length).toBe(4)
    })
  });

  test('No filter without recursion returns 4', () => {
    return findAutomations('sample', {
      recursive: false
    }).then(data => {
      expect(data.length).toBe(4)
    })
  });

  test('No filter with recursion returns 5', () => {
    return findAutomations('sample', {
      recursive: true
    }).then(data => {
      expect(data.length).toBe(5)
    })
  });
})