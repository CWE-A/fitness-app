import { useState } from 'react';
import { Plus, Trash2, CheckCircle2, Circle } from 'lucide-react';

export default function Checklist() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Xem tài liệu và lập kế hoạch công việc', completed: true },
    { id: 2, text: 'Hoàn thành báo cáo tuần gửi quản lý', completed: false },
    { id: 3, text: 'Tập thể dục 30 phút buổi chiều', completed: false }
  ]);
  const [newTaskText, setNewTaskText] = useState('');

  const addTask = (e) => {
    e.preventDefault();
    if (!newTaskText.trim()) return;
    setTasks([...tasks, { id: Date.now(), text: newTaskText.trim(), completed: false }]);
    setNewTaskText('');
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => (t.id === id ? { ...t, completed: !t.completed } : t)));
  };

  const removeTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const completedCount = tasks.filter(t => t.completed).length;
  const progressPercent = tasks.length > 0 ? Math.round((completedCount / tasks.length) * 100) : 0;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      {/* Progress Bar */}
      <div className="card" style={{ padding: '1.25rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
          <span style={{ fontSize: '0.88rem', fontWeight: 600 }}>Tiến độ công việc hoàn thành</span>
          <span style={{ fontSize: '0.95rem', fontWeight: 800, color: 'var(--primary)' }}>
            {completedCount} / {tasks.length} việc ({progressPercent}%)
          </span>
        </div>
        <div style={{ width: '100%', height: '8px', background: 'var(--bg-muted)', borderRadius: '4px', overflow: 'hidden' }}>
          <div
            style={{
              width: `${progressPercent}%`,
              height: '100%',
              backgroundColor: progressPercent === 100 ? 'var(--success)' : 'var(--primary)',
              transition: 'width 0.3s ease'
            }}
          />
        </div>
      </div>

      {/* Add Task Form */}
      <form onSubmit={addTask} style={{ display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={newTaskText}
          onChange={(e) => setNewTaskText(e.target.value)}
          placeholder="Thêm đầu việc mới cần làm..."
          style={{ flex: 1 }}
        />
        <button type="submit" className="btn btn-primary" style={{ whiteSpace: 'nowrap' }}>
          <Plus size={18} /> Thêm việc
        </button>
      </form>

      {/* Task List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {tasks.map(task => (
          <div
            key={task.id}
            onClick={() => toggleTask(task.id)}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0.75rem 1rem',
              background: task.completed ? 'var(--bg-muted)' : 'var(--bg-surface)',
              border: '1px solid var(--border-color)',
              borderRadius: 'var(--radius-md)',
              cursor: 'pointer',
              transition: 'all 0.15s ease'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              {task.completed ? (
                <CheckCircle2 size={20} color="var(--success)" />
              ) : (
                <Circle size={20} color="var(--border-hover)" />
              )}
              <span
                style={{
                  fontSize: '0.95rem',
                  textDecoration: task.completed ? 'line-through' : 'none',
                  color: task.completed ? 'var(--text-muted)' : 'var(--text-primary)',
                  fontWeight: task.completed ? 400 : 500
                }}
              >
                {task.text}
              </span>
            </div>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); removeTask(task.id); }}
              className="btn btn-secondary btn-sm"
              style={{ padding: '0.35rem 0.5rem', color: 'var(--danger)' }}
              title="Xóa công việc này"
            >
              <Trash2 size={16} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
