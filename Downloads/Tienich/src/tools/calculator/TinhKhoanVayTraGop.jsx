import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { RotateCcw } from 'lucide-react';

export default function TinhKhoanVayTraGop() {
  const [loanAmount, setLoanAmount] = useState(100000000); // 100 triệu
  const [termMonths, setTermMonths] = useState('12'); // 12 tháng
  const [annualRate, setAnnualRate] = useState('10'); // 10%/năm
  const [method, setMethod] = useState('reducing'); // 'reducing' (dư nợ giảm dần) hoặc 'flat' (lãi chia đều)

  const principal = typeof loanAmount === 'number' ? loanAmount : parseFloat(loanAmount) || 0;
  const months = Math.max(1, parseInt(termMonths) || 1);
  const monthlyRate = (parseFloat(annualRate) || 0) / 100 / 12;

  const schedule = [];
  let totalInterest = 0;
  let remainingPrincipal = principal;
  const monthlyPrincipal = principal / months;

  if (method === 'reducing') {
    for (let m = 1; m <= months; m++) {
      const interest = remainingPrincipal * monthlyRate;
      totalInterest += interest;
      const totalPayment = monthlyPrincipal + interest;
      remainingPrincipal -= monthlyPrincipal;

      schedule.push({
        month: m,
        principal: monthlyPrincipal,
        interest,
        total: totalPayment,
        remaining: Math.max(0, remainingPrincipal)
      });
    }
  } else {
    // Flat (lãi tính trên gốc chia đều)
    const totalFlatInterest = principal * ((parseFloat(annualRate) || 0) / 100) * (months / 12);
    totalInterest = totalFlatInterest;
    const monthlyFlatInterest = totalFlatInterest / months;

    for (let m = 1; m <= months; m++) {
      remainingPrincipal -= monthlyPrincipal;
      schedule.push({
        month: m,
        principal: monthlyPrincipal,
        interest: monthlyFlatInterest,
        total: monthlyPrincipal + monthlyFlatInterest,
        remaining: Math.max(0, remainingPrincipal)
      });
    }
  }

  const totalPaymentAll = principal + totalInterest;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <NumberInput
            label="Số tiền vay (VNĐ)"
            value={loanAmount}
            onChange={(num) => setLoanAmount(num)}
            placeholder="Ví dụ: 100.000.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Thời hạn vay (Số tháng)
          </label>
          <input
            type="number"
            min="1"
            max="360"
            value={termMonths}
            onChange={(e) => setTermMonths(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Lãi suất (% / năm)
          </label>
          <input
            type="number"
            step="0.1"
            value={annualRate}
            onChange={(e) => setAnnualRate(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Cách tính lãi
          </label>
          <select value={method} onChange={(e) => setMethod(e.target.value)}>
            <option value="reducing">Theo dư nợ giảm dần</option>
            <option value="flat">Lãi chia đều (Dư nợ gốc)</option>
          </select>
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
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tháng đầu tiên cần trả</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {schedule.length > 0 ? Math.round(schedule[0].total).toLocaleString('vi-VN') : 0} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--warning)', fontWeight: 600 }}>Tổng tiền lãi phải trả</div>
          <div style={{ fontSize: '1.65rem', fontWeight: 700, color: 'var(--warning)', marginTop: '0.25rem' }}>
            {Math.round(totalInterest).toLocaleString('vi-VN')} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', fontWeight: 600 }}>Tổng gốc + lãi cả kỳ</div>
          <div style={{ fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {Math.round(totalPaymentAll).toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`${Math.round(totalPaymentAll).toLocaleString('vi-VN')} VNĐ`} label="Sao chép tổng số tiền phải trả" />
      </div>

      {/* Schedule Table */}
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Lịch trả góp chi tiết qua các tháng
        </h4>
        <div style={{ maxHeight: '350px', overflowY: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', textAlign: 'left' }}>
            <thead style={{ position: 'sticky', top: 0, background: 'var(--bg-muted)' }}>
              <tr style={{ borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.6rem 0.8rem' }}>Kỳ</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Tiền gốc</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Tiền lãi</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Tổng trả</th>
                <th style={{ padding: '0.6rem 0.8rem' }}>Dư nợ còn lại</th>
              </tr>
            </thead>
            <tbody>
              {schedule.map((row) => (
                <tr key={row.month} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.5rem 0.8rem', fontWeight: 600 }}>Tháng {row.month}</td>
                  <td style={{ padding: '0.5rem 0.8rem' }}>{Math.round(row.principal).toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '0.5rem 0.8rem', color: 'var(--warning)' }}>{Math.round(row.interest).toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '0.5rem 0.8rem', fontWeight: 700, color: 'var(--primary)' }}>{Math.round(row.total).toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '0.5rem 0.8rem' }}>{Math.round(row.remaining).toLocaleString('vi-VN')} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
