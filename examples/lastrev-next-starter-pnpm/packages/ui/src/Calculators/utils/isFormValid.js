export const isFormValid = (form, formData) => {
  for (const { data } of form) {
    for (const { controls } of data) {
      if (Array.isArray(controls)) {
        for (const { id, required } of controls) {
          if (required && !formData[id]) return false;
        }
      } else {
        if (controls.required && !formData[controls.id]) return false;
      }
    }
  }
  for (const field in formData) {
    if (Object.prototype.hasOwnProperty.call(formData, field)) {
      const error = formData[field]?.error;
      if (error) return false;
    }
  }
  return true;
};
