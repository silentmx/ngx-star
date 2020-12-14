import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

/**
 * Animations used by the toast box
 * @author silentmx
 */
export const NgxToastAnimations: {
  readonly toastState: AnimationTriggerMetadata;
} = {
  /** Animation that shows and hides a ngx-toast */
  toastState: trigger("state", [
    state("void, hidden", style({
      transform: "scale(0.8)",
      opacity: 0,
    })),
    state("visible", style({
      transform: "scale(1)",
      opacity: 1,
    })),
    transition('* => visible', animate('150ms cubic-bezier(0, 0, 0.2, 1)')),
    transition('* => void, * => hidden', animate('150ms cubic-bezier(0.4, 0.0, 1, 1)', style({
      opacity: 0
    }))),
  ])
}