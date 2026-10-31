import { useState } from 'react';
import { Copy, Check } from 'lucide-react';

export function CopyButton({ text, label = 'Sao chép', size = 'sm', className = '' }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e) => {
    e.stopPropagation();
    if (!text) return;
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className={`btn ${copied ? 'btn-outline' : 'btn-secondary'} btn-${size} ${className}`}
      title="Sao chép vào clipboard"
      disabled={!text}
    >
      {copied ? <Check size={16} className="text-success" /> : <Copy size={16} />}
      <span>{copied ? 'Đã chép!' : label}</span>
    </button>
  );
}
