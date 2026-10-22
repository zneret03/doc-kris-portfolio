import type { Config } from "jest";
import nextJest from "next/jest.js";

// Loads next.config.ts and .env files, and wires up SWC plus the CSS, image,
// next/font and server-only mocks.
const createJestConfig = nextJest({ dir: "./" });

const config: Config = {
  coverageProvider: "v8",
  testEnvironment: "jsdom",
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  // Tests sit next to the code they cover: foo.tsx -> foo.test.tsx
  testMatch: ["<rootDir>/src/**/*.test.{ts,tsx}"],
  moduleNameMapper: {
    // Mirror the tsconfig "@/*" alias so jest.mock("@/...") resolves too
    "^@/(.*)$": "<rootDir>/src/$1",
  },
  clearMocks: true,
  collectCoverageFrom: [
    "src/**/*.{ts,tsx}",
    "!src/**/*.d.ts",
    // Route files are covered by E2E; shadcn primitives are generated code
    "!src/app/**",
    "!src/components/ui/**",
  ],
};

// Exported this way so next/jest can load the async Next.js config
export default createJestConfig(config);
