# 🚀 Quick Start Guide

## Step 1: Save Your Photo

1. Save the photo you provided as `hero-off.png` in the `public/images/` folder
2. The photo should be:
   - At least 2000x2000px
   - PNG format
   - Clean background (preferably removed/transparent)

## Step 2: Create Iron Man Helmet Overlay

### Option A: Use AI (Easiest - Recommended)

**Using ChatGPT/DALL-E:**
1. Go to ChatGPT with DALL-E
2. Upload your photo (`hero-off.png`)
3. Use this prompt:
   ```
   Edit this photo to add an Iron Man helmet overlay on the person's head. 
   The helmet should:
   - Be realistic and properly aligned with the head
   - Have metallic red and gold colors
   - Include glowing blue arc reactor eyes
   - Maintain the same pose and background
   - Look cinematic and professional
   ```
4. Download the result and save as `hero-on.png` in `public/images/`

**Using Midjourney:**
```
iron man helmet overlay on professional portrait, photorealistic, 
cinematic lighting, red and gold metallic, glowing blue eyes, 
high detail --ar 1:1 --v 6
```

**Using Other AI Tools:**
- Leonardo.ai (Image Generation → Upload → Canvas Edit)
- Stable Diffusion (ControlNet + Inpainting)
- Photopea.com (Free online Photoshop alternative)

### Option B: Manual Photoshop/GIMP

1. Find Iron Man helmet PNG: Search "Iron Man Mark 50 helmet PNG transparent"
2. Open your photo in Photoshop/GIMP
3. Import helmet as new layer
4. Resize and position to fit your head
5. Use Transform → Warp to adjust perspective
6. Add glow effects:
   - Eye glow: Blue color, Outer Glow
   - Arc reactor: Blue/white glow
7. Export as PNG
8. Save as `hero-on.png`

### Option C: Quick Placeholder (For Testing)

Temporarily just copy your photo:
```bash
# On Windows PowerShell (in project root):
Copy-Item "public/images/hero-off.png" "public/images/hero-on.png"
```

This will work but won't show the helmet effect. Come back and replace later.

## Step 3: Run Your Portfolio

```bash
# Install dependencies (if not done)
npm install

# Start development server
npm run dev
```

Open http://localhost:3000

## Step 4: Test Interactive Effect

1. Hover your mouse over the portrait in the hero section
2. The Iron Man helmet should reveal where you hover
3. Move mouse around to create the "liquid reveal" effect

## Step 5: Customize (Optional)

### Update Projects
Edit `components/projects-showcase.tsx` to update project details

### Update Skills
Edit `components/tech-skills-section.tsx` to modify skill levels

### Update Contact
Edit `components/contact-footer.tsx` for contact information

### Change Colors
All files use Tailwind CSS classes:
- Blue theme: `from-blue-500 to-cyan-500`
- Purple theme: `from-purple-500 to-pink-500`
- Search and replace to change globally

## 🎯 What You'll See

1. **Preloader**: 2.5s animation on first load
2. **Hero Section**: Interactive portrait with scroll animations
3. **Mission**: Your vision and approach
4. **Skills**: Animated skill bars with categories
5. **Projects**: 6 featured projects with links
6. **Experience**: Timeline of your work
7. **Education**: Academic achievements and certifications
8. **Contact**: Footer with all contact info

## 🔧 Troubleshooting

### Images not showing?
- Ensure files are exactly named `hero-off.png` and `hero-on.png`
- Check they're in `public/images/` folder
- Try clearing cache (Ctrl+Shift+R)

### Animations not working?
- Check browser console for errors
- Ensure all dependencies installed: `npm install`
- Try different browser (Chrome recommended)

### Performance issues?
- Images might be too large
- Resize to max 2000x2000px
- Use PNG compression tools

## 📱 Mobile Testing

```bash
# Get your local IP
ipconfig

# Access from phone on same network
http://YOUR_IP:3000
```

## 🚀 Deploy

```bash
# Build for production
npm run build

# Deploy to Vercel (recommended)
npm i -g vercel
vercel --prod
```

Or push to GitHub and connect to Vercel for auto-deploy.

---

**Need Help?** Check the main README.md for detailed documentation.

**Ready to Launch?** Your portfolio is award-worthy! 🏆
