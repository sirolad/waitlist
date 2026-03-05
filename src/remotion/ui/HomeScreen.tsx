import { interpolate, useCurrentFrame } from 'remotion';
import { mockHomeCards } from '../data/mock';
import { BookPlus, Lightbulb, Vote } from 'lucide-react';

type CardVariant = 'vote' | 'suggest' | 'request';

const cardStyles: Record<CardVariant, { bg: string; border: string; tagBg: string; tagText: string; wordColor: string }> = {
  vote: {
    bg: '#e4fde4',
    border: '#c8fac9',
    tagBg: '#e4fde4',
    tagText: '#50954d',
    wordColor: '#111',
  },
  suggest: {
    bg: '#eff6ff',
    border: '#bfdbfe',
    tagBg: '#dbeafe',
    tagText: '#1d4ed8',
    wordColor: '#111',
  },
  request: {
    bg: '#f8f3fd',
    border: '#eaddf7',
    tagBg: '#f8f3fd',
    tagText: '#6826af',
    wordColor: '#6826af',
  },
};

const cardIcons: Record<CardVariant, React.ReactNode> = {
  vote: <Vote size={11} color="#fff" />,
  suggest: <Lightbulb size={11} color="#fff" />,
  request: <BookPlus size={11} color="#fff" />,
};

const cardBtnLabels: Record<CardVariant, string> = {
  vote: 'Vote',
  suggest: 'Curate',
  request: 'Request',
};

export function HomeScreen() {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 16], [0, 1], { extrapolateRight: 'clamp' });
  const headerY = interpolate(frame, [0, 16], [14, 0], { extrapolateRight: 'clamp' });

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        background: '#fafafa',
        fontFamily: 'system-ui, sans-serif',
        display: 'flex',
        flexDirection: 'column',
        padding: '20px 24px',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 18,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>Hi, Adaeze!</div>
          <div style={{ display: 'inline-block', fontSize: 9, fontWeight: 600, padding: '2px 7px', borderRadius: 4, background: '#9c62d9', color: '#fff', marginTop: 2 }}>
            Explorer
          </div>
        </div>
        <div style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: '#111', color: '#fff' }}>
          🌍 Communities
        </div>
      </div>

      {/* CTA Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, flex: 1 }}>
        {mockHomeCards.map((card, i) => {
          const cardOpacity = interpolate(frame, [12 + i * 10, 28 + i * 10], [0, 1], { extrapolateRight: 'clamp' });
          const cardY = interpolate(frame, [12 + i * 10, 28 + i * 10], [16, 0], { extrapolateRight: 'clamp' });
          const styles = cardStyles[card.variant];

          return (
            <div
              key={card.variant}
              style={{
                background: '#fff',
                border: '1px solid #e5e5e5',
                borderRadius: 16,
                overflow: 'hidden',
                opacity: cardOpacity,
                transform: `translateY(${cardY}px)`,
              }}
            >
              {/* Card header */}
              <div style={{ padding: '10px 14px 6px' }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#111' }}>{card.title}</div>
                <div style={{ fontSize: 10, color: '#737373', marginTop: 2 }}>{card.subTitle}</div>
              </div>
              {/* Word display */}
              <div style={{
                margin: '0 14px 10px',
                background: styles.bg,
                border: `1px solid ${styles.border}`,
                borderRadius: 10,
                padding: '8px 10px',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 9, fontWeight: 600, padding: '2px 8px', borderRadius: 999, background: styles.tagBg, color: styles.tagText }}>
                    {card.ctaText}
                  </span>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 4,
                    background: '#111',
                    borderRadius: 8,
                    padding: '3px 8px',
                    fontSize: 9,
                    fontWeight: 600,
                    color: '#fff',
                  }}>
                    {cardIcons[card.variant]}
                    {cardBtnLabels[card.variant]}
                  </div>
                </div>
                <div style={{ fontSize: 14, fontWeight: 300, color: styles.wordColor }}>{card.word}</div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
