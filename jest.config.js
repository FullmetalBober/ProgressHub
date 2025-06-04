/** @type {import('jest').Config} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  roots: ['<rootDir>/express'],
  testMatch: ['**/__tests__/**/*.test.ts', '**/?(*.)+(spec|test).ts'],
  transform: {
    '^.+\\.tsx?$': [
      'ts-jest',
      {
        tsconfig: {
          module: 'commonjs',
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '^@/zodAutoGenSchemas$': '<rootDir>/prisma/zod/index',
  },
  setupFilesAfterEnv: ['<rootDir>/express/__tests__/setup.ts'],
  collectCoverageFrom: [
    'express/**/*.ts',
    '!express/**/*.d.ts',
    '!express/__tests__/**',
    '!express/server.ts',
  ],
  coverageDirectory: 'coverage',
  coverageReporters: ['text', 'lcov', 'html'],
};
