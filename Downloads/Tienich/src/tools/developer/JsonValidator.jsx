import { useState } from 'react';
import { AlertCircle, CheckCircle, RotateCcw } from 'lucide-react';

export default function JsonValidator() {
  const [input, setInput] = useState('{\n  "status": "success",\n  "code": 200,\n  "data": [\n    "Item 1",\n    "Item 2"\n  ]\n}');
  const [validation, setValidation] = useState({ isValid: true, message: 'JSON hợp lệ' });

  const validate = (str) => {
    if (!str.trim()) {
      setValidation({ isValid: null, message: 'Vui lòng nhập chuỗi JSON để kiểm tra' });
      return;
    }
    try {
      JSON.parse(str);
      setValidation({ isValid: true, message: 'Cú pháp JSON hoàn toàn hợp lệ (Valid JSON)!' });
    } catch (err) {
      setValidation({ isValid: false, message: err.message });
    }
  };

  const handleChange = (e) => {
    const val = e.target.value;
    setInput(val);
    validate(val);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
          <label style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
            Chuỗi JSON cần kiểm tra cú pháp
          </label>
          <button
            type="button"
            onClick={() => { setInput(''); setValidation({ isValid: null, message: '' }); }}
            className="btn btn-secondary btn-sm"
          >
            <RotateCcw size={14} /> Xóa
          </button>
        </div>
        <textarea
          rows={10}
          value={input}
          onChange={handleChange}
          placeholder="Dán JSON cần validate..."
          style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem' }}
        />
      </div>

      {validation.isValid === true && (
        <div className="alert alert-success">
          <CheckCircle size={20} />
          <div>
            <strong>Hợp lệ:</strong> {validation.message}
          </div>
        </div>
      )}

      {validation.isValid === false && (
        <div className="alert alert-danger">
          <AlertCircle size={20} />
          <div>
            <strong>Lỗi cú pháp JSON:</strong> {validation.message}
          </div>
        </div>
      )}
    </div>
  );
}
