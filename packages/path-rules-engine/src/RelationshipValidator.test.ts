import RelationshipValidator from './RelationshipValidator';
import PathRuleParser from './PathRuleParser';

import { entryMocks } from './testUtils';

const entries = Object.values(entryMocks);

const parser = new PathRuleParser();

describe('RelationshipValidator', () => {
  it('has no errors with a simple matching slug', () => {
    parser.parse('/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: ['page-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.page
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });

  it('has error when a simple slug does not match', () => {
    parser.parse('/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: ['page-2'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.page
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug in segment[0]']);
  });

  it('has no errors with a simple matching slug and static segment', () => {
    parser.parse('/blogs/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });

  it('has error when a simple slug and static segment does not match', () => {
    parser.parse('/blogs/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'blog-2'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug in segment[1]']);
  });

  it('has no errors with a nested reference', () => {
    parser.parse('/blogs/:categories(category).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'category-1', 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });

  it('has error when a nested reference slug does not match', () => {
    parser.parse('/blogs/:categories(category).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'category-2', 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug in segment[1]']);
  });

  it('has error when a nested reference exists but is not the right content type', () => {
    parser.parse('/blogs/:categories(category).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'non-category-1', 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug in segment[1]']);
  });

  it('has error when the reference field does not exist or has not value', () => {
    parser.parse('/blogs/:badfield(category).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'category-1', 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(2);
    expect(errors).toEqual([
      'Unable to resolve reference badfield in segment[1]',
      'Unable to resolve field slug in segment[1]'
    ]);
  });

  it('has errors when unable to resolve the slug field from a nested reference', () => {
    parser.parse('/blogs/:categories(category).slug2/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'category-1', 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug2 in segment[1]']);
  });

  it('has no errors with a deeply nested reference', () => {
    parser.parse('/blogs/:categories(category).slug/:categories(category).subCategories(category).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'category-1', 'sub-category-1', 'blog-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.blogWithCategories
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });

  it('has no errors with a refBy field', () => {
    parser.parse('/courses/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'course-1', 'topic-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.topic
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });

  it('has errors with a refBy field when reference', () => {
    parser.parse('/courses/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'course-2', 'topic-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.topic
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug in segment[1]']);
  });

  it('has errors with a refBy field when reference is valid, but does not match specified content type', () => {
    parser.parse('/courses/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'non-course-1', 'topic-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.topic
    });

    const errors = validator.validate();
    expect(errors).toEqual(['Unable to resolve field slug in segment[1]']);
  });

  it('has no errors with deeply nested refBy fields', () => {
    parser.parse(
      '/classes/:__refBy__(course, topics).__refBy__(class, courses).slug/:__refBy__(course, topics).slug/:slug'
    );
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'class-1', 'course-1', 'topic-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.topic
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });

  it('has no errors with combined reference and refBy fields', () => {
    parser.parse('/courses/:__refBy__(course, topics).category(category).slug/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator({
      pathRule: parser.PathRule(),
      entries,
      slugs: [null, 'category-1', 'course-1', 'topic-1'],
      defaultLocale: 'en-US',
      rootEntry: entryMocks.topic
    });

    const errors = validator.validate();
    expect(errors).toHaveLength(0);
  });
});
