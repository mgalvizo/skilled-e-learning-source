# Frontend Mentor - Skilled e-learning landing page solution

This is a solution to the [Skilled e-learning landing page challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/skilled-elearning-landing-page-S1ObDrZ8q). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

-   [Overview](#overview)
    -   [The challenge](#the-challenge)
    -   [Screenshot](#screenshot)
    -   [Links](#links)
-   [My process](#my-process)
    -   [Built with](#built-with)
    -   [What I learned](#what-i-learned)
    -   [Useful resources](#useful-resources)
-   [Author](#author)

## Overview

### The challenge

Users should be able to:

-   View the optimal layout depending on their device's screen size
-   See hover states for interactive elements

### Screenshot

#### Mobile

![](./screenshots/mobile.png)

#### Tablet

![](./screenshots/tablet.png)

#### Desktop

![](./screenshots/desktop.png)

### Links

-   [Solution URL](https://your-solution-url.com)
-   [Live Site URL](https://mgalvizo.github.io/skilled-e-learning/)

## My process

### Built with

-   Semantic HTML5 markup
-   SASS/SCSS
-   Flexbox
-   CSS Grid
-   Mobile-first approach
-   Responsive Images
-   Webpack Bundler

### What I learned

Adding responsive images depending on the media breakpoint and device pixel density.

```html
<picture
    ><source
        media="(min-width: 900px)"
        srcset="
            ./images/image-hero-desktop.5ff1ed24971b3e97da4c.webp,
            ./images/image-hero-desktop@2x.25ffcd4b177a3a1b3a65.webp 2x
        "
        type="image/webp" />
    <source
        media="(min-width: 620px)"
        srcset="
            ./images/image-hero-tablet.9e41de0ef52adc1d1a7b.webp,
            ./images/image-hero-tablet@2x.3e8ba85556be1b6fb054.webp 2x
        "
        type="image/webp" />
    <source
        media="(min-width: 320px)"
        srcset="
            ./images/image-hero-mobile.921f38ceee7630fec664.webp,
            ./images/image-hero-mobile@2x.9cbaa09811b2e23ef944.webp 2x
        "
        type="image/webp" />
    <source
        media="(min-width: 900px)"
        srcset="
            ./images/image-hero-desktop.e8bce1383147db84fc45.png,
            ./images/image-hero-desktop@2x.d426743354778e661bd8.png 2x
        "
        type="image/png" />
    <source
        media="(min-width: 620px)"
        srcset="
            ./images/image-hero-tablet.0384d40b5df2aa02d25d.png,
            ./images/image-hero-tablet@2x.153ddf792e760c0fec63.png 2x
        "
        type="image/png" />
    <source
        media="(min-width: 320px)"
        srcset="
            ./images/image-hero-mobile.754036c7a2aa1ffdf3d9.png,
            ./images/image-hero-mobile@2x.3c62c211fe4ac449f02c.png 2x
        "
        type="image/png" />
    <img
        src="./images/image-hero-mobile.754036c7a2aa1ffdf3d9.png"
        alt="A young woman about to take a sip of coffee"
/></picture>
```

Using overflow-x in a div since it will be ignored in mobile devices when adding the property to the body or html tags.

```css
.body-content {
    overflow-x: hidden;
}
```

### Useful resources

-   [Responsive Images MDN](https://developer.mozilla.org/en-US/docs/Learn/HTML/Multimedia_and_embedding/Responsive_images) - This helped me with the hero section of the project to add the proper HTML for the responsive images to work.

## Author

-   Frontend Mentor - [@mgalvizo](https://www.frontendmentor.io/profile/mgalvizo)
