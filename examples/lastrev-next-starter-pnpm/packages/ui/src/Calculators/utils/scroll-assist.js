function isScrolledIntoView(el, offset = 0) {
  const NAV_BAR_HEIGHT = 123;

  if (typeof el !== 'undefined' && el != null) {
    let top = el.offsetTop - offset;
    let height = el.offsetHeight;

    while (el.offsetParent) {
      el = el.offsetParent;
      top += el.offsetTop;
    }
    return (
      top < window.pageYOffset + window.innerHeight - NAV_BAR_HEIGHT &&
      top + height > window.pageYOffset
    );
  }
}

function scrollToElement(el, yOffset = -100) {
  if (el?.current) {
    const y = el.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
    window.scrollTo({ top: y, behavior: 'smooth' });
  }
}

export { isScrolledIntoView, scrollToElement };
