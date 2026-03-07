'use client';

import { Player } from '@remotion/player';
import {
  AppShowcase,
  SHOWCASE_DURATION,
  SHOWCASE_FPS,
  HomeOnlyShowcase,
  DictOnlyShowcase,
  HOME_ONLY_DURATION,
  DICT_ONLY_DURATION,
} from '@/remotion/AppShowcase';

const PLAYER_PROPS = {
  fps: SHOWCASE_FPS,
  compositionWidth: 480,
  compositionHeight: 620,
  style: { width: '100%', height: '100%' },
  controls: false as const,
  loop: true,
  initiallyShowControls: false,
  clickToPlay: false,
  spaceKeyToPlayOrPause: false,
  moveToBeginningWhenEnded: false,
  playbackRate: 1,
  autoPlay: true,
};

/** Single alternating phone — used on mobile */
export function AppPreview() {
  return (
    <Player
      {...PLAYER_PROPS}
      component={AppShowcase}
      durationInFrames={SHOWCASE_DURATION}
    />
  );
}

/** Home-only phone — used in desktop side-by-side */
export function HomePreview() {
  return (
    <Player
      {...PLAYER_PROPS}
      component={HomeOnlyShowcase}
      durationInFrames={HOME_ONLY_DURATION}
    />
  );
}

/** Dictionary-only phone — used in desktop side-by-side */
export function DictPreview() {
  return (
    <Player
      {...PLAYER_PROPS}
      component={DictOnlyShowcase}
      durationInFrames={DICT_ONLY_DURATION}
    />
  );
}
