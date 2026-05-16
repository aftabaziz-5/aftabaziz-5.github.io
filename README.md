# Personal Portfolio Website

A simple, clean, and responsive personal portfolio website built with HTML, CSS, and JavaScript. Perfect for showcasing your skills, projects, and connecting with others.

## Features

- ✨ **Responsive Design** - Works perfectly on desktop, tablet, and mobile devices
- 🎨 **Modern Styling** - Clean and professional appearance with smooth animations
- 📱 **Mobile-Friendly** - Optimized navigation and layout for all screen sizes
- 🚀 **Smooth Scrolling** - Smooth navigation between sections
- 📧 **Contact Form** - Simple contact form for visitors to get in touch
- 🎯 **Projects Showcase** - Display your projects with descriptions
- 💡 **Skills Section** - Highlight your key skills and expertise

## Project Structure

```
website/
├── index.html      # Main HTML file
├── styles.css      # Styling and responsive design
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Getting Started

### 1. Customize Your Information

Open `index.html` and update:
- Replace "My Portfolio" with your name in the navigation
- Update the hero section with your headline
- Change "[Your Name]" in the About section
- Add your actual projects and skills

### 2. View Locally

Simply open `index.html` in your web browser to see your website.

### 3. Deploy to GitHub Pages (Free Hosting)

1. Create a repository on [GitHub](https://github.com)
2. Name it `yourusername.github.io` (replace with your actual username)
3. Clone the repository to your computer
4. Copy your website files into the repository folder
5. Push to GitHub:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
6. Your website will be live at `https://yourusername.github.io`

### Alternative Free Hosting Options

- **Netlify**: Drag and drop your folder to [netlify.com](https://netlify.com)
- **Vercel**: Connect your GitHub repo at [vercel.com](https://vercel.com)
- **Firebase Hosting**: Deploy using [firebase.google.com](https://firebase.google.com)

## Customization Guide

### Colors
Edit the CSS variables in `styles.css`:
```css
:root {
    --primary-color: #3498db;    /* Main color */
    --secondary-color: #2c3e50;  /* Dark color */
    --text-color: #333;          /* Text color */
    --light-bg: #ecf0f1;         /* Light background */
}
```

### Sections
- **Hero**: Update title and subtitle
- **About**: Write your bio
- **Projects**: Add 3+ project cards with descriptions
- **Skills**: List your technical and soft skills
- **Contact**: The form is ready to use

### Add Images
Create an `assets` folder and update the project image paths:
```html
<div class="project-image" style="background-image: url('assets/project1.jpg')"></div>
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Tips for Success

1. **Keep it simple** - Less is more. Don't overcomplicate your portfolio.
2. **Update regularly** - Add new projects as you complete them
3. **Use quality images** - High-quality project screenshots matter
4. **Mobile first** - Always check how it looks on mobile devices
5. **Get feedback** - Share with friends and get constructive feedback

## License

Free to use and modify for personal use.

---

**Ready to go live?** Deploy to one of the free hosting platforms mentioned above!
