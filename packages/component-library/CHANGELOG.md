# @last-rev/component-library

## 0.5.18

### Patch Changes

- Updated dependencies [6c0dc760]
  - @last-rev/contentful-sidekick-util@0.2.0

## 0.5.17

### Patch Changes

- 57c80cb: Fixed some type issues in component library
- Updated dependencies [57c80cb]
  - @last-rev/rollup-config@0.1.5

## 0.5.16

### Patch Changes

- ce14f1c: Fixed tests and added legacyBehavior to next/link component

## 0.5.15

### Patch Changes

- 10d3e3c: Remove future image, update next

## 0.5.14

### Patch Changes

- 28596ce: Added renderMark options for Contentful Rich Text

## 0.5.13

### Patch Changes

- 165fc90: Update dependencies

## 0.5.12

### Patch Changes

- 9f2fd85: Fix CardLink

## 0.5.11

### Patch Changes

- 484c864: Fix CardLink not clickable

## 0.5.10

### Patch Changes

- ddc6e6e: Update component to new sidekick util usage
- Updated dependencies [ddc6e6e]
  - @last-rev/contentful-sidekick-util@0.1.2

## 0.5.9

### Patch Changes

- cbd864c: Fix buttonWrap not available
- 114a0b5: Made Header support multiple NavigationBars

## 0.5.8

### Patch Changes

- 675d271: spred props into root from hero

## 0.5.7

### Patch Changes

- 43bbfed: Fix Theme not propagating, Fix mailto link

## 0.5.6

### Patch Changes

- c97c755: ADA bug comming from link, duplicated id for a and button element

## 0.5.5

### Patch Changes

- dea64cc: Fix ArtDirectedMedia not rendering all images

## 0.5.4

### Patch Changes

- 97d5928: Fix Text with formatted links missing tags

## 0.5.3

### Patch Changes

- 372fab9: Cleanup for forwarded props and svg best practices

## 0.5.2

### Patch Changes

- f09f4e5: Add support for inlined svg with svgContent from GQL
- 2ead5c4: Move XSS filtering from Components to Data Layer

## 0.5.1

### Patch Changes

- 5bd5e96: Fix Card using Link component directly

## 0.5.0

### Minor Changes

- 3ba98cd: July updates

### Patch Changes

- 3ba98cd: Bump testing-library version
- 3ba98cd: Improve bundle size of components
  Improve forwarded props to remove errors
  Remove framer-motion dependency from ContentModule
- 211f24a: Added next/script to SEO
- 3ba98cd: Added more slots for Card, Hero, Header, Link. Removed default styles for text color.
- 3ba98cd: Make Header and NavigationItem links use color inherit as a default
  Fix as prop for Link
- Updated dependencies [3ba98cd]
  - @last-rev/contentful-sidekick-util@0.1.1
  - @last-rev/rollup-config@0.1.4
  - @last-rev/testing-library@0.1.10

## 0.4.7

### Patch Changes

- 658ee30: Make Link pass variant to root

## 0.4.6

### Patch Changes

- 65e1afd: Add nextImageOptimization feature

## 0.4.5

### Patch Changes

- cf25fe7: Fix getImgSrc issues with diferent Contentful URL"

## 0.4.4

### Patch Changes

- Updated dependencies [8c37a33]
  - @last-rev/testing-library@0.1.9

## 0.4.3

### Patch Changes

- Updated dependencies [133d406]
  - @last-rev/testing-library@0.1.8

## 0.4.2

### Patch Changes

- Updated dependencies [3caca6a]
  - @last-rev/testing-library@0.1.7

## 0.4.1

### Patch Changes

- cf7d228: Change Hero component to use ContentModule when rendering a Link
- Updated dependencies [6887a14]
  - @last-rev/testing-library@0.1.6

## 0.4.0

### Minor Changes

- 35c6c46: Add pageURL prop to the ContentPreview component

## 0.3.16

### Patch Changes

- c328895: Add missing components to Rollup entrypoint

## 0.3.15

### Patch Changes

- d3f17d2: Update type definitions for components

## 0.3.14

### Patch Changes

- 63990ac: removed log in Header component

## 0.3.13

### Patch Changes

- Updated dependencies [331e973]
  - @last-rev/testing-library@0.1.5

## 0.3.12

### Patch Changes

- Updated dependencies [e718693]
  - @last-rev/testing-library@0.1.4

## 0.3.11

### Patch Changes

- Updated dependencies [1e4c547]
  - @last-rev/testing-library@0.1.3

## 0.3.10

### Patch Changes

- 9354976: Update usage of Text to ContentModule to allow overrides

## 0.3.9

### Patch Changes

- f3fe612: Add basic video support for Media content module
- Updated dependencies [e657cb0]
  - @last-rev/contentful-sidekick-util@0.1.0

## 0.3.8

### Patch Changes

- b99497c: Cleanup theme TS typings

## 0.3.7

### Patch Changes

- cb7d112: HOTFIX: Add sx prop to Link

## 0.3.6

### Patch Changes

- 861bcee: Simplify Link type definition

## 0.3.5

### Patch Changes

- fa10aa3: HOTFIX: Rollback NavigationItem by default, instead pass onClick

## 0.3.4

### Patch Changes

- e95af41: Fix: Force NavigationBar to always render NavigationItem for links

## 0.3.3

### Patch Changes

- 6e0ac23: Fix CollectionFiltered not working with null itemSpacing
- 4b9997d: rollup bump
- Updated dependencies [4b9997d]
  - @last-rev/rollup-config@0.1.1

## 0.3.2

### Patch Changes

- 9bb0c13: Update Card to pass all props to Link
- fc0ac37: added backgroundColor prop to the Section component

## 0.3.1

### Patch Changes

- b3c20e0: Update to latest rollup-config
- Updated dependencies [b3c20e0]
- Updated dependencies [b3c20e0]
  - @last-rev/rollup-config@0.1.0

## 0.3.0

### Minor Changes

- fe9ee31: Add AnimationContext provider to ContentModule

### Patch Changes

- f269029: Add anti flicker snippet as part of the SEO component
- 96b8687: Fix Link adding extra Box when no icon is provided

## 0.2.36

### Patch Changes

- 2205cde: Optimize imports for component library
- Updated dependencies [2205cde]
  - @last-rev/rollup-config@0.0.6

## 0.2.35

### Patch Changes

- a13e658: HOTFIX: Fix changing theme scheme would use previous scheme

## 0.2.34

### Patch Changes

- 5454930: Remove q if not set
- 5454930: Add unoptimized flag to disable image optimizations

## 0.2.33

### Patch Changes

- 5ce203a: Add unoptimized flag to preload
- 5ce203a: Add unoptimized flag to disable image optimizations

## 0.2.32

### Patch Changes

- f8da6bd: Add unoptimized flag to disable image optimizations

## 0.3.0

### Minor Changes

- 8ff6e58: Add quality param to Image

## 0.2.30

### Patch Changes

- 6fbf102: Fix color schemes not working

## 0.2.29

### Patch Changes

- 9287268: Add Theme defaultProps to Media, Section and Hero

## 0.2.28

### Patch Changes

- 9516d32: Make \_\_typename optional and fix Theme merging

## 0.2.27

### Patch Changes

- 5dcade7: HOTFIX: Section cannot read id of undefined

## 0.2.26

### Patch Changes

- 5b5d8b1: Add missing type for Media

## 0.2.25

### Patch Changes

- f35d159: Add Media flag to disable inline SVG

## 0.2.24

### Patch Changes

- 036b1ca: removed component:h1 to overline

## 0.2.23

### Patch Changes

- 2222e2f: added overline text to hero

## 0.2.22

### Patch Changes

- 3f7917b: Add support for Carousel variant config

## 0.2.21

### Patch Changes

- c18b642: Add Media responsive support

## 0.2.20

### Patch Changes

- dc5b0d2: Fix Collection styles

## 0.2.19

### Patch Changes

- 0c0db78: Update Collection to use Styles

## 0.2.18

### Patch Changes

- a62440e: Add Card tags

## 0.2.17

### Patch Changes

- 8ea371d: added menubreakpoint variable to header, navbar and navitem

## 0.2.16

### Patch Changes

- 48e0f56: standardize the collection filters

## 0.2.15

### Patch Changes

- 1bd5970: upgraded responsiveness to collection carousel

## 0.2.14

### Patch Changes

- f4da4f0: Add introText to Section
  Deleagete introText rendering to ContentModule

## 0.2.13

### Patch Changes

- 3d93f8a: HOTFIX: ContentModule without mapping breaking builds

## 0.2.12

### Patch Changes

- 08ef555: Improve Card link wrapping, Fix Collection double container

## 0.2.11

### Patch Changes

- b5d7754: Fix Hero backgroundColor not showing with a background image

## 0.2.10

### Patch Changes

- 44f6705: Update ContentPreview

## 0.2.9

### Patch Changes

- 213e7b6: Add scheme theme merging to ContentModule

## 0.2.8

### Patch Changes

- ad778a0: Fix external button links

## 0.2.7

### Patch Changes

- 2b1e79e: Update extensions and component library defaults

## 0.2.6

### Patch Changes

- 3d381a6: Fix Link button variant not working

## 0.2.5

### Patch Changes

- d739b9d: added z-index to back to top button, so it does not disappear with other components when mobile

## 0.2.4

### Patch Changes

- 95613f7: removed conditional to Hero where it needed a title or subtitle to render them or the richtext, this made most of the strong-365 heros break

## 0.2.3

### Patch Changes

- b415b05: Fix MUI Selectors

## 0.2.2

### Patch Changes

- 8eb63e0: Fix MUI Selectors

## 0.2.1

### Patch Changes

- 6667ee4: Added MUI patch to include component name in classes in Production

## 0.2.0

### Minor Changes

- 0c91ca6: Add FormMarketoEmbed component

## 0.1.31

### Patch Changes

- 95e5bd0: HOTFIX: AWS dependency breaking styles

## 0.1.30

### Patch Changes

- 76b69d2: Upgrade MUI to V5 RC
- 457432d: 'updated back to top button to hide when scrolling down'
- 1d3c078: Added ErrorBoundary to component library export

## 0.1.29

### Patch Changes

- 0ac2e33: Add SEO component
- e123c06: LRFA-343
- 753a368: fixed padding for mailchimp form
- ec03eeb: Add Autocomplete filter to Collection

## 0.1.28

### Patch Changes

- 36a2d68: Add Section background media

## 0.1.27

### Patch Changes

- 56babbf: Add SEO component

## 0.1.26

### Patch Changes

- 4cd44f6: HOTFIX: Make BackToTop props optional

## 0.1.25

### Patch Changes

- edbdcb9: Fix Text Typography warping

## 0.1.24

### Patch Changes

- 05ceb54: created back to top button

## 0.1.23

### Patch Changes

- 5336e17: Fix Hero height and Navigation mobile interaction

## 0.1.22

### Patch Changes

- 0fdd5a6: Fix navigation item

## 0.1.21

### Patch Changes

- c844c16: Rework Header & NavigationBar for better UX

## 0.1.20

### Patch Changes

- 77e9a39: Add better error hanlding and retry for CollectionFiltered
  Add contentful clients to gql serverless handler

## 0.1.19

### Patch Changes

- 1f24152: Update CollectionFiltered to use swr, YAY for easy data fetching (:
- 2331953: added variant config to collection carousel feature
- 1f24152: CollectionFiltered and Media improvements
- 33f76c4: Hero revisions based on content rather than bg color

## 0.1.18

### Patch Changes

- 2bdaaf3: Add NavigationBar link activeClassName

## 0.1.17

### Patch Changes

- 8d5dea9: Update CollectionFiltered
- 8d5dea9: Added parsing to CollectionFiltered filters
- 285da00: updated richtext for accordion

## 0.1.16

### Patch Changes

- 64cde4b: Add media embed

## 0.1.15

### Patch Changes

- 176d8db: Added ContentPreview component

## 0.1.14

### Patch Changes

- 6b9043d: Release

## 0.1.13

### Patch Changes

- 3cf22ef: Add three per row rounded Collection variant

## 0.1.12

### Patch Changes

- f3ab8f9: Hotfix Card loading state

## 0.1.11

### Patch Changes

- 06d0438: CollectionFiltered, Card, Text updates
  Add LinkIcon

## 0.1.10

### Patch Changes

- 7b9d6a1: Added Redis Cache loader, and cleaned up dependencies

## 0.1.9

### Patch Changes

- a75e277: Hotfix

## 0.1.8

### Patch Changes

- 69f28a0: Hotfix
- 69f28a0: Hotfix router is null on SSG

## 0.1.7

### Patch Changes

- ad475cf: Releases CollectionCarousel, new features for Card
- 2c155d1: Add CollectionFiltered, fix Tiles collection

## 0.1.6

### Patch Changes

- f051263: Added sidekick integration

## 0.1.5

### Patch Changes

- d082f35: added build script to component lib

## 0.1.4

### Patch Changes

- d4e0047: Releasing latest components

## 0.1.3

### Patch Changes

- Updated dependencies [63176af]
  - @last-rev/rollup-config@0.0.5

## 0.1.2

### Patch Changes

- 840ef4a: Fixed dependencies
- Updated dependencies [840ef4a]
  - @last-rev/rollup-config@0.0.4
  - @last-rev/testing-library@0.1.2

## 0.1.1

### Patch Changes

- fd9a8c6: allowing for config file for extensions. Added examples.
- Updated dependencies [fd9a8c6]
  - @last-rev/rollup-config@0.0.3
