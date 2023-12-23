import { Meta } from '@storybook/addon-docs/blocks';
import { linkTo } from '@storybook/addon-links';

<Meta
  title="Intro"
  parameters={{
    previewTabs: {
      'storybook/docs/panel': { hidden: true }
    },
    options: { isToolshown: false }
  }}
/>

<div class="d-flex align-items-center">
  <div class="col-1 p-0">
    <img src="https://images.ctfassets.net/9o4l1mrd1tci/2FshDTmoTB4MJdOLlOdLi6/8e401e49eb9e50b0ff3c4e5440f65649/if-tp.png?fm=webp" alt="Design System" width="84" />
  </div>
  <div class="col-11 p-0 pl-4">

# Last Rev Starter Component Library

The single source of truth reference when designing or adding UI.

  </div>
</div>

<div class="table d-flex mt-5">
  <div class="col-6 pl-4 pr-4">

**Each item has within it:**

- React components available for immediate use
- General documentation about the component

The UI library is organized into the following sections:

📘 <a class="mod" onClick={linkTo('1. Modules/BannerFullSize')}><b>Modules</b></a>

Full-featured components that are configurable from Contentful.

📗 <a class="mod" onClick={linkTo('2. Pages/Blog')}><b>Pages</b></a>

Collections of modules that make up a custom page layout

📙 <a class="mod" onClick={linkTo('3. Components/Alert')}><b>Components</b></a>

Elements used in composition as part of a given module.

  </div>
  <div class="col-6 pl-4 pr-4 bg-light" style={{borderLeft: '1px solid #e6e6e6'}}>

**Content creators**

We have your back.

<a href="/story/0-creative-guide--page" class="btn btn-success btn-sm px-2 mb-4">
  Get Started →
</a>

---

{' '}

<div class="mb-4">
  <p class="mb-1 font-weight-bold">Quick links</p>
  <ul class="unstyled mt-0">
    <li>
      🖍{' '}
      <a class="mod" href="?path=/story/0-creative-brand-colors--page">
        Brand
      </a>
    </li>
    <li>
      💎{' '}
      <a class="mod" onClick={linkTo('Presentations/Modules/BannerFullSize')}>
        Presentations
      </a>
    </li>
  </ul>
</div>

{' '}

<div>
  <p class="mb-1 font-weight-bold">External reference</p>
  <ul class="unstyled mt-0">
    <li>
      <img
        src="https://images.ctfassets.net/hhv516v5f7sj/2VEHzcH5Q8ikc5LqUeiTZ4/c3aaa846cf505e41200b77e1dd77e06a/adobe-xd-logo.png?h=40&fm=webp"
        width="14"
        height="14"
        alt="Adobe XD"
      />{' '}
      <a href="#" class="charcoal" target="_blank" rel="noopener noreferrer">
        Last Rev Starter Web Guidelines
      </a>
    </li>
    <li>
      <img
        src="https://images.ctfassets.net/hhv516v5f7sj/5XOro190mV0awDVTkb0Og9/e3943b3dd401b1ecfd359d4af7863880/google-docs-icon.png?h=40&fm=webp"
        width="14"
        height="14"
        alt="Google Docs"
      />{' '}
      <a href="#" class="charcoal" target="_blank" rel="noopener noreferrer">
        Last Rev Starter : LR Storybook User Guide: Creative Team
      </a>
    </li>
  </ul>
</div>

  </div>
</div>

<a class="link-item mr-4" href="#" target="_blank" rel="noopener noreferrer">
  <img
    alt="Contentful Logomark"
    src="https://images.ctfassets.net/hhv516v5f7sj/5b2Jo70Qq7REbmZdCHr8xk/769bcbfd2613107ef3f03b06ebbaedc6/contentful-logo.png?h=50&fm=webp"
    width="14"
  />
  <small>
    <strong> Last Rev Starter Contentful Overview </strong>
  </small>
</a>

<a
  class="link-item mr-4"
  href="https://github.com/last-rev/lastrev-libraries/tree/develop/examples/last-rev-next-starter-pnpm"
  target="_blank"
  rel="noopener noreferrer">
  <img
    alt="GitHub Logomark"
    src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png"
    width="20"
  />
  <small>
    <strong>Last Rev Starter Components on GitHub </strong>- View source code
  </small>
  <code>&lt;/&gt;</code>
</a>

<a class="link-item" href="#" target="_blank" rel="noopener noreferrer">
  <img
    alt="Slack Logomark"
    src="https://images.ctfassets.net/hhv516v5f7sj/Q5HHSErj7jevcTAcj56ji/fc15925ee1f872c3f770e89e2a344c2f/slack-icon.svg"
    width="14"
  />
  <small>
    <strong> Last Rev Starter : Last Rev Slack Channel </strong>
  </small>
</a>
