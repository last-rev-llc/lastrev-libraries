import merge from 'lodash/merge';
import getSEO from '../../utils/getSEO';

const mockSettings = {
  'title': {
    name: 'title',
    value: 'Last Rev | Connecting the modern web'
  },
  'robots': {
    name: 'robots',
    value: 'index,follow'
  },
  'keywords': {
    name: 'keywords',
    value: 'contentful, ui extensions, react'
  },
  'og:image': {
    name: 'og:image',
    value: {
      id: '5VwseUvM96DL4TCKH42IM6',
      url:
        'https://images.ctfassets.net/9o4l1mrd1tci/5VwseUvM96DL4TCKH42IM6/d05b9b4773e44de340dc50051c8b5bf2/Screen_Shot_2019-08-30_at_1.10.13_PM.png',
      title: 'My Facebook Image'
    }
  },
  'og:title': {
    name: 'og:title',
    value: 'Last Rev | My facebook title is different'
  },
  'description': {
    name: 'description',
    value:
      'Morbi fringilla convallis sapien, id pulvinar odio volutpat. Nec dubitamus multa iter quae et nos invenerat. At nos hinc posthac, sitientis piros Afros.'
  },
  'twitter:image': {
    name: 'twitter:image',
    value: {
      id: '2OjCqPfrMWmUxlCHOT4ovc',
      url:
        'https://images.ctfassets.net/9o4l1mrd1tci/2OjCqPfrMWmUxlCHOT4ovc/e61c74e8219f0b1e8dd0c9d10b4c426b/Screen_Shot_2020-01-23_at_8.09.12_AM.png',
      title: 'Screen Shot 2020-01-23 at 8.09.12 AM'
    }
  }
};

const mockPage = {
  'title': {
    name: 'title',
    value: 'Last Rev | Recipes'
  },
  'keywords': {
    name: 'keywords',
    value: 'contentful, ui extensions, react, seo'
  },
  'twitter:description': {
    name: 'twitter:description',
    value:
      'Morbi fringilla convallis sapien, id pulvinar odio volutpat. Nec dubitamus multa iter quae et nos invenerat. At nos hinc posthac, sitientis piros Afros.'
  }
};

const mockRecipe = {
  'title': {
    name: 'title',
    value: 'Last Rev | Recipes - Lemongrass'
  },
  'og:description': {
    name: 'og:description',
    value:
      'Morbi fringilla convallis sapien, id pulvinar odio volutpat. Nec dubitamus multa iter quae et nos invenerat. At nos hinc posthac, sitientis piros Afros.'
  }
};

describe('GetSEO returns correct object', () => {
  test('should return empty array', () => {
    expect(getSEO()).toStrictEqual([]);
  });
  test('should return empty array', () => {
    expect(getSEO(null, [], '', undefined)).toStrictEqual([]);
  });
  test('should return Settings SEO', () => {
    const seo = getSEO(mockSettings);
    expect(seo.length).toStrictEqual(Object.keys(mockSettings).length);
  });
  test('should return Settings SEO Title', () => {
    const seo = getSEO(mockSettings);
    const tag = seo.find((o) => o.name === 'title');
    expect(tag.name).toStrictEqual(mockSettings.title.name);
    expect(tag.content).toStrictEqual(mockSettings.title.value);
  });
  test('should return Page SEO', () => {
    const seo = getSEO(mockPage, mockSettings);
    expect(seo.length).toStrictEqual(Object.keys(merge(mockPage, mockSettings)).length);
  });
  test('should return Page SEO Title', () => {
    const seo = getSEO(mockPage, mockSettings);
    const tag = seo.find((o) => o.name === 'title');
    expect(tag.name).toStrictEqual(mockPage.title.name);
    expect(tag.content).toStrictEqual(mockPage.title.value);
  });
  test('should return Page SEO Keywords', () => {
    const seo = getSEO(mockPage, mockSettings);
    const tag = seo.find((o) => o.name === 'keywords');
    expect(tag.name).toStrictEqual(mockPage.keywords.name);
    expect(tag.content).toStrictEqual(mockPage.keywords.value);
  });
  test('should return Recipe SEO', () => {
    const seo = getSEO(mockRecipe, mockPage, mockSettings);
    expect(seo.length).toStrictEqual(Object.keys(merge(mockRecipe, mockPage, mockSettings)).length);
  });
  test('should return Recipe SEO Title', () => {
    const seo = getSEO(mockRecipe, mockPage, mockSettings);
    const tag = seo.find((o) => o.name === 'title');
    expect(tag.name).toStrictEqual(mockRecipe.title.name);
    expect(tag.content).toStrictEqual(mockRecipe.title.value);
  });
});
