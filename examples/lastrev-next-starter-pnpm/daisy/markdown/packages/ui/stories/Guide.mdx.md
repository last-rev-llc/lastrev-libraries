import { Meta } from '@storybook/blocks';
import { linkTo } from '@storybook/addon-links';

<Meta
  title="Guide"
  parameters={{
    previewTabs: {
      'storybook/docs/panel': { hidden: true }
    },
    options: { isToolshown: false }
  }}
/>

<div class="d-flex align-items-center">
  <div class="col-1 p-0">
    <img
      src="https://user-images.githubusercontent.com/263385/101991672-48355c80-3c7c-11eb-82d9-95fa12438f64.png"
      alt="Design System"
      height="50"
    />
  </div>
  <div class="col-11 p-0 pl-1">
    <h1 class="tt">Module Usage Guide</h1>
  </div>
</div>

<h3 class="tt mt-4">Presentations</h3>
<small>
  <i>Assembled UI components for landing and site information pages</i>
</small>

---

Content can be edited for each component using <a href="https://www.contentful.com/" target="_blank" rel="noopener noreferrer">Contentful</a>. Whether creating full pages from scratch or editing content in an existing module, this guide can help visually determine:

- if content will appear as expected
- if a specific layout works in a given context
- how certain interactions appear when enabled

This UI library is built on <a href="https://storybook.js.org/" target="_blank" rel="noopener noreferrer">Storybook</a>, which is composed of individual **Stories** &mdash; isolated modules with placeholder content.
Within a Story, there is a **Controls** panel interface, where you can:

- toggle or edit component properties on-the-fly
- swap out placeholder with actual production-ready content, including background images
- view a component at pre-defined device dimensions, and much more.

📐 Each Story has an associated wireframe with UI specs, grid lines, and content guide.

---

<div class="d-flex mt-4">
  <div class="col-3 p-0 mr-4">
    <h5>Common Modules</h5>
    <ul class="mod-links m-0 mt-2 pt-3 w-100 h-100">
      <li>
        <a onClick={linkTo('Presentations/Modules/BannerFullSize')}>BannerFullSize</a>
      </li>
      <li>
        <a onClick={linkTo('Presentations/Modules/CtaHero')}>CtaHero</a>
      </li>
      <li>
        <a onClick={linkTo('Presentations/Modules/CardList')}>CardList</a>
      </li>
      <li>
        <a onClick={linkTo('Presentations/Modules/ModuleHorizontal')}>ModuleHorizontal</a>
      </li>
      <li>
        <a onClick={linkTo('Presentations/Modules/StandardHero')}>StandardHero</a>
      </li>
    </ul>
  </div>
  <div class="col-3 p-0 mr-4">
    <h5>Common Pages</h5>
    <ul class="mod-links m-0 mt-2 pt-3 w-100 h-100">
      <li>
        <a onClick={linkTo('Presentations/Pages/Blog')}>Blog</a>
      </li>
      <li>
        <a onClick={linkTo('Presentations/Pages/News')}>News</a>
      </li>
      <li>
        <a onClick={linkTo('Presentations/Pages/Person')}>Person</a>
      </li>
    </ul>
  </div>
  <div class="col-3 p-0">
    <h5>Brand</h5>
    <ul class="mod-links m-0 mt-2 pt-3 w-100 h-100">
      <li>
        <a href="?path=/story/0-creative-brand-colors--page">Colors</a>
      </li>
      <li>
        <a href="?path=/story/0-creative-brand-typography--page">Typography</a>
      </li>
    </ul>
  </div>
</div>
