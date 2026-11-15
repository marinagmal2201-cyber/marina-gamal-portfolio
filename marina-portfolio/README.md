# Marina Gamal | Portfolio

Responsive single-page portfolio for Marina Gamal, Electrical Power Engineer specializing in Fire Alarm and ELV systems.

## Included

* Responsive desktop, tablet and mobile layout
* Fixed navigation with active-section highlight and smooth scrolling
* Hero with portrait, contact panel and an animated NET background (Vanta, loaded from a CDN; skipped on mobile and with reduced motion, and the site works without it)
* About section and professional metrics
* Filterable project portfolio with status badges (Completed / In Progress)
* Project detail windows with an image gallery (arrows, thumbnails, keyboard)
* Experience timeline, certifications with preview window, education
* Core expertise section (calculations, systems, software)
* Contact form that opens the visitor's email application
* Downloadable CV file
* GitHub Pages-ready relative paths
* Local SVG project illustrations (no external image dependency; only the optional hero background uses a CDN)

## Project structure

```
marina-portfolio/
|-- index.html
|-- README.md
|-- .nojekyll
`-- assets/
    |-- css/
    |   `-- style.css
    |-- js/
    |   |-- app.js
    |   |-- projects.js
    |   `-- certifications.js
    |-- img/
    |   |-- logo.svg
    |   |-- favicon.svg
    |   |-- profile-marina.jpg
    |   |-- projects/
    |   |-- cert-logos/        (optional, create when needed)
    |   `-- certificates/      (optional, create when needed)
    `-- files/
        `-- Marina_Gamal_CV.pdf
```

## Deploy to GitHub Pages

1. Create a new GitHub repository. A repository named `YOUR-USERNAME.github.io` is published at `https://YOUR-USERNAME.github.io/`. Any other name, for example `My-Portfolio`, is published at `https://YOUR-USERNAME.github.io/My-Portfolio/`.
2. Upload all files and folders from this package to the repository root, including the hidden `.nojekyll` file.
3. Open the repository **Settings**, then **Pages**.
4. Under **Build and deployment**, choose **Deploy from a branch**.
5. Select the `main` branch and the `/ (root)` folder, then save.
6. Wait a minute or two, then open the address shown on the Pages screen.

## Edit project information

Open `assets/js/projects.js`. Each project is one JavaScript object (the fields are described at the top of the file): title, subtitle, status, images, systems, scope and responsibilities. The page updates automatically.

## Replace project images

The included images are original SVG illustrations, not client drawings. To use real images:

1. Add the files to `assets/img/projects/` (for example `assets/img/projects/golden-gate/1.jpg`).
2. In `projects.js`, list them under `images`. Several images turn on the gallery arrows and thumbnails.
3. Recommended size: 1200 x 800 pixels or larger.
4. Remove client names, faces, access credentials, drawings and IP addresses before publishing site photos.

## Certifications

Edit `assets/js/certifications.js`. To make a card open a preview window, add a certificate image (for example `assets/img/certificates/bim-modeler.jpg`) as its `image`. You can also add an issuer logo as `logo` and a `year`.

## Replace the profile image or the CV

* Profile image: replace `assets/img/profile-marina.jpg`, same name (JPG, portrait, at least 900 x 1200 pixels).
* CV: replace `assets/files/Marina_Gamal_CV.pdf`. If you rename it, update the Download CV link in `index.html`.

## Update contact details

Search `index.html` and `assets/js/app.js` for:

* `marinagmal2201@gmail.com`
* `marina-gamal-85678225b`

The contact form uses a `mailto:` link and does not need a server.

## Notes

* All paths are relative, so the site works inside a GitHub Pages repository subfolder.
* Project details use the HTML `dialog` element (current Chrome, Edge, Firefox and Safari).
* The CV contains a phone number. Remove it from the PDF before uploading if you do not want it public.
