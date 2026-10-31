import { useState } from 'react';
import { CopyButton } from '../../components/common/CopyButton';
import { Plus, Trash2, RotateCcw } from 'lucide-react';

export default function TinhGPA() {
  const [courses, setCourses] = useState([
    { id: 1, name: 'Toán cao cấp', credits: 3, grade: '8.5' },
    { id: 2, name: 'Vật lý đại cương', credits: 3, grade: '7.0' },
    { id: 3, name: 'Lập trình căn bản', credits: 4, grade: '9.0' },
    { id: 4, name: 'Triết học Mác - Lênin', credits: 2, grade: '6.5' }
  ]);

  const addCourse = () => {
    setCourses([
      ...courses,
      { id: Date.now(), name: `Môn học ${courses.length + 1}`, credits: 3, grade: '8.0' }
    ]);
  };

  const removeCourse = (id) => {
    if (courses.length > 1) {
      setCourses(courses.filter(c => c.id !== id));
    }
  };

  const updateCourse = (id, field, value) => {
    setCourses(courses.map(c => (c.id === id ? { ...c, [field]: value } : c)));
  };

  // Quy đổi điểm 10 sang hệ 4
  const convertTo4Scale = (score10) => {
    if (score10 >= 8.5) return 4.0;
    if (score10 >= 8.0) return 3.5;
    if (score10 >= 7.0) return 3.0;
    if (score10 >= 6.5) return 2.5;
    if (score10 >= 5.5) return 2.0;
    if (score10 >= 5.0) return 1.5;
    if (score10 >= 4.0) return 1.0;
    return 0.0;
  };

  let totalCredits = 0;
  let totalScore10 = 0;
  let totalScore4 = 0;

  courses.forEach(c => {
    const cred = parseFloat(c.credits) || 0;
    const g = parseFloat(c.grade) || 0;
    totalCredits += cred;
    totalScore10 += g * cred;
    totalScore4 += convertTo4Scale(g) * cred;
  });

  const gpa10 = totalCredits > 0 ? (totalScore10 / totalCredits) : 0;
  const gpa4 = totalCredits > 0 ? (totalScore4 / totalCredits) : 0;

  let classification = 'Chưa xếp loại';
  if (gpa4 >= 3.6) classification = 'Xuất sắc';
  else if (gpa4 >= 3.2) classification = 'Giỏi';
  else if (gpa4 >= 2.5) classification = 'Khá';
  else if (gpa4 >= 2.0) classification = 'Trung bình';
  else classification = 'Yếu / Kém';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700 }}>Danh sách môn học</h4>
          <button type="button" onClick={addCourse} className="btn btn-primary btn-sm">
            <Plus size={16} /> Thêm môn học
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          {courses.map((c) => (
            <div
              key={c.id}
              style={{
                display: 'grid',
                gridTemplateColumns: 'minmax(140px, 2fr) 90px 100px 42px',
                gap: '0.5rem',
                alignItems: 'center'
              }}
            >
              <input
                type="text"
                placeholder="Tên môn học"
                value={c.name}
                onChange={(e) => updateCourse(c.id, 'name', e.target.value)}
              />
              <input
                type="number"
                min="1"
                max="10"
                placeholder="Tín chỉ"
                value={c.credits}
                onChange={(e) => updateCourse(c.id, 'credits', e.target.value)}
              />
              <input
                type="number"
                min="0"
                max="10"
                step="0.1"
                placeholder="Điểm (hệ 10)"
                value={c.grade}
                onChange={(e) => updateCourse(c.id, 'grade', e.target.value)}
              />
              <button
                type="button"
                onClick={() => removeCourse(c.id)}
                className="btn btn-secondary btn-sm"
                style={{ padding: '0.5rem', color: 'var(--danger)' }}
                title="Xóa môn này"
                disabled={courses.length <= 1}
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
          gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
          gap: '1.25rem'
        }}
      >
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Tổng số tín chỉ</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {totalCredits} tín chỉ
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--primary)', fontWeight: 600 }}>GPA Hệ 4</div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.25rem' }}>
            {gpa4.toFixed(2)} / 4.0
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>GPA Hệ 10</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--text-primary)', marginTop: '0.25rem' }}>
            {gpa10.toFixed(2)} / 10
          </div>
        </div>

        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--success)', fontWeight: 600 }}>Xếp loại học lực</div>
          <div style={{ fontSize: '1.5rem', fontWeight: 700, color: 'var(--success)', marginTop: '0.25rem' }}>
            {classification}
          </div>
        </div>
      </div>

      <div>
        <CopyButton text={`GPA Hệ 4: ${gpa4.toFixed(2)} | Hệ 10: ${gpa10.toFixed(2)} | Xếp loại: ${classification}`} label="Sao chép kết quả GPA" />
      </div>
    </div>
  );
}
