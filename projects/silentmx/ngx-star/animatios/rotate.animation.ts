import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

class RotateConfig {
  time?: string | number = "200";
  startState?: string = "closed";
  endState?: string = "open";
  rotate?: string | number = "90";
}

/**
 * 转动动画
 * @author silentmx
 */
export function rotateAnimation(config?: RotateConfig): AnimationTriggerMetadata {
  return ((config?: RotateConfig): AnimationTriggerMetadata => {
    config = { ...new RotateConfig(), ...config };
    return trigger("rotate", [
      state(
        `${config.startState}`,
        style({
          transform: `rotate(0deg)`,
        })
      ),
      state(
        `${config.endState}`,
        style({
          transform: `rotate(${config.rotate}deg)`,
        })
      ),
      transition(`${config.startState} => ${config.endState}`, [
        animate(
          `${config.time}ms ease-out`,
          style({
            transform: `rotate(${config.rotate}deg)`
          })
        )
      ]),
      transition(`${config.endState} => ${config.startState}`, [
        animate(
          `${config.time}ms ease-out`,
          style({
            transform: `rotate(0deg)`
          })
        )
      ]),
    ]);
  })(config);
}