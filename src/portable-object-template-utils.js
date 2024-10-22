function portableObjectTemplateIteratee({
  msgId,
  msgIdPlural,
  msgCtxt,
  references,
}) {
  const template = [];
  if (Object.keys(references).length > 0) {
    const iteratee = ({ relativePath, line, column }) =>
      `${relativePath}:${line}:${column + 1}`;
    const allReferences = Object.values(references).map(iteratee).join(' ');
    template.push(`#: ${allReferences}`);
  }
  if (msgCtxt) {
    template.push(`msgctxt ${JSON.stringify(msgCtxt)}`);
  }
  template.push(`msgid ${JSON.stringify(msgId)}`);
  if (msgIdPlural) {
    template.push(`msgid_plural ${JSON.stringify(msgIdPlural)}`);
    template.push('msgstr[0] ""');
    template.push('msgstr[1] ""');
  } else {
    template.push('msgstr ""');
  }

  return template.join('\n');
}

function javascriptSourceIteratee({ msgIdPlural, msgId }) {
  if (msgId && msgIdPlural) {
    return `Drupal.formatPlural(0, ${JSON.stringify(msgId)}, ${JSON.stringify(msgIdPlural)});`;
  }
  if (msgId) {
    return `Drupal.t(${JSON.stringify(msgId)});`;
  }
  return null;
}

function contentStringFormatter(content) {
  const contentString = content.join('\n\n');

  return contentString + '\n';
}

export function generatePotFile(msgValues) {
  const msgsAsString = msgValues.map(portableObjectTemplateIteratee);
  return contentStringFormatter(msgsAsString);
}

export function generateTranslationStringFile(msgValues) {
  const msgsAsString = msgValues.map(javascriptSourceIteratee);
  const calls = msgsAsString.filter(x => x !== null).join('');
  return `{function __DRUPAL_INTERFACE_TRANSLATIONS() {${calls}}}`
}
