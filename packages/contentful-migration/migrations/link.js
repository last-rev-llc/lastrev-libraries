module.exports = function (migration) {
  const link = migration
    .editContentType("link")
    .name("Link")
    .description("")
    .displayField("internalTitle");
  link
    .createField("internalTitle")
    .name("Internal Title")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  link
    .createField("linkedContent")
    .name("LinkedContent")
    .type("Link")
    .localized(false)
    .required(false)
    .validations([
      {
        linkContentType: ["page"],
      },
    ])
    .disabled(false)
    .omitted(false)
    .linkType("Entry");

  link
    .createField("manualUrl")
    .name("Manual URL")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);
  link
    .editField("text")
    .name("Text")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([])
    .disabled(false)
    .omitted(false);

  link
    .createField("icon")
    .name("Icon")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        in: [
          "instagram",
          "facebook",
          "twitter",
          "youtube",
          "chevron-right",
          "caret-right",
        ],
      },
    ])
    .disabled(false)
    .omitted(false);

  link
    .createField("iconPosition")
    .name("Icon Position")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        in: ["Left", "Right"],
      },
    ])
    .defaultValue({
      "en-US": "Right",
    })
    .disabled(false)
    .omitted(false);

  link
    .createField("variant")
    .name("Variant")
    .type("Symbol")
    .localized(false)
    .required(false)
    .validations([
      {
        in: ["link", "button-text", "button-outlined", "button-contained"],
        message: "text",
      },
    ])
    .defaultValue({
      "en-US": "link",
    })
    .disabled(false)
    .omitted(false);

  link.changeFieldControl("internalTitle", "builtin", "singleLine", {});

  link.changeFieldControl("linkedContent", "builtin", "entryLinkEditor", {
    showLinkEntityAction: true,
    showCreateEntityAction: false,
  });

  link.changeFieldControl("manualUrl", "builtin", "singleLine", {});
  link.changeFieldControl("text", "builtin", "singleLine", {});

  link.changeFieldControl("icon", "builtin", "dropdown", {
    helpText: "For icon-only buttons, leave text field empty",
  });

  link.changeFieldControl("iconPosition", "builtin", "dropdown", {
    helpText: "Icon positioned on the right side of the text by default",
  });

  link.changeFieldControl("variant", "builtin", "dropdown", {});
};
