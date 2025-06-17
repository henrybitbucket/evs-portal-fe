const shouldRenderMobileVersion = (size?) => {
  const width = size ? size.width : window.innerWidth;
  return width <= 767;
};

export { shouldRenderMobileVersion };
