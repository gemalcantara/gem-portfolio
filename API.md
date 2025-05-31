# API Documentation

This document describes the external APIs and services used in the portfolio website.

## EmailJS Integration

### Overview
EmailJS allows sending emails directly from the frontend without a backend server. The contact form uses EmailJS to send inquiries to your email.

### Configuration

#### Environment Variables
```env
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id  
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
```

#### Template Parameters
The contact form sends the following parameters to your EmailJS template:

| Parameter | Type | Description |
|-----------|------|-------------|
| `name` | string | Sender's full name |
| `email` | string | Sender's email address |
| `title` | string | Subject/title of the message |
| `message` | string | The message content |

#### Example Template
```html
From: {{name}} <{{email}}>
Subject: Portfolio Contact: {{title}}

Hello,

You have received a new message from your portfolio website:

Name: {{name}}
Email: {{email}}
Subject: {{title}}

Message:
{{message}}

---
Sent from your portfolio contact form
```

### Usage in Code

```typescript
import emailjs from '@emailjs/browser';

const templateParams = {
  name: formData.get('name') as string,
  email: formData.get('email') as string,
  title: formData.get('title') as string,
  message: formData.get('message') as string,
};

await emailjs.send(
  emailJsServiceId,
  emailJsTemplateId,
  templateParams,
  emailJsPublicKey
);
```

### Error Handling

The contact form handles these scenarios:
- Network errors
- Invalid API credentials
- EmailJS service downtime
- Form validation errors

## Google reCAPTCHA v3

### Overview
reCAPTCHA v3 provides invisible spam protection for the contact form by analyzing user behavior and assigning a risk score.

### Configuration

#### Environment Variable
```env
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
```

#### Implementation
```typescript
// Load reCAPTCHA script
useEffect(() => {
  const script = document.createElement('script');
  script.src = `https://www.google.com/recaptcha/api.js?render=${recaptchaSiteKey}`;
  script.async = true;
  script.defer = true;
  document.head.appendChild(script);
}, [recaptchaSiteKey]);

// Execute reCAPTCHA
const token = await new Promise<string>((resolve, reject) => {
  window.grecaptcha.ready(() => {
    window.grecaptcha.execute(recaptchaSiteKey, { action: 'contact_form' })
      .then(resolve)
      .catch(reject);
  });
});
```

### Score Interpretation
- Score 1.0: Very likely a good interaction
- Score 0.9: Likely a good interaction  
- Score 0.7: Likely a good interaction
- Score 0.3: Suspicious, may be a bot
- Score 0.1: Very likely a bot

### Actions
The following action is used:
- `contact_form`: For contact form submissions

## Next.js Image Optimization

### Overview
Next.js automatically optimizes images for better performance and user experience.

### Configuration

#### next.config.ts
```typescript
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [], // Add external image domains if needed
    formats: ['image/webp', 'image/avif'],
  },
};
```

### Usage
```typescript
import Image from 'next/image';

<Image
  src="/project-images/project/screenshot.png"
  alt="Project screenshot"
  width={1200}
  height={800}
  priority={true} // For above-the-fold images
  placeholder="blur" // Optional: blur placeholder
/>
```

### Benefits
- Automatic format optimization (WebP, AVIF)
- Responsive image sizing
- Lazy loading by default
- Built-in placeholder support

## TypeScript Type Definitions

### PersonalInfo Type
```typescript
export type PersonalInfo = {
  name: string;
  title: string;
  tagline: string;
  intro: string;
  email: string;
  phone: string;
  location: string;
  linkedin: string;
  github: string;
};
```

### Project Type
```typescript
export type Project = {
  id: string;
  title: string;
  icon: string;
  technologies: string[];
  shortDesc: string;
  images: {
    src: string;
    alt: string;
    width: number;
    height: number;
  }[];
  caseStudy: {
    role: string;
    challenge: string;
    solution: string;
    impact: string;
    learnings: string;
  };
};
```

### ProjectImage Type
```typescript
interface ProjectImage {
  src: string;
  alt: string;
  width: number;
  height: number;
}
```

### Skills Type
```typescript
type Skills = {
  [category: string]: string[];
};
```

## Component Props

### ProjectGallery Component
```typescript
interface ProjectGalleryProps {
  projectId: string;
  images: ProjectImage[];
  title: string;
  className?: string;
}
```

#### Methods
- `prevImage()`: Navigate to previous image
- `nextImage()`: Navigate to next image
- `openLightbox(index)`: Open lightbox with specific image
- `closeLightbox()`: Close lightbox modal

## Error Handling

### Contact Form Errors
```typescript
type NotificationType = 'success' | 'error';

interface Notification {
  message: string;
  type: NotificationType;
  isVisible: boolean;
}
```

### Common Error Messages
- "Failed to send message. Please try again later."
- "Please fill in all required fields."
- "Invalid email address format."
- "Message sent successfully!"

## Performance Considerations

### Code Splitting
- Components are loaded on demand
- Dynamic imports for heavy dependencies
- Route-based code splitting with App Router

### Caching Strategy
- Static assets cached indefinitely
- API responses cached appropriately
- Image optimization with Next.js

### Bundle Analysis
```bash
npm run build
npx @next/bundle-analyzer
```

## Security Measures

### Client-Side Security
- Input validation on all form fields
- XSS protection with React's built-in escaping
- CSRF protection with reCAPTCHA

### Environment Variables
- All public variables prefixed with `NEXT_PUBLIC_`
- Sensitive keys kept server-side only
- No hardcoded secrets in the codebase

### Content Security Policy
Consider adding CSP headers for enhanced security:
```typescript
// next.config.ts
const securityHeaders = [
  {
    key: 'Content-Security-Policy',
    value: `
      default-src 'self';
      script-src 'self' 'unsafe-eval' 'unsafe-inline' *.google.com *.emailjs.com;
      style-src 'self' 'unsafe-inline';
      img-src 'self' data: blob:;
      connect-src 'self' *.emailjs.com;
    `.replace(/\s{2,}/g, ' ').trim()
  }
];
```

## Monitoring and Analytics

### Performance Monitoring
- Core Web Vitals tracking
- Real User Monitoring (RUM)
- Error boundary implementation

### Analytics Integration
```typescript
// Add Google Analytics or similar
useEffect(() => {
  // Analytics initialization
}, []);
```

## Rate Limiting

### EmailJS Limits
- Free tier: 200 emails/month
- Paid tiers available for higher volume
- Consider implementing client-side rate limiting

### reCAPTCHA Limits
- 1 million API calls/month (free)
- Suitable for most portfolio websites

## Deployment Considerations

### Environment-Specific Configuration
```typescript
// Different configs for development/production
const config = {
  development: {
    emailjs: {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_DEV,
    }
  },
  production: {
    emailjs: {
      publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY_PROD,
    }
  }
};
```

### Health Checks
Consider adding health check endpoints for monitoring:
```typescript
// app/api/health/route.ts
export async function GET() {
  return Response.json({ status: 'healthy', timestamp: new Date().toISOString() });
}
```
