import { AbsoluteFill, interpolate, Sequence, useCurrentFrame } from 'remotion';
import { HomeScreen } from './ui/HomeScreen';
import { DictionaryScreen } from './ui/DictionaryScreen';

// 30 fps
export const SHOWCASE_FPS = 30;

// Home: 0–120 (4 s), Dictionary: 120–240 (4 s), overlap = 15 frames cross-fade
const HOME_DURATION = 120;
const DICT_DURATION = 120;
export const SHOWCASE_DURATION = HOME_DURATION + DICT_DURATION;

function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 280,
        height: 520,
        borderRadius: 32,
        border: '6px solid #111',
        background: '#111',
        boxShadow: '0 24px 64px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.12)',
        overflow: 'hidden',
        position: 'relative',
      }}
    >
      {/* Notch */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: '50%',
        transform: 'translateX(-50%)',
        width: 80,
        height: 22,
        background: '#111',
        borderBottomLeftRadius: 14,
        borderBottomRightRadius: 14,
        zIndex: 10,
      }} />
      {/* Screen */}
      <div style={{ width: '100%', height: '100%', background: '#fafafa', borderRadius: 26, overflow: 'hidden' }}>
        {children}
      </div>
    </div>
  );
}

function Label({ text, opacity }: { text: string; opacity: number }) {
  return (
    <div style={{
      marginTop: 16,
      fontSize: 11,
      fontWeight: 600,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: '#737373',
      opacity,
    }}>
      {text}
    </div>
  );
}

export const HOME_ONLY_DURATION = 120;
export const DICT_ONLY_DURATION = 120;

export function HomeOnlyShowcase() {
  return (
    <AbsoluteFill style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop: 2 }}>
      <PhoneFrame>
        <HomeScreen />
      </PhoneFrame>
    </AbsoluteFill>
  );
}

export function DictOnlyShowcase() {
  return (
    <AbsoluteFill style={{ background: 'transparent', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', paddingTop:2 }}>
      <PhoneFrame>
        <DictionaryScreen />
      </PhoneFrame>
    </AbsoluteFill>
  );
}

export function AppShowcase() {
  const frame = useCurrentFrame();

  // Cross-fade: home fades out at 110–125, dict fades in at 110–125
  const homeOpacity = interpolate(frame, [HOME_DURATION - 10, HOME_DURATION + 5], [1, 0], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
  const dictOpacity = interpolate(frame, [HOME_DURATION - 10, HOME_DURATION + 5], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });

  const homeLabelOpacity = interpolate(frame, [5, 18], [0, 1], { extrapolateRight: 'clamp' });
  const dictLabelOpacity = interpolate(frame, [HOME_DURATION, HOME_DURATION + 14], [0, 1], { extrapolateRight: 'clamp' });

  const isDict = frame >= HOME_DURATION - 10;

  return (
    <AbsoluteFill
      style={{
        background: 'transparent',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <PhoneFrame>
        {/* Home screen */}
        <div style={{ position: 'absolute', inset: 0, opacity: homeOpacity, pointerEvents: 'none' }}>
          <Sequence from={0} durationInFrames={HOME_DURATION + 10}>
            <HomeScreen />
          </Sequence>
        </div>

        {/* Dictionary screen */}
        <div style={{ position: 'absolute', inset: 0, opacity: dictOpacity, pointerEvents: 'none' }}>
          <Sequence from={HOME_DURATION - 10} durationInFrames={DICT_DURATION + 10}>
            <DictionaryScreen />
          </Sequence>
        </div>
      </PhoneFrame>

      <Label
        text={isDict ? 'AwaDiko Dictionary' : 'Home Dashboard'}
        opacity={isDict ? dictLabelOpacity : homeLabelOpacity}
      />
    </AbsoluteFill>
  );
}
