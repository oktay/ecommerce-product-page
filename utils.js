export function templateRenderer(templateHtml, data) {
  let result = templateHtml

  for (const key in data) {
    result = result.replace(new RegExp(`%_${key}_%`, 'g'), data[key])
  }

  return result;
}