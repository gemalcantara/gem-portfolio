# Development Guide

This guide covers development practices, conventions, and workflows for the portfolio website.

## Development Workflow

### 1. Getting Started
```bash
# Clone and setup
git clone <repository-url>
cd gem-portfolio
npm install
cp .env.example .env.local # Configure environment variables
npm run dev
```

### 2. Development Server
- **Development**: `npm run dev` (with Turbopack for faster builds)
- **Production Build**: `npm run build && npm run start`
- **Linting**: `npm run lint`

### 3. File Structure Best Practices

```
src/
├── app/                    # Next.js App Router
│   ├── components/         # Reusable React components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Main page component
├── data/                  # Static data files
│   ├── personalInfo.ts    # Personal information
│   ├── projects.ts        # Projects data
│   └── skills.ts          # Skills data
└── types/                 # TypeScript type definitions (optional)
```

## Coding Standards

### TypeScript Guidelines

#### Type Definitions
```typescript
// Always export types for reusability
export type PersonalInfo = {
  name: string;
  title: string;
  // ... other properties
};

// Use interfaces for component props
interface ProjectGalleryProps {
  projectId: string;
  images: ProjectImage[];
  title: string;
  className?: string;
}
```

#### Component Structure
```typescript
"use client"; // Add for client components

import React, { useState, useEffect } from 'react';
import type { ComponentProps } from './types';

const ComponentName = ({ prop1, prop2 }: ComponentProps) => {
  // State declarations
  const [state, setState] = useState<StateType>(initialValue);
  
  // Effects
  useEffect(() => {
    // Effect logic
  }, [dependencies]);
  
  // Event handlers
  const handleEvent = (event: React.Event) => {
    // Handler logic
  };
  
  // Render
  return (
    <div className="component-class">
      {/* JSX content */}
    </div>
  );
};

export default ComponentName;
```

### CSS/Styling Guidelines

#### Tailwind CSS Best Practices
```tsx
// Use responsive design
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">

// Group related classes
<button className={`
  px-4 py-2 rounded-lg font-medium
  bg-blue-600 hover:bg-blue-700
  text-white transition-colors
  focus:outline-none focus:ring-2 focus:ring-blue-500
`}>

// Use custom CSS for complex animations
<div className="custom-animation">
```

#### Custom CSS Guidelines
```css
/* Use CSS custom properties for themes */
:root {
  --color-primary: #3b82f6;
  --color-secondary: #64748b;
  --transition-duration: 0.3s;
}

/* Follow BEM naming convention for custom classes */
.project-gallery__thumbnail {
  @apply cursor-pointer transition-transform hover:scale-105;
}

/* Use CSS Grid and Flexbox for layouts */
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}
```

## Component Development

### Creating New Components

#### 1. Component File Structure
```typescript
// components/NewComponent/index.tsx
import React from 'react';
import styles from './NewComponent.module.css'; // If using CSS modules

interface NewComponentProps {
  title: string;
  children?: React.ReactNode;
}

const NewComponent: React.FC<NewComponentProps> = ({ 
  title, 
  children 
}) => {
  return (
    <div className="new-component">
      <h2>{title}</h2>
      {children}
    </div>
  );
};

export default NewComponent;
```

#### 2. Component Guidelines
- **Single Responsibility**: Each component should have one clear purpose
- **Props Interface**: Always define TypeScript interfaces for props
- **Default Props**: Use default parameters instead of defaultProps
- **Error Boundaries**: Wrap components that might error
- **Accessibility**: Include ARIA labels and keyboard navigation

### State Management

#### Local State with useState
```typescript
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
});

// Update specific field
const updateField = (field: string, value: string) => {
  setFormData(prev => ({
    ...prev,
    [field]: value
  }));
};
```

#### Complex State with useReducer
```typescript
type ActionType = 
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string }
  | { type: 'SET_SUCCESS'; payload: string };

const notificationReducer = (state: NotificationState, action: ActionType) => {
  switch (action.type) {
    case 'SET_LOADING':
      return { ...state, isLoading: action.payload };
    case 'SET_ERROR':
      return { ...state, error: action.payload, isLoading: false };
    case 'SET_SUCCESS':
      return { ...state, success: action.payload, isLoading: false };
    default:
      return state;
  }
};
```

## Testing Guidelines

### Unit Testing Setup
```bash
npm install --save-dev @testing-library/react @testing-library/jest-dom jest
```

### Component Testing Example
```typescript
// __tests__/ProjectGallery.test.tsx
import { render, screen, fireEvent } from '@testing-library/react';
import ProjectGallery from '../components/ProjectGallery';

const mockProps = {
  projectId: 'test-project',
  images: [
    { src: '/test.jpg', alt: 'Test', width: 800, height: 600 }
  ],
  title: 'Test Project'
};

describe('ProjectGallery', () => {
  test('renders project title', () => {
    render(<ProjectGallery {...mockProps} />);
    expect(screen.getByText('Test Project')).toBeInTheDocument();
  });

  test('opens lightbox on image click', () => {
    render(<ProjectGallery {...mockProps} />);
    const image = screen.getByAltText('Test');
    fireEvent.click(image);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
  });
});
```

## Performance Optimization

### Code Splitting
```typescript
// Dynamic imports for heavy components
import dynamic from 'next/dynamic';

const ProjectGallery = dynamic(() => import('./ProjectGallery'), {
  loading: () => <div>Loading gallery...</div>,
  ssr: false // If component doesn't need SSR
});
```

### Image Optimization
```typescript
import Image from 'next/image';

// Always specify dimensions
<Image
  src="/project-images/screenshot.png"
  alt="Project screenshot"
  width={1200}
  height={800}
  priority={index < 2} // Prioritize above-the-fold images
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQ..." // Optional
/>
```

### Bundle Analysis
```bash
# Analyze bundle size
npm run build
npx @next/bundle-analyzer
```

## Error Handling

### Error Boundaries
```typescript
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Error caught by boundary:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}
```

### Async Error Handling
```typescript
const handleAsyncOperation = async () => {
  try {
    setIsLoading(true);
    const result = await riskyOperation();
    setSuccess('Operation completed successfully');
  } catch (error) {
    console.error('Operation failed:', error);
    setError('Operation failed. Please try again.');
  } finally {
    setIsLoading(false);
  }
};
```

## Accessibility (a11y)

### ARIA Labels and Roles
```tsx
<button
  aria-label="Close dialog"
  aria-expanded={isOpen}
  role="button"
  onClick={handleClose}
>
  <CloseIcon aria-hidden="true" />
</button>

<div role="dialog" aria-modal="true" aria-labelledby="dialog-title">
  <h2 id="dialog-title">Project Details</h2>
</div>
```

### Keyboard Navigation
```typescript
const handleKeyDown = (event: React.KeyboardEvent) => {
  switch (event.key) {
    case 'Escape':
      handleClose();
      break;
    case 'ArrowLeft':
      previousImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
  }
};
```

### Focus Management
```typescript
const dialogRef = useRef<HTMLDivElement>(null);

useEffect(() => {
  if (isOpen && dialogRef.current) {
    dialogRef.current.focus();
  }
}, [isOpen]);
```

## SEO Optimization

### Metadata
```typescript
// app/layout.tsx or page.tsx
export const metadata = {
  title: 'Gemuel Joy Alcantara - Full-Stack Developer',
  description: 'Portfolio showcasing full-stack development projects...',
  keywords: 'full-stack developer, Laravel, React, portfolio',
  authors: [{ name: 'Gemuel Joy Alcantara' }],
  viewport: 'width=device-width, initial-scale=1',
};
```

### Structured Data
```typescript
const structuredData = {
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Gemuel Joy Alcantara",
  "jobTitle": "Full-Stack Web Developer",
  "url": "https://yourportfolio.com",
  "sameAs": [
    "https://linkedin.com/in/gemuel-joy-alcantara-233437187",
    "https://github.com/gemalcantara"
  ]
};
```

## Deployment

### Build Optimization
```typescript
// next.config.ts
const nextConfig = {
  output: 'standalone', // For Docker deployment
  experimental: {
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },
};
```

### Environment Configuration
```bash
# .env.local (development)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=dev_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=dev_site_key

# .env.production (production)
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=prod_key
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=prod_site_key
```

## Debugging

### Development Tools
```typescript
// Debug component props
const DebugProps = ({ children, ...props }) => {
  if (process.env.NODE_ENV === 'development') {
    console.log('Component props:', props);
  }
  return children;
};

// Performance profiling
import { Profiler } from 'react';

const onRenderCallback = (id, phase, actualDuration) => {
  console.log('Render performance:', { id, phase, actualDuration });
};

<Profiler id="ProjectGallery" onRender={onRenderCallback}>
  <ProjectGallery {...props} />
</Profiler>
```

### Error Tracking
```typescript
// Client-side error tracking
window.addEventListener('unhandledrejection', (event) => {
  console.error('Unhandled promise rejection:', event.reason);
  // Send to error tracking service
});

window.addEventListener('error', (event) => {
  console.error('Global error:', event.error);
  // Send to error tracking service
});
```

## Git Workflow

### Branch Naming
- `feature/add-new-project`
- `fix/contact-form-validation`
- `chore/update-dependencies`
- `docs/update-readme`

### Commit Messages
```
feat: add project gallery lightbox functionality
fix: resolve contact form validation issues
docs: update setup documentation
chore: upgrade Next.js to version 15
style: format code with prettier
refactor: extract reusable components
test: add unit tests for ProjectGallery
```

### Pre-commit Hooks
```json
// package.json
{
  "husky": {
    "hooks": {
      "pre-commit": "lint-staged"
    }
  },
  "lint-staged": {
    "*.{js,jsx,ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,scss,md}": ["prettier --write"]
  }
}
```

This development guide should help maintain code quality and consistency throughout the project development lifecycle.
