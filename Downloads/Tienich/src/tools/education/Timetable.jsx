import { useState } from 'react';
import { Table, Printer, Plus } from 'lucide-react';

export default function Timetable() {
  const DAYS = ['Thứ 2', 'Thứ 3', 'Thứ 4', 'Thứ 5', 'Thứ 6', 'Thứ 7', 'Chủ nhật'];
  const SLOTS = ['Tiết 1 (07:00 - 07:45)', 'Tiết 2 (07:50 - 08:35)', 'Tiết 3 (08:50 - 09:35)', 'Tiết 4 (09:40 - 10:25)', 'Tiết 5 (13:30 - 14:15)', 'Tiết 6 (14:20 - 15:05)'];

  const [schedule, setSchedule] = useState({
    'Thứ 2-0': 'Toán cao cấp',
    'Thứ 2-1': 'Toán cao cấp',
    'Thứ 3-2': 'Lập trình Web',
    'Thứ 3-3': 'Lập trình Web',
    'Thứ 4-0': 'Tiếng Anh B1',
    'Thứ 5-4': 'Vật lý đại cương',
    'Thứ 6-2': 'Triết học Mác'
  });

  const handleCellChange = (day, slotIndex, value) => {
    setSchedule({
      ...schedule,
      [`${day}-${slotIndex}`]: value
    });
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Nhấp chuột trực tiếp vào từng ô để điền hoặc sửa tên môn học.
        </span>
        <button type="button" onClick={handlePrint} className="btn btn-secondary btn-sm">
          <Printer size={16} /> In thời khóa biểu
        </button>
      </div>

      <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'center' }}>
          <thead>
            <tr style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '0.75rem', width: '130px', textAlign: 'left' }}>Tiết / Giờ</th>
              {DAYS.map(day => (
                <th key={day} style={{ padding: '0.75rem', fontWeight: 700 }}>{day}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {SLOTS.map((slot, sIdx) => (
              <tr key={sIdx} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '0.65rem', background: 'var(--bg-muted)', fontWeight: 600, textAlign: 'left', fontSize: '0.8rem' }}>
                  {slot}
                </td>
                {DAYS.map(day => {
                  const key = `${day}-${sIdx}`;
                  const val = schedule[key] || '';
                  return (
                    <td key={day} style={{ padding: '0.25rem', borderLeft: '1px solid var(--border-color)' }}>
                      <input
                        type="text"
                        value={val}
                        onChange={(e) => handleCellChange(day, sIdx, e.target.value)}
                        placeholder="-"
                        style={{
                          border: 'none',
                          background: val ? 'var(--primary-subtle)' : 'transparent',
                          color: val ? 'var(--primary)' : 'inherit',
                          fontWeight: val ? 600 : 400,
                          textAlign: 'center',
                          padding: '0.4rem',
                          fontSize: '0.85rem',
                          borderRadius: '4px'
                        }}
                      />
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
