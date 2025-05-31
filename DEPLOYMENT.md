# Deployment Guide

This guide covers deploying the portfolio website to various hosting platforms and environments.

## Prerequisites

Before deploying, ensure you have:
- Built and tested the application locally
- Configured all environment variables
- Optimized images and assets
- Set up external services (EmailJS, reCAPTCHA)

## Vercel Deployment (Recommended)

### Quick Deploy

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Ready for deployment"
   git push origin main
   ```

2. **Import to Vercel**
   - Visit [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Configure project settings

3. **Environment Variables**
   In Vercel dashboard, go to Settings → Environment Variables:
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_emailjs_public_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_emailjs_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_emailjs_template_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_site_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Wait for build to complete
   - Visit your deployed site

### Custom Domain Setup

1. **Add Domain in Vercel**
   - Go to Project Settings → Domains
   - Add your custom domain
   - Configure DNS records as shown

2. **DNS Configuration**
   Add these records to your domain's DNS:
   ```
   Type: A
   Name: @
   Value: 76.76.19.61
   
   Type: CNAME  
   Name: www
   Value: cname.vercel-dns.com
   ```

3. **SSL Certificate**
   - Vercel automatically provisions SSL certificates
   - HTTPS will be available within minutes

### Environment-Specific Deployments

#### Production Environment
```bash
# .env.production
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=prod_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=prod_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=prod_template_id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=prod_recaptcha_key
```

#### Staging Environment
```bash
# .env.staging
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=staging_key_here
NEXT_PUBLIC_EMAILJS_SERVICE_ID=staging_service_id
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=staging_template_id
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=staging_recaptcha_key
```

## Netlify Deployment

### Manual Deploy

1. **Build the Project**
   ```bash
   npm run build
   npm run export # If using static export
   ```

2. **Upload to Netlify**
   - Go to [netlify.com](https://netlify.com)
   - Drag and drop the `out` folder (or `dist`)
   - Configure domain and settings

### Git-based Deploy

1. **Connect Repository**
   - Link your GitHub/GitLab repository
   - Configure build settings:
     ```
     Build command: npm run build
     Publish directory: .next
     ```

2. **Environment Variables**
   In Netlify dashboard, go to Site Settings → Environment Variables:
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
   ```

3. **Netlify Configuration**
   Create `netlify.toml` in project root:
   ```toml
   [build]
     command = "npm run build"
     publish = ".next"

   [build.environment]
     NODE_VERSION = "18"

   [[redirects]]
     from = "/*"
     to = "/index.html"
     status = 200
   ```

## DigitalOcean App Platform

### Deploy via GitHub

1. **Create New App**
   - Go to DigitalOcean App Platform
   - Connect your GitHub repository
   - Configure app settings

2. **App Specification**
   ```yaml
   name: gem-portfolio
   services:
   - name: web
     source_dir: /
     github:
       repo: your-username/gem-portfolio
       branch: main
     run_command: npm start
     build_command: npm run build
     environment_slug: node-js
     instance_count: 1
     instance_size_slug: basic-xxs
     envs:
     - key: NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
       value: your_key_here
       type: SECRET
     - key: NEXT_PUBLIC_EMAILJS_SERVICE_ID  
       value: your_service_id
       type: SECRET
     - key: NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
       value: your_template_id
       type: SECRET
     - key: NEXT_PUBLIC_RECAPTCHA_SITE_KEY
       value: your_recaptcha_key
       type: SECRET
   ```

3. **Custom Domain**
   - Add your domain in the app settings
   - Configure DNS to point to DigitalOcean

## Railway Deployment

### Quick Deploy

1. **Connect Repository**
   - Go to [railway.app](https://railway.app)
   - Create new project from GitHub repo

2. **Environment Variables**
   ```bash
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_key
   NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=your_template_id
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_recaptcha_key
   ```

3. **Deploy**
   - Railway automatically detects Next.js
   - Deployment happens on every push

## AWS Amplify

### Amplify Console Deploy

1. **Connect Repository**
   - Go to AWS Amplify Console
   - Connect your GitHub repository
   - Configure build settings

2. **Build Specification**
   Create `amplify.yml`:
   ```yaml
   version: 1
   frontend:
     phases:
       preBuild:
         commands:
           - npm ci
       build:
         commands:
           - npm run build
     artifacts:
       baseDirectory: .next
       files:
         - '**/*'
     cache:
       paths:
         - node_modules/**/*
   ```

3. **Environment Variables**
   Add in Amplify Console:
   ```
   NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
   NEXT_PUBLIC_EMAILJS_SERVICE_ID
   NEXT_PUBLIC_EMAILJS_TEMPLATE_ID
   NEXT_PUBLIC_RECAPTCHA_SITE_KEY
   ```

## Docker Deployment

### Dockerfile

```dockerfile
# Multi-stage build for production
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

COPY package.json package-lock.json* ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build the app
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### Docker Compose

```yaml
version: '3.8'
services:
  portfolio:
    build: .
    ports:
      - "3000:3000"
    environment:
      - NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=${EMAILJS_PUBLIC_KEY}
      - NEXT_PUBLIC_EMAILJS_SERVICE_ID=${EMAILJS_SERVICE_ID}
      - NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=${EMAILJS_TEMPLATE_ID}
      - NEXT_PUBLIC_RECAPTCHA_SITE_KEY=${RECAPTCHA_SITE_KEY}
    restart: unless-stopped
```

### Deploy to Production

```bash
# Build and run
docker build -t gem-portfolio .
docker run -p 3000:3000 --env-file .env.local gem-portfolio

# Or with docker-compose
docker-compose up -d
```

## VPS/Server Deployment

### Prerequisites

```bash
# Update system
sudo apt update && sudo apt upgrade -y

# Install Node.js
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Install PM2 for process management
sudo npm install -g pm2

# Install Nginx
sudo apt install nginx
```

### Application Setup

```bash
# Clone repository
git clone https://github.com/your-username/gem-portfolio.git
cd gem-portfolio

# Install dependencies
npm install

# Create environment file
cp .env.example .env.local
# Edit .env.local with your production values

# Build application
npm run build

# Start with PM2
pm2 start npm --name "gem-portfolio" -- start
pm2 save
pm2 startup
```

### Nginx Configuration

```nginx
# /etc/nginx/sites-available/gem-portfolio
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

```bash
# Enable site
sudo ln -s /etc/nginx/sites-available/gem-portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### SSL with Let's Encrypt

```bash
# Install Certbot
sudo apt install certbot python3-certbot-nginx

# Get SSL certificate
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal
sudo crontab -e
# Add: 0 12 * * * /usr/bin/certbot renew --quiet
```

## Post-Deployment Checklist

### Functionality Testing
- [ ] Homepage loads correctly
- [ ] All sections are visible and functional
- [ ] Project galleries open and navigate properly
- [ ] Contact form submits successfully
- [ ] EmailJS integration works
- [ ] reCAPTCHA protection is active
- [ ] All images load properly
- [ ] Mobile responsiveness works

### Performance Testing
- [ ] Page load speed is acceptable (< 3 seconds)
- [ ] Core Web Vitals are in good range
- [ ] Images are optimized and loading
- [ ] No console errors in browser
- [ ] SEO metadata is present

### Security Checks
- [ ] HTTPS is properly configured
- [ ] Environment variables are not exposed
- [ ] reCAPTCHA is preventing spam
- [ ] No sensitive data in client-side code
- [ ] CORS is properly configured

### Monitoring Setup
- [ ] Set up error tracking (Sentry, LogRocket)
- [ ] Configure uptime monitoring
- [ ] Set up analytics (Google Analytics)
- [ ] Monitor performance metrics
- [ ] Set up automated backups

## Continuous Deployment

### GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v3
    
    - name: Setup Node.js
      uses: actions/setup-node@v3
      with:
        node-version: '18'
        cache: 'npm'
    
    - name: Install dependencies
      run: npm ci
    
    - name: Build application
      run: npm run build
      env:
        NEXT_PUBLIC_EMAILJS_PUBLIC_KEY: ${{ secrets.EMAILJS_PUBLIC_KEY }}
        NEXT_PUBLIC_EMAILJS_SERVICE_ID: ${{ secrets.EMAILJS_SERVICE_ID }}
        NEXT_PUBLIC_EMAILJS_TEMPLATE_ID: ${{ secrets.EMAILJS_TEMPLATE_ID }}
        NEXT_PUBLIC_RECAPTCHA_SITE_KEY: ${{ secrets.RECAPTCHA_SITE_KEY }}
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v25
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
        vercel-args: '--prod'
```

## Troubleshooting

### Common Issues

1. **Build Failures**
   ```bash
   # Clear cache and reinstall
   rm -rf .next node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Environment Variables Not Working**
   - Ensure variables start with `NEXT_PUBLIC_`
   - Restart development server after changes
   - Check deployment platform variable settings

3. **Contact Form Not Working**
   - Verify EmailJS credentials
   - Check browser console for errors
   - Test with different email addresses
   - Verify reCAPTCHA site key

4. **Images Not Loading**
   - Check file paths and extensions
   - Verify images are in `public/` directory
   - Check Next.js image optimization settings

5. **Performance Issues**
   - Optimize images and reduce file sizes
   - Enable compression on server
   - Use CDN for static assets
   - Monitor bundle size

This deployment guide provides comprehensive instructions for deploying your portfolio to various platforms and environments.
