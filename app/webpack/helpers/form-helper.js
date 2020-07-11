export function getCsrfToken() {
  return document.querySelector('[name=csrf-token]').content;
}
