import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { NumberInput } from '../../components/common/NumberInput';
import { RotateCcw } from 'lucide-react';

export default function TinhLaiKep() {
  const [initialAmount, setInitialAmount] = useState(50000000); // 50 triệu
  const [monthlyDeposit, setMonthlyDeposit] = useState(2000000); // Gửi thêm 2 triệu/tháng
  const [interestRate, setInterestRate] = useState('8'); // 8%/năm
  const [years, setYears] = useState('10'); // 10 năm

  const P = typeof initialAmount === 'number' ? initialAmount : parseFloat(initialAmount) || 0;
  const PMT = typeof monthlyDeposit === 'number' ? monthlyDeposit : parseFloat(monthlyDeposit) || 0;
  const r = (parseFloat(interestRate) || 0) / 100 / 12; // lãi suất tháng
  const n = (parseFloat(years) || 0) * 12; // tổng số tháng

  // Tính số dư cuối cùng với đóng góp định kỳ
  // FV = P * (1+r)^n + PMT * [((1+r)^n - 1) / r]
  let totalBalance = 0;
  if (r > 0) {
    totalBalance = P * Math.pow(1 + r, n) + PMT * ((Math.pow(1 + r, n) - 1) / r);
  } else {
    totalBalance = P + PMT * n;
  }

  const totalPrincipal = P + PMT * n;
  const totalInterest = totalBalance - totalPrincipal;

  // Tạo dữ liệu từng năm
  const yearlyData = [];
  const totalYears = Math.min(30, Math.max(1, parseInt(years) || 1));
  let runningBalance = P;
  for (let y = 1; y <= totalYears; y++) {
    for (let m = 0; m < 12; m++) {
      runningBalance = runningBalance * (1 + r) + PMT;
    }
    const investedSoFar = P + PMT * (y * 12);
    yearlyData.push({
      year: y,
      invested: investedSoFar,
      interest: runningBalance - investedSoFar,
      total: runningBalance
    });
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
        <div>
          <NumberInput
            label="Số tiền gốc ban đầu (VNĐ)"
            value={initialAmount}
            onChange={(num) => setInitialAmount(num)}
            placeholder="Ví dụ: 50.000.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <NumberInput
            label="Gửi thêm mỗi tháng (VNĐ)"
            value={monthlyDeposit}
            onChange={(num) => setMonthlyDeposit(num)}
            placeholder="Ví dụ: 2.000.000"
            suffix="VNĐ"
            showWords={true}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Lãi suất hàng năm (% / năm)
          </label>
          <input
            type="number"
            step="0.1"
            value={interestRate}
            onChange={(e) => setInterestRate(e.target.value)}
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.4rem', color: 'var(--text-secondary)' }}>
            Thời gian đầu tư (Năm)
          </label>
          <input
            type="number"
            min="1"
            max="40"
            value={years}
            onChange={(e) => setYears(e.target.value)}
          />
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
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tổng số tiền gốc đã nộp</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {Math.round(totalPrincipal).toLocaleString('vi-VN')} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>Tiền lãi tích lũy</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.25rem' }}>
            +{Math.round(totalInterest).toLocaleString('vi-VN')} đ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>Tổng tiền nhận được</div>
          <div style={{ fontSize: '1.85rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {Math.round(totalBalance).toLocaleString('vi-VN')} đ
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem' }}>
        <CopyButton text={`${Math.round(totalBalance).toLocaleString('vi-VN')} VNĐ`} label="Sao chép tổng số tiền" />
      </div>

      {/* Table Breakdown */}
      <div>
        <h4 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Bảng chi tiết tăng trưởng theo từng năm
        </h4>
        <div style={{ overflowX: 'auto', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)' }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.88rem', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: 'var(--bg-muted)', borderBottom: '1px solid var(--border-color)' }}>
                <th style={{ padding: '0.65rem 1rem' }}>Năm</th>
                <th style={{ padding: '0.65rem 1rem' }}>Tiền gốc tích lũy</th>
                <th style={{ padding: '0.65rem 1rem' }}>Tiền lãi sinh ra</th>
                <th style={{ padding: '0.65rem 1rem' }}>Tổng số dư cuối năm</th>
              </tr>
            </thead>
            <tbody>
              {yearlyData.map((row) => (
                <tr key={row.year} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 600 }}>Năm {row.year}</td>
                  <td style={{ padding: '0.6rem 1rem' }}>{Math.round(row.invested).toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '0.6rem 1rem', color: 'var(--success)', fontWeight: 600 }}>+{Math.round(row.interest).toLocaleString('vi-VN')} đ</td>
                  <td style={{ padding: '0.6rem 1rem', fontWeight: 700, color: 'var(--primary)' }}>{Math.round(row.total).toLocaleString('vi-VN')} đ</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
