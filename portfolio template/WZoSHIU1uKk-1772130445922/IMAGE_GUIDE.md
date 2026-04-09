# 📸 Image Preparation Guide

This guide will help you create the perfect Iron Man helmet overlay for your portfolio hero section.

## What You Need

Two images in `public/images/`:
1. **hero-off.png** - Your base portrait (without helmet)
2. **hero-on.png** - Portrait with Iron Man helmet overlay

## Method 1: AI-Powered (Recommended) ⭐

### Using ChatGPT with DALL-E 3

1. **Go to ChatGPT** (requires ChatGPT Plus)
2. **Upload your photo** (the one you provided)
3. **Use this exact prompt**:

```
I need you to edit this photo to add an Iron Man (Mark 50) helmet overlay. 

Requirements:
- Keep the exact same pose and background
- Add a realistic Iron Man helmet over the head
- Helmet should be red and gold metallic
- Include glowing blue eyes (arc reactor technology)
- Maintain professional portrait quality
- Cinematic lighting that matches the original photo
- Make it look like a real Iron Man suit-up

The result should look like Tony Stark mid-transformation, professional and cinematic.
```

4. **Download the result**
5. **Save both versions**:
   - Original → `hero-off.png`
   - AI edited version → `hero-on.png`

### Using Midjourney

If you have Midjourney access:

1. **Upload your photo** to Discord
2. **Use `/describe` command** to get base prompt
3. **Modify the prompt** to add:
```
professional portrait with iron man mark 50 helmet overlay, 
red and gold metallic armor, glowing blue eyes, 
photorealistic, cinematic lighting, high detail, 
matching original pose and background --ar 1:1 --v 6
```

### Using Other AI Tools

- **Leonardo.ai**: Use Canvas Editor with "Add Iron Man helmet" instruction
- **Stable Diffusion** (via Automatic1111 or ComfyUI):
  - Use ControlNet (Canny or Depth)
  - Inpainting with mask around head area
  - Prompt: "iron man helmet, red and gold, glowing blue eyes, photorealistic"
- **Runway ML**: Gen-2 with image editing
- **Photopea** (Free online): Manual editing with helmet PNG

## Method 2: Manual Photoshop/GIMP

### What You'll Need:
- Your photo
- Iron Man helmet PNG (transparent background)
- Photo editing software (Photoshop, GIMP, Affinity Photo)

### Steps:

1. **Find a Good Helmet PNG**
   - Search: "Iron Man Mark 50 helmet PNG transparent"
   - Recommended sites: PNG Wing, Freepik, DeviantArt
   - Look for front-facing view

2. **Open Your Photo**
   - Import into Photoshop/GIMP
   - Ensure high resolution (min 2000x2000px)

3. **Import Helmet Layer**
   - Drag helmet PNG onto your photo
   - Create new layer above your head

4. **Position and Transform**
   - Resize helmet to match head size
   - Rotate to match head angle
   - Use **Transform → Warp** to adjust curves
   - Align eyes with your eyes

5. **Add Effects** (Photoshop):
   ```
   Eyes:
   - Layer Style → Outer Glow
   - Color: #00D9FF (cyan/blue)
   - Size: 25px
   - Opacity: 80%
   
   Arc Reactor (forehead):
   - Add small circle
   - Color: #00D9FF
   - Outer Glow: 30px
   - Opacity: 90%
   
   Metallic Shine:
   - Overlay subtle highlights
   - Use Dodge tool on edges
   - Add gradient overlay (gold to red)
   ```

6. **Blend Edges**
   - Use soft eraser on helmet edges
   - Match lighting direction
   - Add subtle shadows

7. **Export**
   - File → Export As → PNG
   - Quality: Maximum
   - Transparency: Yes
   - Save as `hero-on.png`

## Method 3: Quick Placeholder (For Testing)

If you want to test the site first before creating the perfect overlay:

### Windows PowerShell:
```powershell
# Navigate to project root
cd "d:\projects\porfolio\portfolio template\WZoSHIU1uKk-1772130445922"

# Copy your photo to both locations
Copy-Item "path\to\your\photo.png" "public\images\hero-off.png"
Copy-Item "path\to\your\photo.png" "public\images\hero-on.png"
```

This will make the interactive effect work, but both images will be the same (no helmet reveal).

## Image Specifications

### Recommended Size:
- **Resolution**: Any high-res works! (1500px+ on longest side)
- **Format**: PNG (for transparency support)  
- **File Size**: Under 2MB (compress if needed)
- **Important**: Both images should be the SAME size

### Quality Tips:
- ✅ Good lighting on face
- ✅ High contrast
- ✅ Plain or simple background
- ✅ Centered composition
- ✅ Professional attire
- ❌ Avoid busy backgrounds
- ❌ Avoid extreme angles
- ❌ Avoid low resolution

### Background:
- **Option 1**: Keep original background (easier)
- **Option 2**: Remove background for cleaner look
  - Use remove.bg for automatic removal
  - Or use Photoshop's Select Subject + Refine Edge

## Testing Your Images

1. Save both images in `public/images/`:
   ```
   public/
   └── images/
       ├── hero-off.png  (your photo)
       └── hero-on.png   (with Iron Man helmet)
   ```

2. Start the dev server:
   ```bash
   npm run dev
   ```

3. Open http://localhost:3000

4. **Test the effect**:
   - Hover your mouse over the portrait
   - The helmet should reveal where you hover
   - Move the mouse around to see the "liquid reveal"

## Advanced Tips

### Lighting Consistency:
- Match helmet lighting with your photo's lighting
- If lit from left, add highlights on left side of helmet
- Maintain same color temperature

### Color Grading:
- Subtle blue tint for tech feel
- Increase contrast slightly
- Darken background to make helmet pop

### Animation-Friendly:
- Ensure both images are same dimensions
- Keep subject in exact same position
- Align facial features perfectly

### Compression:
Use TinyPNG or ImageOptim to reduce file size without quality loss.

## Resources

### Free Tools:
- **remove.bg**: Background removal
- **Photopea**: Free online Photoshop
- **GIMP**: Free desktop photo editor
- **Canva**: Simple online editor

### AI Tools:
- **ChatGPT**: Image editing (paid)
- **Leonardo.ai**: Free tier available
- **Stability.ai**: Stable Diffusion online

### Assets:
- **PNG Wing**: Free PNG images
- **Flaticon**: Icon resources
- **Unsplash**: Reference photos

## Need Help?

If you're stuck:

1. **Quick test**: Use the same photo for both files (placeholder method)
2. **Get help**: Share your photo in AI tool with the prompts above
3. **Hire help**: Fiverr has quick Photoshop services ($5-20)

## Final Checklist

- [ ] hero-off.png saved in public/images/
- [ ] hero-on.png saved in public/images/
- [ ] Both images are same size
- [ ] Both images are high quality
- [ ] Helmet aligns with head properly
- [ ] Effects look realistic
- [ ] File sizes are reasonable (<2MB each)
- [ ] Tested in browser

---

**Ready to see it in action?** Run `npm run dev` and hover over your portrait! 🚀
