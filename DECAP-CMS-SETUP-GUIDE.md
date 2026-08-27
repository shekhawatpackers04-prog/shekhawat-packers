# Shekhawat Packers - Multi-Page Website with Decap CMS

Complete setup guide for your new website with separate pages and Decap CMS blog management.

---

## 📁 Website Structure

```
shekhawat-packers/
├── index.html              # Home page
├── pages/
│   ├── products.html       # Products page
│   ├── about.html          # About page
│   └── blog.html           # Blog page
├── css/
│   └── style.css           # Main stylesheet
├── js/
│   └── common.js           # Shared JavaScript
├── admin/
│   ├── config.yml          # Decap CMS configuration
│   └── index.html          # CMS admin panel
├── content/
│   └── blog/               # Blog posts (created by Decap CMS)
├── public/
│   └── images/             # Images folder
├── _redirects              # Netlify routing config
└── netlify.toml            # Netlify configuration (optional)
```

---

## 🚀 Quick Start (5 Steps)

### Step 1: Upload Files to GitHub
1. Create a new GitHub repository: `shekhawat-packers`
2. Upload all files (index.html, pages/, css/, js/, admin/, etc.)
3. Push to GitHub

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/shekhawat-packers.git
git push -u origin main
```

### Step 2: Connect to Netlify
1. Go to [netlify.com](https://netlify.com)
2. Click "New site from Git"
3. Connect your GitHub repository
4. Build command: (leave empty)
5. Publish directory: (leave empty)
6. Click "Deploy"

### Step 3: Enable Netlify Identity
1. In Netlify dashboard, go to **Settings → Identity**
2. Click **Enable Identity**
3. Go to **Settings → Services**
4. Add GitHub as OAuth provider:
   - Provider: GitHub
   - Client ID: (get from GitHub settings)
   - Client Secret: (get from GitHub settings)

### Step 4: Configure Decap CMS
1. Edit `admin/config.yml`
2. Replace `your-github-username` with your actual GitHub username
3. Replace `shekhawat-packers` with your repo name

```yaml
backend:
  name: github
  repo: YOUR_USERNAME/shekhawat-packers  # Change this
  branch: main
```

### Step 5: Access Admin Panel
1. Visit: `https://your-site.netlify.app/admin/`
2. Click "Login with GitHub"
3. Authorize Netlify to access your GitHub
4. Start creating blog posts!

---

## 📄 Pages Overview

### Home Page (`index.html`)
- Hero section with business info
- Featured products
- Contact information
- WhatsApp integration
- Google Reviews widget

### Products Page (`pages/products.html`)
- Full product catalogue
- 6 product categories
- Product details with images
- WhatsApp inquiry buttons
- Product badges (Popular, Eco-Friendly, Budget Friendly)

### About Page (`pages/about.html`)
- Company story
- Statistics (10+ years, 500+ customers)
- Core values
- Team information
- Why choose us section
- Contact details

### Blog Page (`pages/blog.html`)
- Displays blog posts from Decap CMS
- 2-column grid layout
- Search and filter capabilities
- Admin link to manage posts
- Sample posts while CMS is being set up

---

## 🎯 Navigation

All pages have consistent navigation:
- **Home** - `/` or `index.html`
- **Products** - `/pages/products.html`
- **About** - `/pages/about.html`
- **Blog** - `/pages/blog.html`
- **Admin** - `/admin/`

---

## 📝 Creating Blog Posts

### Method 1: Via Decap CMS Admin Panel (Easiest)
1. Visit `/admin/` on your website
2. Click "Blog Posts" in the left sidebar
3. Click "New Blog Post"
4. Fill in the form:
   - **Title**: Post title
   - **Date**: Publication date
   - **Author**: Your name (default: Himmat Singh)
   - **Category**: Choose from predefined categories
   - **Featured Image**: Upload or select image
   - **Excerpt**: 100-150 character summary
   - **Body**: Full content (supports Markdown)
   - **Tags**: Add relevant tags
   - **Published**: Toggle to publish

5. Click "Save" or "Save & Publish"

### Method 2: Via Git (Advanced)
Create a markdown file in `content/blog/`:

**Filename:** `my-blog-post.md`

```markdown
---
title: "How to Choose the Right Corrugated Box"
date: 2024-08-20
author: "Himmat Singh"
category: "Packaging Tips"
image: "/images/corrugated-box-guide.jpg"
excerpt: "Learn how to select the perfect corrugated box for your products."
tags: ["packaging", "boxes", "tips"]
published: true
---

Your blog content goes here...

## Subheading

More content...
```

Then push to GitHub, and Decap CMS will detect it.

---

## 🎨 Customization

### Change Colors
Edit `css/style.css` - CSS variables at the top:

```css
:root {
  --orange: #E8622A;        /* Primary brand color */
  --navy: #1E3369;          /* Secondary color */
  --peach: #F4C07A;         /* Accent color */
}
```

### Change Company Info
Update in each HTML file:
- Phone: `+919582392131`
- WhatsApp: `919582392131`
- Email: `shekhawatpackers04@gmail.com`
- Address: `IX-6278 Jain Mandir Gali, Gandhi Nagar...`

### Change Logo
Replace `/logo.webp` with your company logo

### Change Product Images
Replace images in `public/images/` folder

---

## 🌙 Features Included

✅ **Responsive Design**
- Works on desktop, tablet, mobile
- Adaptive layouts for all screen sizes

✅ **Dark Theme Support**
- Toggle button top-right
- Automatic detection of system preferences
- Persists user choice in localStorage

✅ **CMS Integration**
- Decap CMS for blog management
- GitHub-based content storage
- No server required

✅ **SEO Optimized**
- Meta tags on all pages
- Structured data (JSON-LD)
- Clean URLs
- Canonical tags

✅ **Performance**
- Optimized CSS and JS
- Lazy loading for images
- Fast page loads

✅ **Contact Integration**
- WhatsApp direct messaging
- Email links
- Phone calling
- Google Maps directions
- Contact card download

✅ **Analytics Ready**
- Google Analytics compatible
- Event tracking setup
- Page view tracking

---

## 🔐 Security & Deployment

### GitHub Authentication
Decap CMS uses GitHub OAuth for security:
- No passwords stored
- Secure GitHub token exchange
- Only authorized users can edit

### Netlify Deployment
Automatic deployments when you push to GitHub:
1. Push code to GitHub
2. Netlify automatically rebuilds
3. Site updates in seconds

### Environment Variables
For production, set in Netlify Settings:
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`

---

## 🚨 Troubleshooting

### Admin Panel Not Loading
**Solution:**
- Check you're logged in with GitHub
- Clear browser cache (Ctrl+Shift+Delete)
- Verify Netlify Identity is enabled
- Check browser console for errors (F12)

### Blog Posts Not Showing
**Solution:**
- Posts must be in `content/blog/` folder
- Filename should be lowercase with hyphens
- Check `published: true` in frontmatter
- Wait for Netlify to rebuild (1-2 minutes)

### Images Not Displaying
**Solution:**
- Images must be in `public/images/`
- Use correct path: `/images/filename.jpg`
- Ensure image file exists
- Try clearing browser cache

### CSS Not Loading
**Solution:**
- Verify `css/style.css` exists
- Check the file path in HTML: `<link rel="stylesheet" href="/css/style.css">`
- Clear browser cache

### Navigation Not Working
**Solution:**
- Ensure `_redirects` file exists
- Check HTML has correct file paths
- Test in incognito window
- Verify Netlify redeployed latest version

---

## 📊 Blog Post Categories

Predefined categories in Decap CMS:
1. **Packaging Tips** - How-to guides and best practices
2. **Sustainability** - Eco-friendly solutions
3. **Product Guide** - Product reviews and comparisons
4. **Business Tips** - Business optimization advice
5. **Industry News** - Latest packaging industry news

---

## 🔗 Useful Links

- **Your Website**: `https://your-site.netlify.app`
- **Admin Panel**: `https://your-site.netlify.app/admin/`
- **GitHub Repository**: `https://github.com/YOUR_USERNAME/shekhawat-packers`
- **Netlify Dashboard**: `https://app.netlify.com`
- **Decap CMS Docs**: `https://decapcms.org/docs/`

---

## 📞 Contact Info

Update these across all pages:
- **Phone**: +91 95823 92131
- **WhatsApp**: https://wa.me/919582392131
- **Email**: shekhawatpackers04@gmail.com
- **Address**: IX-6278 Jain Mandir Gali, Gandhi Nagar, Dharampura, East Delhi – 110031

---

## 💡 Best Practices

### For Blog Posts
- Write clear, engaging headlines
- Add descriptive images
- Use category wisely
- Include relevant tags
- Write 500-1500 word articles
- Use markdown formatting
- Proofread before publishing

### For SEO
- Use keywords in titles
- Add meta descriptions
- Link to products from blog
- Update regularly (1-2 posts/month)
- Use internal links
- Add alt text to images

### For User Experience
- Keep pages fast loading
- Use clear navigation
- Make CTA buttons obvious
- Mobile-friendly design
- Consistent branding

---

## 🎯 Next Steps

1. ✅ Upload files to GitHub
2. ✅ Deploy to Netlify
3. ✅ Enable Netlify Identity
4. ✅ Configure Decap CMS
5. ✅ Create first blog post
6. ✅ Share with team
7. ✅ Set up analytics (optional)
8. ✅ Plan content calendar

---

## 📚 Content Ideas for Blog

1. "How to Choose Packaging Materials"
2. "Sustainable Packaging Options"
3. "Bulk Ordering Tips & Discounts"
4. "Product Care & Storage Guide"
5. "Industry Trends 2024"
6. "Customer Success Stories"
7. "New Products Launch"
8. "Shipping Best Practices"
9. "Cost Reduction Strategies"
10. "Eco-Friendly Alternatives"

---

## 🆘 Support

For issues:
1. Check this guide first
2. Review browser console (F12)
3. Check Netlify build logs
4. Visit Decap CMS documentation
5. Check GitHub Issues for your repo

---

**Happy blogging!** 🚀

Your website is now ready for content management. Start creating engaging blog posts and watch your business grow!
