const findAutomations = require('../src/lib/findAutomations').default
const path = require('path')

describe('Find automations system', () => {
  test('should return 2 files', () => {
    return findAutomations(path.resolve(path.join(__dirname, 'sampleFolder')), {
      recursive: false,
      filter: (file) => /\.ts$/.test(file)
    }).then(data => {
      expect(data.length).toBe(2)
    })
  });

  test('should return 3 files', () => {
    return findAutomations(path.resolve(path.join(__dirname, 'sampleFolder')), {
      recursive: true,
      filter: (file) => /\.ts$/.test(file)
    }).then(data => {
      expect(data.length).toBe(3)
    })
  });

  test('should return 3 files', () => {
    return findAutomations(path.resolve(path.join(__dirname, 'sampleFolder')), {
      recursive: false
    }).then(data => {
      expect(data.length).toBe(3)
    })
  });
})