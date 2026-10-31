import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { ArrowLeftRight, RotateCcw } from 'lucide-react';

export default function ChuyenDoiDonVi() {
  const [category, setCategory] = useState('length'); // 'length', 'mass', 'temp'
  const [inputValue, setInputValue] = useState('1');
  const [fromUnit, setFromUnit] = useState('m');
  const [toUnit, setToUnit] = useState('cm');

  // Đơn vị và tỷ lệ chuẩn (đưa về mét hoặc gram)
  const lengthUnits = {
    mm: { name: 'Milimét (mm)', factor: 0.001 },
    cm: { name: 'Xentimét (cm)', factor: 0.01 },
    m: { name: 'Mét (m)', factor: 1 },
    km: { name: 'Kilômét (km)', factor: 1000 },
    inch: { name: 'Inch (in)', factor: 0.0254 },
    ft: { name: 'Feet (ft)', factor: 0.3048 },
    yd: { name: 'Yard (yd)', factor: 0.9144 },
    mi: { name: 'Dặm (Mile)', factor: 1609.344 }
  };

  const massUnits = {
    mg: { name: 'Miligam (mg)', factor: 0.001 },
    g: { name: 'Gam (g)', factor: 1 },
    kg: { name: 'Kilôgam (kg)', factor: 1000 },
    ton: { name: 'Tấn', factor: 1000000 },
    oz: { name: 'Ounce (oz)', factor: 28.3495 },
    lb: { name: 'Pound (lbs)', factor: 453.592 }
  };

  const tempUnits = {
    C: { name: 'Độ C (Celsius)' },
    F: { name: 'Độ F (Fahrenheit)' },
    K: { name: 'Độ K (Kelvin)' }
  };

  const handleCategoryChange = (cat) => {
    setCategory(cat);
    if (cat === 'length') {
      setFromUnit('m');
      setToUnit('cm');
    } else if (cat === 'mass') {
      setFromUnit('kg');
      setToUnit('lb');
    } else {
      setFromUnit('C');
      setToUnit('F');
    }
  };

  const val = parseFloat(inputValue) || 0;
  let result = 0;

  if (category === 'length') {
    const inMeters = val * (lengthUnits[fromUnit]?.factor || 1);
    result = inMeters / (lengthUnits[toUnit]?.factor || 1);
  } else if (category === 'mass') {
    const inGrams = val * (massUnits[fromUnit]?.factor || 1);
    result = inGrams / (massUnits[toUnit]?.factor || 1);
  } else {
    // Nhiệt độ
    let inC = val;
    if (fromUnit === 'F') inC = (val - 32) * (5 / 9);
    if (fromUnit === 'K') inC = val - 273.15;

    if (toUnit === 'C') result = inC;
    else if (toUnit === 'F') result = inC * (9 / 5) + 32;
    else if (toUnit === 'K') result = inC + 273.15;
  }

  const swapUnits = () => {
    const temp = fromUnit;
    setFromUnit(toUnit);
    setToUnit(temp);
  };

  const currentUnitList = category === 'length' ? lengthUnits : category === 'mass' ? massUnits : tempUnits;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Category Pills */}
      <div style={{ display: 'flex', gap: '0.65rem', flexWrap: 'wrap' }}>
        {[
          { id: 'length', label: 'Chiều dài' },
          { id: 'mass', label: 'Khối lượng / Cân nặng' },
          { id: 'temp', label: 'Nhiệt độ' }
        ].map((c) => (
          <button
            key={c.id}
            type="button"
            onClick={() => handleCategoryChange(c.id)}
            className={`btn ${category === c.id ? 'btn-primary' : 'btn-secondary'} btn-sm`}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Converter Form */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '0.75rem', alignItems: 'flex-end' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Từ đơn vị
          </label>
          <input
            type="number"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            style={{ marginBottom: '0.5rem' }}
          />
          <select value={fromUnit} onChange={(e) => setFromUnit(e.target.value)}>
            {Object.entries(currentUnitList).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>

        <button
          type="button"
          onClick={swapUnits}
          className="btn btn-secondary"
          style={{ height: '42px', marginBottom: '0.5rem' }}
          title="Đảo ngược 2 đơn vị"
        >
          <ArrowLeftRight size={18} />
        </button>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Sang đơn vị
          </label>
          <div style={{ height: '42px', display: 'flex', alignItems: 'center', padding: '0 0.85rem', background: 'var(--bg-muted)', borderRadius: 'var(--radius-md)', fontWeight: 700, fontSize: '1.1rem', marginBottom: '0.5rem', overflow: 'hidden' }}>
            {Number(result.toFixed(6)).toLocaleString('vi-VN')}
          </div>
          <select value={toUnit} onChange={(e) => setToUnit(e.target.value)}>
            {Object.entries(currentUnitList).map(([k, v]) => (
              <option key={k} value={k}>{v.name}</option>
            ))}
          </select>
        </div>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Kết quả quy đổi</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {val} {fromUnit} = {Number(result.toFixed(6)).toLocaleString('vi-VN')} {toUnit}
          </div>
        </div>
        <CopyButton text={`${val} ${fromUnit} = ${Number(result.toFixed(6)).toLocaleString('vi-VN')} ${toUnit}`} label="Sao chép kết quả" />
      </div>
    </div>
  );
}
