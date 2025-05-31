# Gemuel Joy Alcantara - Portfolio Website

A modern, responsive portfolio website showcasing full-stack development projects and skills. Built with Next.js 15, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional interface with smooth animations
- **Responsive Layout**: Optimized for desktop, tablet, and mobile devices
- **Project Gallery**: Interactive project showcase with lightbox functionality
- **Contact Form**: EmailJS integration with reCAPTCHA v3 protection
- **Type-Safe**: Full TypeScript implementation
- **Performance Optimized**: Built with Next.js 15 and Turbopack

## 🛠️ Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4
- **Email Service**: EmailJS
- **Security**: Google reCAPTCHA v3
- **Development**: ESLint, Prettier
- **Build Tool**: Turbopack

## 📁 Project Structure

```
gem-portfolio/
├── src/
│   ├── app/
│   │   ├── components/
│   │   │   └── ProjectGallery.tsx    # Image gallery component
│   │   ├── globals.css               # Global styles
│   │   ├── layout.tsx               # Root layout
│   │   └── page.tsx                 # Main portfolio page
│   └── data/
│       ├── personalInfo.ts          # Personal information data
│       ├── projects.ts              # Projects data
│       └── skills.ts                # Skills data
├── public/
│   ├── project-images/              # Project screenshots
│   └── files/                       # CV and documents
├── package.json
├── next.config.ts
├── tailwind.config.ts
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, pnpm, or bun

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd gem-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📧 EmailJS Setup

1. Create an account at [EmailJS](https://www.emailjs.com/)
2. Create a new email service
3. Create an email template with the following variables:
   - `{{name}}` - Sender's name
   - `{{email}}` - Sender's email
   - `{{title}}` - Message title
   - `{{message}}` - Message content
4. Get your Public Key, Service ID, and Template ID
5. Add them to your `.env.local` file

## 🔒 reCAPTCHA Setup

1. Go to [Google reCAPTCHA](https://www.google.com/recaptcha/)
2. Create a new site with reCAPTCHA v3
3. Add your domain (localhost for development)
4. Get your Site Key
5. Add it to your `.env.local` file

## 🎨 Customization

### Personal Information

Edit `src/data/personalInfo.ts` to update:
- Name and title
- Contact information
- Social media links
- Professional summary

### Projects

Edit `src/data/projects.ts` to:
- Add new projects
- Update project descriptions
- Add project images
- Modify case studies

### Skills

Edit `src/data/skills.ts` to update your technical skills.

### Styling

- Global styles: `src/app/globals.css`
- Tailwind configuration: `tailwind.config.ts`
- Component-specific styles: Inline with Tailwind classes

## 📱 Components

### ProjectGallery

Interactive image gallery component with features:
- Thumbnail navigation
- Lightbox view
- Keyboard navigation
- Touch/swipe support
- Responsive grid layout

**Props:**
```typescript
interface ProjectGalleryProps {
  projectId: string;
  images: ProjectImage[];
  title: string;
  className?: string;
}
```

## 🚀 Deployment

### Vercel (Recommended)

1. Push your code to GitHub/GitLab
2. Import project in [Vercel](https://vercel.com)
3. Add environment variables in Vercel dashboard
4. Deploy

### Other Platforms

The project can be deployed on any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 📋 Available Scripts

```bash
npm run dev          # Start development server with Turbopack
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
```

## 🔧 Configuration Files

- **Next.js**: `next.config.ts`
- **TypeScript**: `tsconfig.json`
- **Tailwind**: `tailwind.config.ts`
- **PostCSS**: `postcss.config.mjs`
- **ESLint**: `eslint.config.mjs`

## 🐛 Troubleshooting

### Common Issues

1. **EmailJS not working**
   - Check environment variables
   - Verify EmailJS service is active
   - Check browser console for errors

2. **Images not loading**
   - Ensure images are in `public/` directory
   - Check file paths in `projects.ts`
   - Verify image file extensions

3. **Styling issues**
   - Clear browser cache
   - Check Tailwind classes
   - Verify CSS imports

## 📄 License

This project is private and proprietary.

## 📞 Contact

**Gemuel Joy V. Alcantara**
- Email: gem.alcantara.ga@gmail.com
- LinkedIn: [linkedin.com/in/gemuel-joy-alcantara-233437187](https://www.linkedin.com/in/gemuel-joy-alcantara-233437187/)
- GitHub: [github.com/gemalcantara](https://github.com/gemalcantara)

---

Built with ❤️ using Next.js and TypeScript
