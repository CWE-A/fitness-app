import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Sparkles } from 'lucide-react';

const LOREM_WORDS = [
  'lorem', 'ipsum', 'dolor', 'sit', 'amet', 'consectetur', 'adipiscing', 'elit',
  'sed', 'do', 'eiusmod', 'tempor', 'incididunt', 'ut', 'labore', 'et', 'dolore',
  'magna', 'aliqua', 'enim', 'ad', 'minim', 'veniam', 'quis', 'nostrud', 'exercitation',
  'ullamco', 'laboris', 'nisi', 'aliquip', 'ex', 'ea', 'commodo', 'consequat', 'duis',
  'aute', 'irure', 'in', 'reprehenderit', 'voluptate', 'velit', 'esse', 'cillum',
  'fugiat', 'nulla', 'pariatur', 'excepteur', 'sint', 'occaecat', 'cupidatat', 'non',
  'proident', 'sunt', 'culpa', 'qui', 'officia', 'deserunt', 'mollit', 'anim', 'id', 'est', 'laborum'
];

export default function TaoLoremIpsum() {
  const [count, setCount] = useState('3');
  const [type, setType] = useState('paragraphs'); // 'paragraphs', 'words', 'sentences'
  const [startWithLorem, setStartWithLorem] = useState(true);

  const generateWords = (num) => {
    const words = [];
    for (let i = 0; i < num; i++) {
      words.push(LOREM_WORDS[Math.floor(Math.random() * LOREM_WORDS.length)]);
    }
    return words;
  };

  const generateSentence = () => {
    const len = Math.floor(Math.random() * 10) + 8; // 8-17 words
    const words = generateWords(len);
    words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
    return words.join(' ') + '.';
  };

  const generateParagraph = (isFirst) => {
    const numSentences = Math.floor(Math.random() * 4) + 4; // 4-7 sentences
    const sentences = [];
    for (let i = 0; i < numSentences; i++) {
      sentences.push(generateSentence());
    }
    if (isFirst && startWithLorem) {
      sentences[0] = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.';
    }
    return sentences.join(' ');
  };

  const generateText = () => {
    const n = Math.max(1, parseInt(count) || 1);
    if (type === 'paragraphs') {
      const pList = [];
      for (let i = 0; i < n; i++) {
        pList.push(generateParagraph(i === 0));
      }
      return pList.join('\n\n');
    } else if (type === 'sentences') {
      const sList = [];
      for (let i = 0; i < n; i++) {
        sList.push(generateSentence());
      }
      return sList.join(' ');
    } else {
      // words
      const words = generateWords(n);
      if (startWithLorem && words.length >= 2) {
        words[0] = 'Lorem';
        words[1] = 'ipsum';
      }
      return words.join(' ');
    }
  };

  const [output, setOutput] = useState(generateText);

  const handleGenerate = () => {
    setOutput(generateText());
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Số lượng
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={count}
            onChange={(e) => setCount(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Đơn vị
          </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="paragraphs">Đoạn văn (Paragraphs)</option>
            <option value="sentences">Câu (Sentences)</option>
            <option value="words">Từ (Words)</option>
          </select>
        </div>

        <div>
          <button
            type="button"
            onClick={handleGenerate}
            className="btn btn-primary"
            style={{ width: '100%', height: '42px' }}
          >
            <Sparkles size={16} /> Tạo văn bản
          </button>
        </div>
      </div>

      <div>
        <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.88rem', cursor: 'pointer' }}>
          <input
            type="checkbox"
            checked={startWithLorem}
            onChange={(e) => setStartWithLorem(e.target.checked)}
            style={{ width: 'auto' }}
          />
          <span>Bắt đầu bằng cụm từ "Lorem ipsum dolor sit amet..."</span>
        </label>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Văn bản mẫu đã tạo
          </label>
          <CopyButton text={output} label="Sao chép toàn bộ" />
        </div>
        <textarea
          rows={9}
          value={output}
          onChange={(e) => setOutput(e.target.value)}
          style={{ lineHeight: 1.7 }}
        />
      </div>
    </div>
  );
}
