function applyStyle(element, binding) {
  Object.keys(binding.value).forEach((position) => {
    element.style[position] = binding.value[position];
  });
  element.style.position = 'absolute';
  element.style.opacity = 0.25;
}

export default {
  bind: (element, binding) => {
    applyStyle(element, binding);
  },
  update: (element, binding) => {
    applyStyle(element, binding);
  },

};
