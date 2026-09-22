what needs to be done in search bar 
- ~~search by author~~
- ~~search by keyword in essay title~~
- ~~filter by author~~
- ~~filter by broader theme~~
- add in the header
- 1. about us
  2. how to submit
  3. FAQs
  4. contact us
  5. 
- 
















# The Social Gaze — how this site works

This is the student journal site. You do **not** need to know how to code to run it.

## Adding, editing, or removing an essay

1. Go to your Netlify site's /admin page ().
2. Click **Login with GitHub** and authorize. You must already have a free GitHub account and be added as a collaborator on the `jnu-csss/SocialGaze` repository (see below) for this to work.
3. Click **Essays** on the left, then **New Essay** (or click an existing one to edit or delete it).
4. Fill in the title, author, date, a one-line summary, and paste the essay text into the box. If you have a photo, upload it to your Cloudinary account first, copy its link, and paste it into the "Cover image URL" field.
5. Click **Publish** (top right). Wait about a minute — the live site rebuilds itself automatically and the essay appears on the homepage. You don't need to touch the homepage at all; it updates on its own.

## Adding a new editor (e.g. next year's CR)

1. They create a free account at github.com, if they don't already have one.
2. Go to github.com/jnu-csss/SocialGaze → Settings → Collaborators → Add people, and enter their GitHub username or email.
3. They accept the invite email, then can log into `/admin` on the site with "Login with GitHub" immediately.

## If something looks broken

- The site not updating after you publish? Wait 2–3 minutes first — it rebuilds in the background.
- Can't log in at `/admin`? Make sure you were actually invited via Netlify Identity (see above) — a GitHub account alone isn't enough.
- Anything structurally broken (fonts, layout, colors): the design code lives in `assets/css/style.css`, and the page templates are in `_layouts/`. If you're not comfortable editing these, an AI assistant like Claude can — just show it this repository.

## What NOT to touch, if unsure

- `_config.yml`, `admin/config.yml`, and anything in `_layouts/` control how the site is built. Only edit these if you know what you're changing.
- Everything in `_articles/` is safe to add, edit, or delete freely — that's just the essays.
