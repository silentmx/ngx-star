import { animate, animation, style } from '@angular/animations';

export const transAnimation = animation([
  style({
    height: "{{ height }}",
    opacity: "{{ opacity }}",
    overflow: "hidden"
  }),
  animate("{{ time }}")
]);