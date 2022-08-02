import fieldResolver from './fieldResolver';

const fieldsResolver = (type: string, fields: string[]) =>
  fields.reduce((accum: any, field: string) => {
    return { ...accum, [field]: fieldResolver(type) };
  }, {});

export default fieldsResolver;
