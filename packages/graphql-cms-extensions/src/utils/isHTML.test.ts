import isHTML from './isHTML';

const testHTML = [
  '<div>test</div>',
  '<div class="test">test</div>',
  '<div class="test" id="test">test</div>',
  '<span>test</span>',
  '<span id="test-test" class="test">test</span>',
  '<span style="test" /> this is text after',
  'This is text before <span class />',
  'This is text before <span style"background-color: red;">test</span> and this is text after'
];
const testNonHTML = [
  '< this is not html >',
  'this is <    > not html',
  'this is not html',
  'this is not html <',
  '> this is not html',
  '>< this is not html <>',
  '<<<<',
  'Test 1 ><><><><. ><.'
];

describe('isHTML', () => {
  it('finds html tags correctly', () => {
    testHTML.forEach((html) => {
      expect(isHTML(html)).toBe(true);
    });

    testNonHTML.forEach((html) => {
      expect(isHTML(html)).toBe(false);
    });
  });
});
