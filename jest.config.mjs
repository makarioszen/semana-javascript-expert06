const defaultConfig = {
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  coverageReporters: [
    "text",
    "lcov"
  ],
  coverageThreshold: {
    global: {
      branch: 100,
      functions: 100,
      lines: 100,
      statements: 100,
    }
  },
  maxWorkers: '50%',
  watchPathignorePatterns: [
    "node_modules"
  ],
  transformIgnorePatterns: [
    "node_modules"
  ]

}

export default {
  projects: [{
    ...defaultConfig,
    testEnvironment: 'node',
    displayName: 'BACKEND',
    collectCoverageFrom: [
      'server/',
      '!server/index.js'
    ],
    transformIgnorePatterns: [
      ...defaultConfig.transformIgnorePatterns,
      'public'
    ],
    testMatch: [
      '**/tests/**/server/**/*.test.js'
    ]
  }, {
    ...defaultConfig,
    testEnvironment: 'jsdom',
    displayName: 'FRONTEND',
    collectCoverageFrom: [
      'public/'
    ],
    transformIgnorePatterns: [
      ...defaultConfig.transformIgnorePatterns,
      'server'
    ],
    testMatch: [
      '**/tests/**/public/**/*.test.js'
    ]
  }]

}