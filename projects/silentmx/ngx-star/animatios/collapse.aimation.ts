import { animate, AnimationTriggerMetadata, style, transition, trigger } from '@angular/animations';

class CollapseConfig {
  time?: string | number = 200;
}

/**
 * Collapse Animation
 * @param config 
 * @author silentmx
 */
export function collapseAnimation(config?: CollapseConfig): AnimationTriggerMetadata {
  return ((config?: CollapseConfig): AnimationTriggerMetadata => {
    config = { ...new CollapseConfig, ...config };
    return trigger("collapse", [
      transition(":enter", [
        style({ opacity: 0, height: 0, overflow: "hidden" }),
        animate(`${config.time}ms ease-in`, style({ opacity: 1, height: "*" })),
      ]),
      transition(":leave", [
        style({ opacity: 1, height: "*", overflow: "hidden" }),
        animate(`${config.time}ms ease-out`, style({ opacity: 0.5, height: 0 })),
      ])
    ])
  })(config);
}