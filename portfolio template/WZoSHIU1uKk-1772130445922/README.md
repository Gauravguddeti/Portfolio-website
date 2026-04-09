# Gaurav Guddeti - AI Engineer Portfolio

An award-worthy portfolio website showcasing AI/ML projects, full-stack development skills, and professional experience with an interactive Iron Man-themed hero section.

## 🚀 Features

- **Interactive Hero Section**: WebGL-powered portrait with Iron Man helmet overlay effect
- **Smooth Animations**: Framer Motion animations throughout
- **Tech Skills Showcase**: Animated skill bars with categorization
- **Featured Projects**: Interactive project cards with live demos and GitHub links
- **Experience Timeline**: Professional journey visualization
- **Education & Certifications**: Comprehensive academic and professional credentials
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Modern Tech Stack**: Next.js 14, React 18, TypeScript, Three.js

## 📋 Setup Instructions

### 1. Install Dependencies

```bash
npm install
```

### 2. Prepare Images for Hero Section

The hero section uses an interactive WebGL portrait that reveals an Iron Man helmet overlay on hover. You need two images:

#### **hero-off.png** (Base Portrait)
- Your provided photo (already saved in this repo)
- Recommended size: 2000x2000px or larger
- Format: PNG with transparent background
- Place at: `public/images/hero-off.png`

#### **hero-on.png** (Iron Man Helmet Overlay)
You have several options to create this:

**Option 1: AI Generation (Recommended)**
1. Use an AI tool like:
   - Midjourney: Prompt: "Iron Man helmet overlay on photo, transparent background, ultra realistic, cinematic lighting"
   - DALL-E 3: Similar prompt
   - Stable Diffusion: Use ControlNet for precise overlay
   
2. Upload your photo (`hero-off.png`) and use img2img or inpainting to add the helmet
3. Ensure the helmet aligns with your head position
4. Export as PNG with transparency
5. Save as: `public/images/hero-on.png`

**Option 2: Photoshop/GIMP**
1. Find a high-quality Iron Man helmet PNG (search "iron man helmet PNG transparent")
2. Open your photo in Photoshop/GIMP
3. Layer the helmet over your head
4. Adjust size, rotation, and perspective to match
5. Add glow effects (red/gold) for authenticity
6. Export as PNG
7. Save as: `public/images/hero-on.png`

**Option 3: Use a Placeholder**
- Temporarily use the same image for both until you create the overlay
- Copy `hero-off.png` to `hero-on.png`

### 3. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your portfolio.

## 🎨 Customization

### Update Personal Information

All your information is already configured in the components:

- **Contact**: `components/contact-footer.tsx`
- **Projects**: `components/projects-showcase.tsx`
- **Skills**: `components/tech-skills-section.tsx`
- **Experience**: `components/experience-timeline.tsx`
- **Education**: `components/education-section.tsx`

### Color Scheme

The portfolio uses a tech-inspired color palette:
- Primary: Blue (#3B82F6)
- Secondary: Purple (#A855F7)
- Accent: Cyan, Pink, Orange gradients
- Background: Gray-950 (#030712)

To customize colors, update the Tailwind classes in the components.

### Fonts

Currently using:
- **Roboto**: Main content
- **Oswald**: Headers and marquee
- **Libre Baskerville**: Quotes
- **Alex Brush**: Signature (unused in current version)

## 🖼️ Image Optimization Tips

1. **Portrait Images**: 
   - Use high-resolution source (min 2000x2000px)
   - Ensure good lighting and contrast
   - Remove background for cleaner look
   - Save as PNG for transparency support

2. **Iron Man Overlay**:
   - Match lighting direction with base photo
   - Add subtle glow effects (red/gold)
   - Ensure proper alignment with face
   - Consider adding arc reactor glow effect

3. **Performance**:
   - Images are loaded via Three.js
   - WebGL handles the interactive reveal
   - No additional optimization needed

## 🛠️ Tech Stack

- **Framework**: Next.js 14
- **UI Library**: React 18
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **3D Graphics**: Three.js
- **Icons**: Lucide React
- **Deployment**: Vercel (recommended)

## 📱 Responsive Breakpoints

- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🚀 Deployment

### Deploy to Vercel (Recommended)

```bash
npm run build
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Deploy to Netlify

```bash
npm run build
# Deploy the .next folder
```

## 🎯 Performance

- Lighthouse Score Target: 95+
- First Contentful Paint: < 1.5s
- Time to Interactive: < 3.5s
- WebGL optimized for 60fps animations

## 📝 Additional Notes

### Iron Man Theme Consistency

The portfolio uses an Iron Man/tech theme throughout:
- Hero section: Interactive helmet reveal
- Color scheme: Blue, red, gold accents (Iron Man colors)
- Tech-inspired animations
- Futuristic UI elements

### SEO Optimization

- Update `app/layout.tsx` metadata for better SEO
- Add Open Graph images
- Include meta descriptions
- Set up analytics (Vercel Analytics included)

## 🤝 Credits

- Design inspiration: Modern tech portfolios
- 3D effects: Three.js community
- Animations: Framer Motion
- Icons: Lucide React

## 📄 License

Personal portfolio - All rights reserved

---

**Built with ❤️ and AI by Gaurav Guddeti**

For questions or collaboration: guddetigaurav1@gmail.com
