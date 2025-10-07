# Testing Guide

This boilerplate includes a complete testing setup with Jest and React Testing Library.

## 🧪 What's Included

- **Jest** - JavaScript testing framework
- **React Testing Library** - Component testing utilities
- **@testing-library/user-event** - User interaction simulation
- **@testing-library/jest-dom** - Custom Jest matchers for DOM
- **jest-environment-jsdom** - Browser-like environment for tests

## 🚀 Running Tests

```bash
# Run all tests once
npm test

# Run tests in watch mode (re-runs on file changes)
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

## 📁 Test File Structure

Tests should be placed in `__tests__` directories or named with `.test.tsx` or `.spec.tsx` extensions:

```
src/
├── components/
│   └── ui/
│       ├── button.tsx
│       └── __tests__/
│           └── button.test.tsx       # ✅ Component tests here
├── lib/
│   ├── utils.ts
│   └── utils.test.ts                 # ✅ Or next to the file
└── app/
    └── page.test.tsx                 # ✅ Or anywhere in src/
```

## 📝 Writing Tests

### Basic Component Test

```typescript
import { render, screen } from '@testing-library/react'
import { Button } from '@/components/ui/button'

describe('Button Component', () => {
  it('renders button with text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByRole('button', { name: /click me/i })).toBeInTheDocument()
  })
})
```

### Testing User Interactions

```typescript
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { Button } from '@/components/ui/button'

it('calls onClick handler when clicked', async () => {
  const handleClick = jest.fn()
  const user = userEvent.setup()
  
  render(<Button onClick={handleClick}>Click me</Button>)
  await user.click(screen.getByRole('button'))
  
  expect(handleClick).toHaveBeenCalledTimes(1)
})
```

### Testing with Next.js Features

```typescript
import { render, screen } from '@testing-library/react'
import { useRouter } from 'next/navigation'

// Mock Next.js router
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}))

it('navigates on button click', async () => {
  const push = jest.fn()
  ;(useRouter as jest.Mock).mockReturnValue({ push })
  
  render(<MyComponent />)
  await userEvent.click(screen.getByRole('button', { name: /go home/i }))
  
  expect(push).toHaveBeenCalledWith('/')
})
```

### Testing with NextAuth

```typescript
import { render, screen } from '@testing-library/react'
import { useSession } from 'next-auth/react'

// Mock NextAuth session
jest.mock('next-auth/react', () => ({
  useSession: jest.fn(),
}))

it('shows user name when authenticated', () => {
  ;(useSession as jest.Mock).mockReturnValue({
    data: { user: { name: 'John Doe' } },
    status: 'authenticated',
  })
  
  render(<UserProfile />)
  expect(screen.getByText('John Doe')).toBeInTheDocument()
})
```

## 🎯 Testing Best Practices

### 1. Test User Behavior, Not Implementation

❌ **Bad**: Testing internal state
```typescript
expect(component.state.isOpen).toBe(true)
```

✅ **Good**: Testing what users see
```typescript
expect(screen.getByRole('dialog')).toBeVisible()
```

### 2. Use Accessible Queries

Prefer queries that reflect how users interact with your app:

```typescript
// ✅ Best - How users find elements
screen.getByRole('button', { name: /submit/i })
screen.getByLabelText(/email address/i)
screen.getByPlaceholderText(/enter your email/i)

// ⚠️ Okay - Semantic queries
screen.getByText(/welcome/i)
screen.getByAltText(/profile picture/i)

// ❌ Avoid - Implementation details
screen.getByTestId('submit-button')
screen.getByClassName('btn-primary')
```

### 3. Async Testing

Always use `await` with user interactions:

```typescript
const user = userEvent.setup()
await user.click(button)
await user.type(input, 'Hello')
```

### 4. Clean Up After Tests

```typescript
afterEach(() => {
  jest.clearAllMocks()
  cleanup()
})
```

## 📊 Coverage Reports

Generate coverage reports to see which code is tested:

```bash
npm run test:coverage
```

This creates a `coverage/` directory with an HTML report. Open `coverage/lcov-report/index.html` in your browser to view it.

### Coverage Thresholds

You can set minimum coverage thresholds in `jest.config.js`:

```javascript
module.exports = {
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
}
```

## 🧩 Example Tests in This Project

Check out these examples:
- `src/components/ui/__tests__/button.test.tsx` - Basic component testing

## 🔧 Configuration Files

- `jest.config.js` - Jest configuration (module aliases, test environment)
- `jest.setup.js` - Global test setup (imports jest-dom matchers)
- `jest-dom.d.ts` - TypeScript definitions for jest-dom matchers

## 📚 Common Jest Matchers

### Basic Matchers
```typescript
expect(value).toBe(expected)
expect(value).toEqual(expected)
expect(value).toBeTruthy()
expect(value).toBeFalsy()
expect(value).toBeNull()
expect(value).toBeUndefined()
```

### jest-dom Matchers
```typescript
expect(element).toBeInTheDocument()
expect(element).toBeVisible()
expect(element).toHaveClass('btn-primary')
expect(element).toHaveAttribute('href', '/home')
expect(element).toHaveTextContent('Hello')
expect(input).toHaveValue('John')
expect(button).toBeDisabled()
expect(button).toBeEnabled()
```

### Function Matchers
```typescript
expect(mockFn).toHaveBeenCalled()
expect(mockFn).toHaveBeenCalledTimes(2)
expect(mockFn).toHaveBeenCalledWith('arg1', 'arg2')
```

## 🐛 Debugging Tests

### 1. Use `screen.debug()`
```typescript
render(<MyComponent />)
screen.debug() // Prints DOM to console
```

### 2. Run Single Test
```bash
npm test -- button.test.tsx
```

### 3. Run Tests with Verbose Output
```bash
npm test -- --verbose
```

### 4. Update Snapshots
```bash
npm test -- -u
```

## 🔗 Resources

- [Jest Documentation](https://jestjs.io/docs/getting-started)
- [React Testing Library](https://testing-library.com/react)
- [Testing Library Queries](https://testing-library.com/docs/queries/about)
- [Common Testing Mistakes](https://kentcdodds.com/blog/common-mistakes-with-react-testing-library)
- [Jest DOM Matchers](https://github.com/testing-library/jest-dom)

## 🎯 Next Steps

1. Add more component tests in `src/components/ui/__tests__/`
2. Test your custom components
3. Add integration tests for API routes
4. Set up E2E tests with Playwright (optional)
5. Configure CI/CD to run tests on every push

---

Happy testing! 🧪✨
