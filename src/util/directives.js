import { Directive } from 'vue';

export const imgLazyDirective = {
  mounted(el, binding) {
    console.log(el, binding.value);
  },

};
