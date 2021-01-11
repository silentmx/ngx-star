import { animate, AnimationTriggerMetadata, state, style, transition, trigger } from '@angular/animations';

class RotateConfig {
  time?: string | number = "200";
  rotate?: string | number = "90";
}

/**
 * 转动动画
 * @author silentmx
 */
export function rotateAnimation(config?: RotateConfig): AnimationTriggerMetadata {
  return ((config?: RotateConfig): AnimationTriggerMetadata => {
    config = { ...new RotateConfig(), ...config };
    return trigger(`rotate${config.rotate}`, [
      state(
        "start",
        style({
          transform: `rotate(0deg)`,
        })
      ),
      state(
        "end",
        style({
          transform: `rotate(${config.rotate}deg)`,
        })
      ),
      transition(`start => end`, [
        animate(
          `${config.time}ms ease-out`,
          style({
            transform: `rotate(${config.rotate}deg)`
          })
        )
      ]),
      transition(`end => start`, [
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