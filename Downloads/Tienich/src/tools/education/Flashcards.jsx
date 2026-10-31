import { useState } from 'react';
import { Plus, Trash2, RotateCw, Check, ArrowRight } from 'lucide-react';

export default function Flashcards() {
  const [cards, setCards] = useState([
    { id: 1, front: 'Accommodate', back: 'Cung cấp chỗ ở, đáp ứng nhu cầu' },
    { id: 2, front: 'Collaborate', back: 'Hợp tác, cộng tác cùng làm việc' },
    { id: 3, front: 'Ubiquitous', back: 'Có mặt ở khắp mọi nơi, phổ biến' }
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [newFront, setNewFront] = useState('');
  const [newBack, setNewBack] = useState('');

  const addCard = () => {
    if (!newFront.trim() || !newBack.trim()) return;
    setCards([...cards, { id: Date.now(), front: newFront.trim(), back: newBack.trim() }]);
    setNewFront('');
    setNewBack('');
  };

  const removeCard = (id) => {
    if (cards.length <= 1) return;
    setCards(cards.filter(c => c.id !== id));
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    setIsFlipped(false);
    setCurrentIndex((prev) => (prev + 1) % cards.length);
  };

  const currentCard = cards[currentIndex] || cards[0];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', alignItems: 'center' }}>
      {/* Interactive Flip Card */}
      <div
        onClick={() => setIsFlipped(!isFlipped)}
        style={{
          width: '100%',
          maxWidth: '480px',
          height: '240px',
          backgroundColor: isFlipped ? 'var(--primary-subtle)' : 'var(--bg-surface)',
          border: `2px solid ${isFlipped ? 'var(--primary)' : 'var(--border-color)'}`,
          borderRadius: 'var(--radius-xl)',
          boxShadow: 'var(--shadow-lg)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '2rem',
          cursor: 'pointer',
          textAlign: 'center',
          position: 'relative',
          transition: 'all 0.25s ease'
        }}
      >
        <span style={{ position: 'absolute', top: '1rem', left: '1.25rem', fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase' }}>
          Thẻ {currentIndex + 1} / {cards.length} • {isFlipped ? 'Mặt sau (Ý nghĩa)' : 'Mặt trước (Từ vựng)'}
        </span>

        <span style={{ position: 'absolute', top: '1rem', right: '1.25rem', color: 'var(--text-muted)' }}>
          <RotateCw size={18} />
        </span>

        <div style={{ fontSize: isFlipped ? '1.35rem' : '1.85rem', fontWeight: 800, color: isFlipped ? 'var(--primary)' : 'var(--text-primary)', lineHeight: 1.4 }}>
          {isFlipped ? currentCard.back : currentCard.front}
        </div>

        <div style={{ position: 'absolute', bottom: '1rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          Nhấp chuột để lật thẻ
        </div>
      </div>

      {/* Navigation */}
      <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
        <button type="button" onClick={nextCard} className="btn btn-primary btn-lg">
          <span>Thẻ tiếp theo</span>
          <ArrowRight size={18} />
        </button>
      </div>

      {/* Add New Card Form */}
      <div className="card" style={{ width: '100%', maxWidth: '600px' }}>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Thêm thẻ mới vào bộ từ vựng</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '0.75rem', marginBottom: '0.75rem' }}>
          <input
            type="text"
            placeholder="Mặt trước (Từ mới / Câu hỏi)"
            value={newFront}
            onChange={(e) => setNewFront(e.target.value)}
          />
          <input
            type="text"
            placeholder="Mặt sau (Nghĩa / Đáp án)"
            value={newBack}
            onChange={(e) => setNewBack(e.target.value)}
          />
        </div>
        <button type="button" onClick={addCard} className="btn btn-primary btn-sm" style={{ width: '100%' }}>
          <Plus size={16} /> Thêm thẻ flashcard
        </button>
      </div>
    </div>
  );
}
