# Heel Digital

Website for **Heel Digital** — digital marketing services: website building, 5-star review generation, SEO, and ads.

## Rename folder & GitHub repo (one-time)

If this project is still in a folder named `DigitalDog`:

1. **Rename the folder** to `HeelDigital`: close Cursor, then rename `DigitalDog` → `HeelDigital` in File Explorer (or `mv DigitalDog HeelDigital` in terminal from the parent directory). Reopen the project in Cursor from the new path.
2. **Rename the GitHub repo** to `HeelDigital`: on GitHub go to your repo → **Settings** → under "Repository name" enter **HeelDigital** → **Rename**.
3. **Update the remote** (after renaming on GitHub):  
   `git remote set-url origin https://github.com/22VermeijT/HeelDigital.git`

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

## Contact form → your email

The contact form sends submissions to your inbox via [Formspree](https://formspree.io) (no backend required).

1. Sign up at [formspree.io](https://formspree.io) (free tier is enough).
2. Create a new form and set the email address where you want to receive messages.
3. Copy your form ID from the form’s endpoint URL (e.g. `xjweqlze` from `https://formspree.io/f/xjweqlze`).
4. In the project root, copy `.env.example` to `.env` and set:
   ```
   VITE_FORMSPREE_ID=xjweqlze
   ```
   (use your real form ID instead of `xjweqlze`.)
5. Restart the dev server. Submissions will go to Formspree and they’ll forward to your email.

If `VITE_FORMSPREE_ID` is not set, the form will show an error and ask visitors to email you directly.

## Build for production

```bash
npm run build
```

Output goes to `dist/`. Preview the build with:

```bash
npm run preview
```

## Deploy & hosting (get a URL live)

Your site is a static build: run `npm run build` and upload the `dist/` folder. To get a URL and host it:

### 1. Get a domain (your URL)

- Buy a domain from a registrar, e.g. **heeldigital.com**, **heeldigital.agency**.
- Common registrars: [Namecheap](https://www.namecheap.com), [Cloudflare](https://www.cloudflare.com/products/registrar/), [Google Domains](https://domains.google), [Porkbun](https://porkbun.com).
- Cost is usually **$10–15/year** for a `.com` or similar.

### 2. Choose a host (free options)

| Host | Free tier | Best for |
|------|-----------|----------|
| **[Vercel](https://vercel.com)** | Yes | Easiest with Git; auto HTTPS & CDN |
| **[Netlify](https://netlify.com)** | Yes | Same idea; your `public/_redirects` already works here |
| **[Cloudflare Pages](https://pages.cloudflare.com)** | Yes | Fast CDN, connect Git or upload `dist/` |

**Recommended: Vercel or Netlify** — connect your GitHub repo, and every push deploys. No server to manage.

### 3. Deploy steps (e.g. Vercel)

1. Push your project to **GitHub** (if you haven’t).
2. Go to [vercel.com](https://vercel.com) → **Add New Project** → import your repo.
3. Set **Build Command:** `npm run build` and **Output Directory:** `dist`. Deploy.
4. You get a URL like `heel-digital-xxx.vercel.app`. Test it.
5. In Vercel: **Settings → Domains** → add your custom domain (e.g. `heeldigital.com`).
6. At your domain registrar, add the DNS records Vercel shows (usually an A record or CNAME). After DNS propagates, the site is live on your domain with HTTPS.

**Netlify:** Same idea — connect repo, build command `npm run build`, publish directory `dist`. Your `public/_redirects` gives SPA routing (all routes → `index.html`). Add custom domain in Netlify and point DNS there.

### 4. If you don’t use Git

- **Netlify / Cloudflare Pages:** You can drag-and-drop the `dist/` folder after running `npm run build`.
- You’ll need to re-upload `dist/` whenever you change the site (or connect Git later for automatic deploys).

---

## Stack

- [Vite](https://vitejs.dev/) + [React](https://react.dev/)
- Plain CSS (no framework)
