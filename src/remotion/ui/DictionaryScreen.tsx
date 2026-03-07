import { interpolate, useCurrentFrame } from 'remotion';
import { mockDictionaryWords } from '../data/mock';
import { Search, Share2, SortDesc } from 'lucide-react';

export function DictionaryScreen() {
  const frame = useCurrentFrame();

  const headerOpacity = interpolate(frame, [0, 18], [0, 1], { extrapolateRight: 'clamp' });
  const headerY = interpolate(frame, [0, 18], [16, 0], { extrapolateRight: 'clamp' });
  const searchOpacity = interpolate(frame, [10, 26], [0, 1], { extrapolateRight: 'clamp' });
  const searchY = interpolate(frame, [10, 26], [12, 0], { extrapolateRight: 'clamp' });

  const words = mockDictionaryWords.slice(0, 4);

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
          marginBottom: 16,
          opacity: headerOpacity,
          transform: `translateY(${headerY}px)`,
        }}
      >
        <span style={{ fontSize: 11, fontWeight: 700, color: '#737373', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          ← Back
        </span>
        <span style={{ fontSize: 15, fontWeight: 700, color: '#111' }}>
          AwaDiko Community
        </span>
        <div style={{ fontSize: 11, fontWeight: 600, padding: '3px 10px', borderRadius: 999, background: '#111', color: '#fff' }}>
          EN ⇄ YO
        </div>
      </div>

      {/* Search bar */}
      <div
        style={{
          position: 'relative',
          marginBottom: 14,
          opacity: searchOpacity,
          transform: `translateY(${searchY}px)`,
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: 999,
          padding: '8px 14px',
          gap: 8,
        }}>
          <Search size={13} color="#a3a3a3" />
          <span style={{ fontSize: 12, color: '#a3a3a3' }}>Search Yoruba, Igbo, Hausa…</span>
        </div>
      </div>

      {/* Alphabet strip + word grid */}
      <div style={{ display: 'flex', gap: 10, flex: 1, overflow: 'hidden' }}>
        {/* Word cards */}
        <div style={{ flex: 1, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8, alignContent: 'start' }}>
          {words.map((w, i) => {
            const cardOpacity = interpolate(frame, [20 + i * 7, 36 + i * 7], [0, 1], { extrapolateRight: 'clamp' });
            const cardY = interpolate(frame, [20 + i * 7, 36 + i * 7], [14, 0], { extrapolateRight: 'clamp' });
            return (
              <div
                key={w.id}
                style={{
                  background: '#fff',
                  border: '1px solid #e5e5e5',
                  borderRadius: 12,
                  padding: '10px 12px',
                  opacity: cardOpacity,
                  transform: `translateY(${cardY}px)`,
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                  <span style={{ fontSize: 13, fontWeight: 600, color: '#111' }}>{w.word}</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <span style={{
                      fontSize: 8,
                      fontWeight: 700,
                      padding: '1px 6px',
                      borderRadius: 999,
                      background: w.language === 'Yoruba' ? '#fef3c7' : w.language === 'Igbo' ? '#dcfce7' : w.language === 'Swahili' ? '#fce7f3' : '#e0f2fe',
                      color: w.language === 'Yoruba' ? '#92400e' : w.language === 'Igbo' ? '#166534' : w.language === 'Swahili' ? '#9d174d' : '#075985',
                    }}>
                      {w.language}
                    </span>
                    <Share2 size={11} color="#a3a3a3" />
                  </div>
                </div>
                <div style={{ fontSize: 11, color: '#A30202', marginBottom: 3 }}>
                  <em>AwaDiko English: </em>
                  <span style={{ color: '#333', fontWeight: 500 }}>{w.translation}</span>
                </div>
                <div style={{ fontSize: 10, color: '#737373', fontStyle: 'italic', marginBottom: 3 }}>{w.partOfSpeech}</div>
                <p style={{ fontSize: 10, color: '#525252', lineHeight: 1.4, margin: 0 }}>
                  {w.definition.slice(0, 60)}…
                </p>
                <div style={{
                  marginTop: 7,
                  background: '#fafafa',
                  border: '1px solid #efefef',
                  borderRadius: 7,
                  padding: '5px 8px',
                  fontSize: 10,
                  color: '#737373',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                  <span>Top Suggestions</span>
                  <span style={{ fontSize: 9 }}>▾</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Alphabet sidebar */}
        <div style={{
          width: 26,
          background: '#fff',
          border: '1px solid #e5e5e5',
          borderRadius: 999,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          padding: '6px 0',
          gap: 2,
          opacity: headerOpacity,
        }}>
          <SortDesc size={12} color="#737373" style={{ marginBottom: 4 }} />
          {['A', 'B', 'E', 'I', 'O', 'U'].map(l => (
            <span key={l} style={{ fontSize: 9, color: '#a3a3a3', fontWeight: 500 }}>{l}</span>
          ))}
        </div>
      </div>
    </div>
  );
}
