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
        style({ height: 0, overflow: "hidden" }),
        animate(`${config.time}ms ease-in`, style({ height: "*" })),
      ]),
      transition(":leave", [
        style({ height: "*", overflow: "hidden" }),
        animate(`${config.time}ms ease-out`, style({ height: 0 })),
      ])
    ])
  })(config);
}