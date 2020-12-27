import { animate, animation, style } from '@angular/animations';

/**
 * 转动可复用动画
 * @author silentmx
 */
export const rotateAnimation = animation([
  style({
    transform: "rotate({{from}}deg)"
  }),
  animate(
    "{{time}}",
    style({ transform: "rotate({{to}}deg)" })
  ),
])