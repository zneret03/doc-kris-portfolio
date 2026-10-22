---
name: ui-testing
description: Write, run and fix Jest + React Testing Library unit tests for UI in this repo. Use when creating or changing a component, hook or helper, when asked to add or fix tests, or when `yarn test` fails.
---

# UI unit tests (Jest + React Testing Library)

## What's already set up

- Jest 30 through `next/jest` (`jest.config.ts`): SWC transforms, mocked CSS, image and `next/font` imports, a stubbed `server-only`, and `.env` loading.
- `jsdom` environment. The `@testing-library/jest-dom` matchers load in `jest.setup.ts`, so tests don't import them.
- Only `src/**/*.test.{ts,tsx}` runs. The test sits next to the file it covers: `project-card.tsx` → `project-card.test.tsx`.
- `clearMocks` is on: recorded calls reset before every test, and implementations set in `beforeEach` still apply.
- `@/` imports and `jest.mock("@/…")` both resolve to `src/`.
- `jest.setup.ts` stubs `PointerEvent`, which jsdom lacks and Base UI constructs when a Radio is clicked.
- Server-side code that uses `fetch` or `AbortSignal.timeout` (server actions, delivery helpers, structured data) runs best in Node: start the test file with `/** @jest-environment node */`.
- Reference tests: `src/components/ui/button.test.tsx` (a component), `src/features/clinic/components/consultation-form.test.tsx` (a form with a server action passed in as a prop), `src/features/clinic/deliver-request.test.ts` (mocking `fetch` in the Node environment).

## Commands

```bash
yarn test                          # everything
yarn test src/features/projects    # one folder or file
yarn test -t "shows the filters"   # by test name
yarn test:watch
yarn test:coverage                 # report in coverage/ (git-ignored)
```

## Workflow

1. List what a user can observe: text, headings, links, control states, what changes after an interaction, what appears conditionally. Those are the assertions.
2. Write the test beside the component, starting from the template below.
3. Run that file until it passes, then `yarn test` and `yarn typecheck`. Test files are type-checked too.
4. Make sure the test can fail: break the behavior or the assertion for a moment and watch it go red.

## Template

```tsx
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { ProjectList } from "@/features/projects/components/project-list";

const projects = [
  { slug: "first", title: "First project", tags: ["design"] },
  { slug: "second", title: "Second project", tags: ["research"] },
];

describe("ProjectList", () => {
  it("shows only projects with the selected tag", async () => {
    const user = userEvent.setup();
    render(<ProjectList projects={projects} />);

    await user.click(screen.getByRole("button", { name: "Research" }));

    expect(screen.getByRole("heading", { name: "Second project" })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: "First project" })).not.toBeInTheDocument();
  });
});
```

## Rules

- Query the way a user finds things, in this order: `getByRole` with `name`, `getByLabelText`, `getByText`, `getByAltText`, and only then `getByTestId`, with a comment saying why.
- Use `screen`, not `container.querySelector` or destructured render results.
- `getBy*` when the element must exist, `queryBy*` only to assert absence, `await findBy*` for anything that appears asynchronously. No sleeps or timers to wait for UI.
- Create `const user = userEvent.setup()` before `render`, then `await user.click(...)`, `user.type`, `user.keyboard`, `user.tab`. Reach for `fireEvent` only for events user-event can't produce.
- Assert with jest-dom matchers: `toBeInTheDocument`, `toHaveAccessibleName`, `toHaveAttribute`, `toBeDisabled`, `toHaveValue`, `toBeVisible`.
- Don't assert Tailwind class names, internal state, props passed to children, or snapshots of whole trees.
- Don't test unmodified shadcn primitives in `src/components/ui/`; test our components that use them.
- One behavior per `it`, written as a sentence about that behavior ("disables send until the message is filled in").

## Next.js in tests

- **Async Server Components can't render in Jest.** Split them: the page or an async wrapper loads data and passes it to a sync component, and the sync component gets the unit test with fixture props. The loading path is covered by `yarn build` (and E2E tests if they're added later).
- Sync Server Components render fine.
- `next/link` renders a plain `<a>` and `next/image` an `<img>`. Query them by role or alt text; no mocks needed.
- `next/navigation`: outside the App Router, `useRouter()` throws `invariant expected app router to be mounted`, and `usePathname()` and `useSearchParams()` return `null`. Mock the module in any test whose component uses them:

  ```tsx
  import { usePathname, useRouter } from "next/navigation";

  jest.mock("next/navigation", () => ({
    usePathname: jest.fn(),
    useRouter: jest.fn(),
    useSearchParams: jest.fn(() => new URLSearchParams()),
  }));

  const push = jest.fn();

  beforeEach(() => {
    jest.mocked(usePathname).mockReturnValue("/work");
    jest.mocked(useRouter).mockReturnValue({
      push,
      replace: jest.fn(),
      refresh: jest.fn(),
      back: jest.fn(),
      forward: jest.fn(),
      prefetch: jest.fn(),
      bfcacheId: "test",
    });
  });
  ```

- Forms that call a server action: pass the action in as a prop and give the test a `jest.fn()`, so the test covers the form's UI states. Test the action's logic as a plain function.

## shadcn and Base UI components in tests

- Overlays (Dialog, Sheet, Popover, Menu) render into a portal on `document.body`, and `screen` still finds them. Open them through their trigger with `user.click`, then `await screen.findByRole("dialog", { name: "…" })`. Opening and closing (close button and Escape) works in this setup. `src/components/layout/mobile-nav.test.tsx` shows the pattern.
- Clicking a `next/link` makes jsdom try to navigate. To test what a click does without that, add a document-level listener that calls `preventDefault()`; React's handlers still run (see `mobile-nav.test.tsx`).
- Base UI's `Button` always has `role="button"`, even when it renders another element.
- Base UI radios are `<span role="radio">` elements: `user.click(screen.getByRole("radio", { name }))` and `toBeChecked()` both work. In a real browser (Playwright), click the visible label instead, since the radio itself is visually hidden.
- If a component needs a browser API jsdom lacks (`matchMedia`, `ResizeObserver`, `IntersectionObserver`), add one minimal stub to `jest.setup.ts` rather than per test, guarded with `typeof window !== "undefined"` for Node-environment tests. The `PointerEvent` stub there is the pattern.

## When a test run fails

- `SyntaxError: Cannot use import statement outside a module` from a package: it ships ESM only. Add it to `transpilePackages` in `next.config.ts`; `next/jest` then transforms it.
- A warning that an update was not wrapped in `act(...)`: something changed after the test stopped waiting. `await` the user-event call or a `findBy*` for the end state.
- `Unable to find role="…"`: read the accessibility tree that the error prints. The name you queried usually differs from the rendered text, or the element isn't rendered yet (use `findBy*`).
