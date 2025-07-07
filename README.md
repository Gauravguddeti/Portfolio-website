# Gaurav Guddeti - Portfolio Website

A visually stunning, interactive, and intelligent portfolio website built with modern web technologies.

## 🚀 Features

- **Dark Theme by Default** with auto theme switching based on time
- **Custom Cursor** with AI-themed glowing effects and morphing shapes
- **Background Music** with toggle controls (add your `music.mp3` file)
- **Floating AI Chat Bubble** with dynamic, contextual messages
- **Time-based Greetings** that change throughout the day
- **3D Interactive Elements** (placeholders ready for Three.js integration)
- **Responsive Design** that works on all devices
- **Smooth Animations** powered by Framer Motion
- **Glassmorphism UI** with elegant visual effects

## 🛠️ Tech Stack

- **Next.js 14** with App Router
- **React 18** with TypeScript
- **Tailwind CSS** for styling
- **Framer Motion** for animations
- **Three.js** ready for 3D elements
- **Vercel** deployment ready

## 🎯 Sections

1. **Hero Section** - Name, tagline, and call-to-action buttons
2. **About Section** - Bio and live stats counters
3. **Projects Section** - Featured projects with live demos
4. **Skills Section** - Technologies and tools
5. **Resume Section** - Download resume functionality
6. **Contact Section** - Contact form and social links
7. **Footer** - Theme toggle and additional info

## 📦 Installation

1. Install dependencies:
```bash
npm install
```

2. Add your files to the `public` folder:
   - `music.mp3` - Background music file (instrumental/ambient recommended)
   - `resume.pdf` - Your resume file

3. Run the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🎨 Customization

### Personal Information
Update the following files with your information:
- `app/layout.tsx` - Meta tags and SEO information
- `components/sections/HeroSection.tsx` - Name and tagline
- `components/sections/AboutSection.tsx` - Bio and stats
- `components/sections/ProjectsSection.tsx` - Your projects
- `components/sections/ContactSection.tsx` - Contact information

### Styling
- Colors and animations are in `tailwind.config.js`
- Global styles are in `app/globals.css`
- Theme settings are in `components/providers/ThemeProvider.tsx`

### 3D Elements
The website includes placeholders for 3D elements. To enable full 3D functionality:
1. The Three.js dependencies are already installed
2. 3D components are in `components/3d/` folder
3. Uncomment the Canvas components in the section files

## 🚀 Deployment

Deploy to Vercel:
```bash
npm run build
```

The site is optimized for Vercel deployment with automatic domain configuration.

## 🎵 Background Music

Add your background music file as `public/music.mp3`. Recommended:
- Instrumental or ambient music
- Low volume (0.1 by default)
- Looping friendly
- File size under 5MB for better performance

## 📄 Resume

Add your resume as `public/resume.pdf` for the download functionality.

## 🌙 Theme Features

- **Auto Theme Switching**: Automatically switches to dark mode between 6 PM - 6 AM
- **Manual Toggle**: Sun/Moon button in the footer
- **Time-based Greetings**: Different messages based on time of day
- **Mood-based Quotes**: Rotating inspirational quotes

## 🎭 Interactive Elements

- **Custom Cursor**: Follows mouse with glowing effects
- **Floating Chat**: AI-themed messages that change every 15-30 seconds
- **Smooth Scrolling**: Navigate between sections seamlessly
- **Hover Effects**: Interactive buttons and cards
- **Loading Animations**: Staggered animations for better UX

## 🔧 Development

### Available Scripts

- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Code linting

### Project Structure

```
├── app/                 # Next.js app directory
├── components/          # React components
│   ├── 3d/             # Three.js components
│   ├── icons/          # Custom SVG icons
│   ├── providers/      # Context providers
│   ├── sections/       # Page sections
│   └── ui/             # UI components
├── public/             # Static files
└── styles/             # Additional styles
```

## 🎨 Color Scheme

- Primary: Blue (#0ea5e9)
- Dark: Various shades of dark blue/gray
- Accent: Light blue (#38bdf8)
- Text: White/Gray for dark theme

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Touch-friendly interactions
- Disabled cursor effects on mobile

## 🔒 Performance

- Optimized images and assets
- Lazy loading for sections
- Efficient animations
- Minimal bundle size
- Fast loading times

## 🎯 SEO Optimized

- Meta tags and Open Graph
- Structured data
- Semantic HTML
- Accessible design
- Fast Core Web Vitals

## 📞 Support

If you have any questions or need help customizing the portfolio, feel free to reach out!

---

**Built with ❤️ by Gaurav Guddeti**
