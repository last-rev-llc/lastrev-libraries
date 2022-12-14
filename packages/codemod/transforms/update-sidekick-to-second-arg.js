export default function transformer(file, api) {
  const j = api.jscodeshift;

  return j(file.source)
    .find(j.JSXSpreadAttribute)
    .forEach((s) => {
      const spread = s.value;

      if (spread && spread.argument && spread.argument.callee && spread.argument.callee.name == 'sidekick') {
        const sidekickCall = spread.argument.arguments[0];
        if (sidekickCall.type === 'OptionalMemberExpression' || sidekickCall.type === 'MemberExpression') {
          spread.argument.arguments[0] = j.identifier('sidekickLookup');
          spread.argument.arguments.push(j.literal(sidekickCall.property.name));
        }
      }
    })
    .toSource();
}
