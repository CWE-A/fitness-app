import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { Users, Plus, Trash2, RotateCcw } from 'lucide-react';

export default function ChiaTienNhom() {
  const [totalBill, setTotalBill] = useState(680000);
  const [tipPercent, setTipPercent] = useState('0');
  const [members, setMembers] = useState([
    { id: 1, name: 'Bạn A' },
    { id: 2, name: 'Bạn B' },
    { id: 3, name: 'Bạn C' },
    { id: 4, name: 'Bạn D' }
  ]);

  const bill = typeof totalBill === 'number' ? totalBill : parseFloat(totalBill) || 0;
  const tip = (parseFloat(tipPercent) || 0) / 100;
  const totalAmount = bill + bill * tip;
  const memberCount = Math.max(1, members.length);
  const perPerson = totalAmount / memberCount;

  const addMember = () => {
    setMembers([...members, { id: Date.now(), name: `Thành viên ${members.length + 1}` }]);
  };

  const removeMember = (id) => {
    if (members.length > 1) {
      setMembers(members.filter(m => m.id !== id));
    }
  };

  const updateMember = (id, name) => {
    setMembers(members.map(m => (m.id === id ? { ...m, name } : m)));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <NumberInput
            label="Tổng tiền hóa đơn (VNĐ)"
            value={totalBill}
            onChange={(num) => setTotalBill(num)}
            placeholder="Ví dụ: 680.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Tiền Tip / Phí phục vụ (%)
          </label>
          <input
            type="number"
            value={tipPercent}
            onChange={(e) => setTipPercent(e.target.value)}
            placeholder="0"
          />
        </div>
      </div>

      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Users size={18} /> Danh sách người tham gia ({members.length} người)
          </h4>
          <button type="button" onClick={addMember} className="btn btn-primary btn-sm">
            <Plus size={16} /> Thêm người
          </button>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.65rem' }}>
          {members.map((m) => (
            <div key={m.id} style={{ display: 'flex', gap: '0.35rem', alignItems: 'center' }}>
              <input
                type="text"
                value={m.name}
                onChange={(e) => updateMember(m.id, e.target.value)}
                style={{ fontSize: '0.88rem', padding: '0.45rem 0.65rem' }}
              />
              <button
                type="button"
                onClick={() => removeMember(m.id)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.45rem', color: 'var(--danger)' }}
                disabled={members.length <= 1}
              >
                <Trash2 size={16} />
              </button>
            </div>
          ))}
        </div>
      </div>

      <div
        style={{
          background: 'var(--primary-subtle)',
          border: '1px solid var(--primary-border)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '1.25rem',
          alignItems: 'center'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Mỗi người cần chuyển khoản</div>
          <div style={{ fontSize: '2.25rem', fontWeight: 800, color: 'var(--primary)', lineHeight: 1.2 }}>
            {Math.round(perPerson).toLocaleString('vi-VN')} <span style={{ fontSize: '1.2rem' }}>VNĐ</span>
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            Tổng cộng: {Math.round(totalAmount).toLocaleString('vi-VN')} VNĐ cho {members.length} người
          </div>
        </div>

        <div>
          <CopyButton
            text={`Tiền ăn: ${Math.round(perPerson).toLocaleString('vi-VN')} VNĐ/người (Tổng: ${Math.round(totalAmount).toLocaleString('vi-VN')}đ / ${members.length} người)`}
            label="Sao chép tin nhắn chia tiền"
          />
        </div>
      </div>
    </div>
  );
}
