export const formatContentfulData = (calculator) => {
  let {
    formFields,
    faq,
    formFieldsTitle,
    faqTitle,
    header,
    calculatorNavigationHeader,
    navigationItems,
    disclaimer,
    seoFields,
    callToAction,
    tooltips
  } = calculator?.items[0]?.fields;
  formFields = formFields.map(({ fields }) => fields);
  faq = faq.map(({ fields }) => fields);
  const {
    fields: { title, titleTwo, text }
  } = header;
  const {
    fields: { title: navigationTitle, titleTwo: navigationSubTitle }
  } = calculatorNavigationHeader;
  const items = navigationItems.map(({ fields: { cta, image, text, title, url } }) => ({
    cta,
    text,
    title,
    image: image?.fields,
    url
  }));
  const formatedTooltips = {};
  if (tooltips) {
    for (const {
      fields: { tagLine, text }
    } of tooltips) {
      formatedTooltips[tagLine] = text;
    }
  }
  return {
    seoFields: seoFields?.fields,
    formFields: {
      title: formFieldsTitle,
      fields: [
        formFields.slice(0, Math.ceil(formFields.length / 2)),
        formFields.slice(Math.ceil(formFields.length / 2))
      ]
    },
    faq: {
      title: faqTitle,
      fields: [faq.slice(0, Math.ceil(faq.length / 2)), faq.slice(Math.ceil(faq.length / 2))]
    },
    header: {
      title,
      subTitle: titleTwo ?? text
    },
    navigation: {
      title: navigationTitle,
      subTitle: navigationSubTitle,
      items: items.filter((el) => el?.image)
    },
    disclaimer,
    callToAction: callToAction.fields,
    tooltips: formatedTooltips
  };
};
