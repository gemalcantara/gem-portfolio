# Component Documentation

This document provides detailed information about all React components used in the portfolio website.

## ProjectGallery Component

### Overview
An interactive image gallery component that displays project screenshots with thumbnail navigation and lightbox functionality.

### Props
```typescript
interface ProjectGalleryProps {
  projectId: string;      // Unique identifier for the project
  images: ProjectImage[]; // Array of image objects
  title: string;          // Project title for accessibility
  className?: string;     // Optional additional CSS classes
}

interface ProjectImage {
  src: string;     // Image source path
  alt: string;     // Alt text for accessibility
  width: number;   // Image width in pixels
  height: number;  // Image height in pixels
}
```

### Features
- **Thumbnail Grid**: Responsive grid layout of clickable thumbnails
- **Lightbox Modal**: Full-screen image viewing with navigation
- **Keyboard Navigation**: Arrow keys for navigation, Escape to close
- **Touch Support**: Swipe gestures on mobile devices
- **Responsive Design**: Adapts to different screen sizes
- **Accessibility**: ARIA labels and keyboard support

### Usage Example
```tsx
import ProjectGallery from './components/ProjectGallery';

const projectImages = [
  {
    src: '/project-images/ecommerce/homepage.png',
    alt: 'E-commerce homepage screenshot',
    width: 1200,
    height: 800
  },
  {
    src: '/project-images/ecommerce/cart.png',
    alt: 'Shopping cart interface',
    width: 1200,
    height: 800
  }
];

<ProjectGallery
  projectId="ecommerce"
  images={projectImages}
  title="E-commerce Platform"
  className="my-8"
/>
```

### State Management
```typescript
const [currentImageIndex, setCurrentImageIndex] = useState(0);
const [isLightboxOpen, setIsLightboxOpen] = useState(false);
```

### Methods
- `prevImage()`: Navigate to previous image in gallery
- `nextImage()`: Navigate to next image in gallery
- `openLightbox(index)`: Open lightbox with specific image
- `closeLightbox()`: Close the lightbox modal

### Styling Classes
```css
.project-gallery {
  /* Main container */
}

.gallery-grid {
  /* Thumbnail grid layout */
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}

.gallery-thumbnail {
  /* Individual thumbnail styling */
  cursor: pointer;
  transition: transform 0.2s ease;
}

.gallery-thumbnail:hover {
  transform: scale(1.05);
}

.lightbox-overlay {
  /* Full-screen overlay */
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  z-index: 9999;
}

.lightbox-content {
  /* Lightbox content container */
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
```

### Accessibility Features
- **ARIA Labels**: Descriptive labels for screen readers
- **Focus Management**: Proper focus handling in lightbox
- **Keyboard Navigation**: Full keyboard accessibility
- **Color Contrast**: High contrast for buttons and text

## Layout Component (layout.tsx)

### Overview
The root layout component that wraps the entire application and provides consistent structure.

### Features
- **HTML Document Structure**: Defines the basic HTML document
- **Global Styles**: Imports global CSS styles
- **Font Loading**: Loads and optimizes web fonts
- **Metadata**: Sets page metadata for SEO

### Structure
```tsx
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Metadata and external resources */}
      </head>
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}
```

## Main Page Component (page.tsx)

### Overview
The main portfolio page component that contains all sections and functionality.

### Sections
1. **Hero Section**: Introduction and personal information
2. **Skills Section**: Technical skills display
3. **Projects Section**: Project showcase with galleries
4. **Contact Section**: Contact form with EmailJS integration

### State Management
```typescript
// Project case study state
const [openProject, setOpenProject] = useState<Project | null>(null);

// Notification system
const [notification, setNotification] = useState<{
  message: string;
  type: 'success' | 'error';
  isVisible: boolean;
}>({ message: '', type: 'success', isVisible: false });

// Form submission state
const [isSubmitting, setIsSubmitting] = useState(false);

// Form reference
const form = useRef<HTMLFormElement | null>(null);
```

### Key Functions
- `handleOpenProject(projectId)`: Opens project case study modal
- `handleCloseProject()`: Closes project case study modal
- `handleContactSubmit(event)`: Processes contact form submission
- `showNotification(message, type)`: Displays notification to user

### Environment Variables
```typescript
const emailJsPublicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;
const emailJsServiceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
const emailJsTemplateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
const recaptchaSiteKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY;
```

## Notification System

### Overview
A custom notification system for displaying success and error messages to users.

### Implementation
```tsx
{notification.isVisible && (
  <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
    notification.type === 'success' 
      ? 'bg-green-500 text-white' 
      : 'bg-red-500 text-white'
  }`}>
    <div className="flex items-center justify-between">
      <span>{notification.message}</span>
      <button
        onClick={dismissNotification}
        className="ml-4 text-white hover:text-gray-200"
        aria-label="Dismiss notification"
      >
        ×
      </button>
    </div>
  </div>
)}
```

### Features
- **Auto-dismiss**: Automatically hides after 5 seconds
- **Manual dismiss**: Click X button to close immediately
- **Type styling**: Different colors for success/error states
- **Accessibility**: Proper ARIA labels and keyboard support

## Contact Form Component

### Overview
Integrated contact form with EmailJS and reCAPTCHA v3 protection.

### Form Fields
```html
<form ref={form} onSubmit={handleContactSubmit}>
  <input name="name" type="text" required />
  <input name="email" type="email" required />
  <input name="title" type="text" required />
  <textarea name="message" required></textarea>
  <button type="submit">Send Message</button>
</form>
```

### Validation
- **Client-side**: HTML5 validation and custom checks
- **Email format**: Validates email address format
- **Required fields**: All fields are mandatory
- **Spam protection**: reCAPTCHA v3 integration

### Submission Flow
1. Form validation
2. reCAPTCHA token generation
3. EmailJS API call
4. Success/error notification
5. Form reset on success

## Project Modal Component

### Overview
Modal component for displaying detailed project case studies.

### Structure
```tsx
{openProject && (
  <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
    <div className="modal-content">
      <header>
        <h2>{openProject.title}</h2>
        <button onClick={handleCloseProject}>×</button>
      </header>
      
      <section className="case-study">
        <div className="role">{openProject.caseStudy.role}</div>
        <div className="challenge">{openProject.caseStudy.challenge}</div>
        <div className="solution">{openProject.caseStudy.solution}</div>
        <div className="impact">{openProject.caseStudy.impact}</div>
        <div className="learnings">{openProject.caseStudy.learnings}</div>
      </section>
      
      <ProjectGallery
        projectId={openProject.id}
        images={openProject.images}
        title={openProject.title}
      />
    </div>
  </div>
)}
```

### Features
- **Backdrop close**: Click outside to close
- **Escape key**: Press ESC to close
- **Scroll prevention**: Prevents body scroll when open
- **Focus management**: Traps focus within modal

## Skills Display Component

### Overview
Component for displaying technical skills organized by category.

### Implementation
```tsx
<div className="skills-section">
  {Object.entries(skills).map(([category, skillList]) => (
    <div key={category} className="skill-category">
      <h4 className="category-title">{category}</h4>
      <div className="skill-tags">
        {skillList.map((skill) => (
          <span key={skill} className="skill-tag">
            {skill}
          </span>
        ))}
      </div>
    </div>
  ))}
</div>
```

### Styling
```css
.skill-category {
  margin-bottom: 2rem;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.skill-tag {
  background: #e5e7eb;
  color: #374151;
  padding: 0.25rem 0.75rem;
  border-radius: 9999px;
  font-size: 0.875rem;
  font-weight: 500;
}
```

## Responsive Design

### Breakpoints
```css
/* Mobile-first approach */
.component {
  /* Mobile styles */
}

@media (min-width: 640px) {
  /* Tablet styles */
}

@media (min-width: 1024px) {
  /* Desktop styles */
}

@media (min-width: 1280px) {
  /* Large desktop styles */
}
```

### Tailwind Responsive Classes
```tsx
<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
  {/* Responsive grid layout */}
</div>

<img className="w-full h-48 sm:h-64 lg:h-80 object-cover" />

<text className="text-sm sm:text-base lg:text-lg">
  {/* Responsive text sizing */}
</text>
```

## Performance Considerations

### Component Optimization
- **React.memo**: Prevent unnecessary re-renders
- **useCallback**: Memoize event handlers
- **useMemo**: Memoize expensive calculations
- **Dynamic imports**: Code splitting for heavy components

### Image Optimization
- **Next.js Image**: Automatic optimization and lazy loading
- **WebP format**: Modern image format support
- **Responsive images**: Different sizes for different viewports
- **Priority loading**: Prioritize above-the-fold images

### Bundle Optimization
- **Tree shaking**: Remove unused code
- **Code splitting**: Split code by routes and components
- **Compression**: Gzip/Brotli compression
- **Caching**: Proper cache headers for static assets

This component documentation provides a comprehensive guide for understanding and maintaining the portfolio website's React components.
