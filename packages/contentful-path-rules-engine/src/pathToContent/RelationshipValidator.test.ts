import RelationshipValidator from './RelationshipValidator';
import PathRuleParser from '../core/PathRuleParser';

import { entryMocks, mockApolloContext } from '../testUtils';

const apolloContext = mockApolloContext();

describe('RelationshipValidator', () => {
  it('has no errors with a simple matching slug', async () => {
    const parser = new PathRuleParser('/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(validator.validate([entryMocks.page], apolloContext)).resolves.toHaveLength(0);
  });

  it('has error when a simple slug does not match', async () => {
    const parser = new PathRuleParser('/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(validator.validate([null], apolloContext)).resolves.toEqual([
      'no entry at segment 0 but expected one'
    ]);
  });

  it('has no errors with a simple matching slug and static segment', async () => {
    const parser = new PathRuleParser('/blogs/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(validator.validate([null, entryMocks.page], apolloContext)).resolves.toHaveLength(0);
  });

  it('has error when a simple slug and static segment does not match', async () => {
    const parser = new PathRuleParser('/blogs/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([entryMocks.categoryWithSubcategory, entryMocks.page], apolloContext)
    ).resolves.toEqual(['entry at segment 0 but none expected']);
  });

  it('has no errors with a nested reference', async () => {
    const parser = new PathRuleParser('/blogs/:categories(category).slug/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories], apolloContext)
    ).resolves.toHaveLength(0);
  });

  it('has error when a nested reference exists but is not the right content type', async () => {
    const parser = new PathRuleParser('/blogs/:categories(category).slug/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([null, entryMocks.noncategory, entryMocks.blogWithCategories], apolloContext)
    ).resolves.toEqual(['resolution roots did not match any item with id noncategory1 in segment 1']);
  });

  it('has error when the reference field does not exist or has no value', async () => {
    const parser = new PathRuleParser('/blogs/:badfield(category).slug/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([null, entryMocks.categoryWithSubcategory, entryMocks.blogWithCategories], apolloContext)
    ).resolves.toEqual(['no resolution roots found for segment 1']);
  });

  it('has no errors with a deeply nested reference', async () => {
    const parser = new PathRuleParser(
      '/blogs/:categories(category).slug/:categories(category).subCategories(category).slug/:slug'
    );
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate(
        [null, entryMocks.categoryWithSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories],
        apolloContext
      )
    ).resolves.toHaveLength(0);
  });

  it('has no errors with a deeply nested reference even when there is not a segment relationship', async () => {
    const parser = new PathRuleParser(
      '/blogs/:categories(category).slug/:categories(category).subCategories(category).slug/:slug'
    );
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate(
        [null, entryMocks.categoryWithoutSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories],
        apolloContext
      )
    ).resolves.toHaveLength(0);
  });

  it('has error with a deeply nested reference with segment references if segment relationship is not honored', async () => {
    const parser = new PathRuleParser(
      '/blogs/:categories(category).slug/:__segment__(1).subCategories(category).slug/:slug'
    );
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate(
        [null, entryMocks.categoryWithoutSubcategory, entryMocks.subcategory, entryMocks.blogWithCategories],
        apolloContext
      )
    ).resolves.toEqual(['no resolution roots found for segment 2']);
  });

  it('has no errors with a refBy field', async () => {
    const parser = new PathRuleParser('/courses/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([null, entryMocks.courseWithTopic1, entryMocks.topic], apolloContext)
    ).resolves.toHaveLength(0);
  });

  it('has errors with a refBy field when content exists but does not have the reference to the item', async () => {
    const parser = new PathRuleParser('/courses/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([null, entryMocks.courseWithTopic2, entryMocks.topic], apolloContext)
    ).resolves.toEqual(['resolution roots did not match any item with id course2 in segment 1']);
  });

  it('has errors with a refBy field when reference is valid, but does not match specified content type', async () => {
    const parser = new PathRuleParser('/courses/:__refBy__(course, topics).slug/:slug');
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(validator.validate([null, entryMocks.noncourse, entryMocks.topic], apolloContext)).resolves.toEqual([
      'resolution roots did not match any item with id noncourse1 in segment 1'
    ]);
  });

  it('has no errors with deeply nested refBy fields', async () => {
    const parser = new PathRuleParser(
      '/classes/:__refBy__(course, topics).__refBy__(class, courses).slug/:__refBy__(course, topics).slug/:slug'
    );
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate([null, entryMocks.class, entryMocks.courseWithTopic1, entryMocks.topic], apolloContext)
    ).resolves.toHaveLength(0);
  });

  it('has no errors with combined reference and refBy fields', async () => {
    const parser = new PathRuleParser(
      '/courses/:__refBy__(course, topics).category(category).slug/:__refBy__(course, topics).slug/:slug'
    );
    const validator = new RelationshipValidator(parser.PathRule());

    await expect(
      validator.validate(
        [null, entryMocks.categoryWithSubcategory, entryMocks.courseWithTopic1, entryMocks.topic],
        apolloContext
      )
    ).resolves.toHaveLength(0);
  });
});
