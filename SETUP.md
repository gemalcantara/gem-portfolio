# Setup Guide

This guide will help you set up the Gemuel Joy Alcantara Portfolio website from scratch.

## Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (version 18 or higher)
- **npm**, **yarn**, **pnpm**, or **bun** package manager
- **Git** for version control

## Step-by-Step Setup

### 1. Environment Setup

Create a `.env.local` file in the root directory with the following variables:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id_here

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key_here
RECAPTCHA_SECRET_KEY=your_recaptcha_secret_key_here
```

### 2. EmailJS Configuration

1. **Create EmailJS Account**
   - Visit [https://www.emailjs.com/](https://www.emailjs.com/)
   - Sign up for a free account

2. **Add Email Service**
   - Go to Email Services
   - Add your preferred email service (Gmail, Outlook, etc.)
   - Follow the setup instructions

3. **Create Email Template**
   - Go to Email Templates
   - Create a new template with these variables:
     ```
     From: {{name}} <{{email}}>
     Subject: Portfolio Contact: {{title}}
     
     Message:
     {{message}}
     
     Sender Details:
     Name: {{name}}
     Email: {{email}}
     ```

4. **Get Credentials**
   - Public Key: Account → General → Public Key
   - Service ID: Email Services → Your Service → Service ID
   - Template ID: Email Templates → Your Template → Template ID

### 3. Google reCAPTCHA Setup

1. **Visit reCAPTCHA Admin**
   - Go to [https://www.google.com/recaptcha/](https://www.google.com/recaptcha/)
   - Sign in with your Google account

2. **Create New Site**
   - Click "+" to add a new site
   - Choose reCAPTCHA v3
   - Add domains:
     - `localhost` (for development)
     - Your production domain

3. **Get Site Key**
   - Copy the Site Key from the reCAPTCHA dashboard
   - Add it to your `.env.local` file

4. **Get Secret Key**
   - Copy the Secret Key from the reCAPTCHA dashboard
   - Add it to your `.env.local` file as `RECAPTCHA_SECRET_KEY`
   - **Important**: The secret key should never be exposed to the client-side

### 4. Content Customization

#### Personal Information (`src/data/personalInfo.ts`)

Update the following fields:
```typescript
export const personalInfo: PersonalInfo = {
  name: "Your Full Name",
  title: "Your Professional Title",
  tagline: "Your professional tagline",
  intro: "Your professional introduction",
  email: "your.email@example.com",
  phone: "+1234567890",
  location: "Your Location",
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
};
```

#### Projects (`src/data/projects.ts`)

Add your projects following this structure:
```typescript
{
  id: 'unique-project-id',
  title: "Project Title",
  icon: '🚀', // Emoji or icon
  technologies: ["Tech1", "Tech2", "Tech3"],
  shortDesc: "Brief project description",
  images: [
    {
      src: "/project-images/folder/image.png",
      alt: "Image description",
      width: 1200,
      height: 800
    }
  ],
  caseStudy: {
    role: "Your role in the project",
    challenge: "What problem you solved",
    solution: "How you solved it",
    impact: "The results achieved",
    learnings: "What you learned"
  }
}
```

#### Skills (`src/data/skills.ts`)

Update your technical skills:
```typescript
export const skills = {
  "Languages & Frameworks": ["PHP", "JavaScript", "React"],
  "Databases": ["MySQL", "MongoDB"],
  "Tools & Technologies": ["Docker", "Git"],
  "DevOps & Source Control": ["GitLab", "AWS"],
  "AI Integration": ["OpenAI", "Claude"],
};
```

### 5. Adding Project Images

1. **Create Directory Structure**
   ```
   public/
   └── project-images/
       ├── project-1/
       │   ├── screenshot1.png
       │   └── screenshot2.png
       └── project-2/
           ├── demo1.png
           └── demo2.png
   ```

2. **Image Guidelines**
   - Use high-quality screenshots
   - Recommended dimensions: 1200x800px or 16:10 aspect ratio
   - Optimize images for web (use WebP if possible)
   - Use descriptive filenames

### 6. Development Server

Start the development server:

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) to see your portfolio.

### 7. Testing Contact Form

1. Fill out the contact form
2. Check your email for the message
3. Verify reCAPTCHA is working (no visible challenge)
4. Check browser console for any errors

## Common Issues

### EmailJS Not Working
- Verify all environment variables are set
- Check EmailJS dashboard for service status
- Ensure template variables match the form fields

### Images Not Loading
- Check file paths in `projects.ts`
- Ensure images are in the `public/` directory
- Verify image file extensions and names

### Styling Issues
- Clear browser cache and reload
- Check Tailwind CSS classes
- Verify all CSS files are imported

### Environment Variables
- Restart development server after changing `.env.local`
- Check variable names (must start with `NEXT_PUBLIC_`)
- Ensure no extra spaces in variable values

## Production Deployment

### Vercel Deployment

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Add environment variables in project settings
   - Deploy

3. **Update reCAPTCHA**
   - Add your production domain to reCAPTCHA settings
   - Update the Site Key if needed

### Other Platforms

The project can be deployed on:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## Security Considerations

- Keep your `.env.local` file private
- Never commit environment variables to Git
- Use HTTPS in production
- Regularly update dependencies
- Monitor for security vulnerabilities

## Performance Optimization

- Optimize images (use Next.js Image component)
- Enable Gzip compression
- Use a CDN for static assets
- Monitor Core Web Vitals
- Implement proper caching headers

## Support

If you encounter any issues:

1. Check the browser console for errors
2. Review the setup steps
3. Verify environment variables
4. Check the project's GitHub issues
5. Contact the developer for assistance
