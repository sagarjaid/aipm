"use client"

import React, { useState, useRef } from 'react';
import { tickets } from '@/libs/helper';


const priorityColor = (priority: string) => {
  if (priority === 'Highest') return '#ef4444';
  return '#f59e42';
};

const statusColor = (status: string) => {
  if (status === 'OPEN') return '#e5e7eb';
  return '#d1fae5';
};

const getUniqueAssignees = () => {
  const names = tickets.map(t => t.assignee?.name).filter(Boolean);
  return Array.from(new Set(names));
};

const typeOptions = [
  { value: 'Epic', label: 'Epic', icon: '⚡', color: '#a78bfa' },
  { value: 'Bug', label: 'Bug', icon: '🐞', color: '#f87171' },
  { value: 'Story', label: 'Story', icon: '🔖', color: '#4ade80' },
  { value: 'Task', label: 'Task', icon: '☑️', color: '#60a5fa' },
  { value: 'Subtask', label: 'Subtask', icon: '📝', color: '#fbbf24' },
];

export default function JiraListPage() {
  const [selectedTab, setSelectedTab] = useState<'active' | 'work'>('active');
  const [search, setSearch] = useState('');
  const [assignee, setAssignee] = useState('');
  const [types, setTypes] = useState<string[]>([]);
  const [status, setStatus] = useState('');
  const [selectedTicket, setSelectedTicket] = useState(tickets[0]);
  const firstTicket = tickets[0];
  const [typeDropdownOpen, setTypeDropdownOpen] = useState(false);
  const typeDropdownRef = useRef<HTMLDivElement>(null);
  const [newComment, setNewComment] = useState('');
  const [editingField, setEditingField] = useState<string | null>(null);
  const [editValue, setEditValue] = useState<any>(null);

  // Close dropdown on outside click
  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (typeDropdownRef.current && !typeDropdownRef.current.contains(event.target as Node)) {
        setTypeDropdownOpen(false);
      }
    }
    if (typeDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [typeDropdownOpen]);

  // Filtering logic
  const filteredTickets = tickets.filter(t => {
    // Search filter (summary, key, assignee)
    const searchText = search.toLowerCase();
    const matchesSearch =
      t.summary?.toLowerCase().includes(searchText) ||
      t.key?.toLowerCase().includes(searchText) ||
      t.assignee?.name?.toLowerCase().includes(searchText);
    // Assignee filter
    const matchesAssignee = !assignee || t.assignee?.name === assignee;
    // Type filter (multi-select)
    const matchesType = types.length === 0 || types.includes(t.type || 'Task');
    // Status filter (default to 'OPEN' if not present)
    const ticketStatus = t.status || 'OPEN';
    const matchesStatus = !status || ticketStatus === status;
    return matchesSearch && matchesAssignee && matchesType && matchesStatus;
  });

  function handleAddComment() {
    if (!newComment.trim()) return;
    // Find and update the ticket in the tickets array
    const idx = tickets.findIndex(t => t.key === selectedTicket.key);
    if (idx !== -1) {
      const t = tickets[idx];
      const updatedTicket = {
        ...t,
        assignee: {
          ...t.assignee,
          color: t.assignee.color || '#e5e7eb',
        },
        reporter: t.reporter
          ? { ...t.reporter, color: t.reporter.color || '#e5e7eb' }
          : undefined,
        comments: [...(t.comments || []), { author: 'Sagar Jaid', text: newComment }],
        description: t.description || '',
        labels: t.labels || [],
        sprint: t.sprint || '',
        fixVersion: t.fixVersion || '',
        created: t.created || '',
        updated: t.updated || '',
        priority: t.priority,
        status: t.status,
        summary: t.summary,
        type: t.type,
        key: t.key,
      };
      tickets[idx] = updatedTicket;
      setSelectedTicket(updatedTicket);
    }
    setNewComment('');
  }

  function renderCommentMarkdown(text: string) {
    // Simple markdown: bold (**text**), inline code ('text'), mentions (@Name), line breaks
    let html = text
      .replace(/\*\*(.*?)\*\*/g, '<b>$1</b>')
      .replace(/'([^']+)'/g, '<code>$1</code>')
      .replace(/(@[\w\s]+)/g, '<span style="color:#2563eb">$1</span>')
      .replace(/\n/g, '<br/>');
    return <span dangerouslySetInnerHTML={{ __html: html }} />;
  }

  function getAvatar(author: string) {
    if (author === 'Sagar Jaid') return 'SJ';
    if (author === 'Dharmesh Dakhra') return 'DD';
    return author.split(' ').map((n: string) => n[0]).join('').toUpperCase();
  }

  function getCommentTime(author: string, idx: number) {
    if (author === 'Sagar Jaid' && idx === 0) return 'yesterday';
    return 'last month';
  }

  function renderSidebarField(label: string, value: any, field: string, type: string = 'text', options?: string[]) {
    const isEditing = editingField === field;
    return (
      <div className="mb-4">
        <span className="font-semibold text-gray-700 text-sm">{label}:</span>{' '}
        {isEditing ? (
          <span>
            {type === 'select' ? (
              <select value={editValue} onChange={e => setEditValue(e.target.value)} className="text-sm p-2 border rounded-md mr-2">
                {options?.map(opt => <option key={opt} value={opt}>{opt}</option>)}
              </select>
            ) : type === 'date' ? (
              <input type="date" value={editValue} onChange={e => setEditValue(e.target.value)} className="text-sm p-2 border rounded-md mr-2" />
            ) : field === 'assignee' || field === 'reporter' ? (
              <input type="text" value={editValue?.name || ''} onChange={e => setEditValue({ ...editValue, name: e.target.value })} className="text-sm p-2 border rounded-md mr-2" />
            ) : (
              <input type="text" value={editValue} onChange={e => setEditValue(e.target.value)} className="text-sm p-2 border rounded-md mr-2" />
            )}
            <button onClick={() => handleSidebarSave(field)} className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2">Save</button>
            <button onClick={() => setEditingField(null)} className="bg-gray-200 text-gray-500 px-4 py-2 rounded-md">Cancel</button>
          </span>
        ) : (
          <span className="text-gray-500 text-sm ml-2 cursor-pointer inline-flex items-center">
            {field === 'assignee' || field === 'reporter' ? (
              <span className="flex items-center gap-2">
                <span className="bg-gray-200 text-white px-2 py-1 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                  {value?.avatar || (value?.name ? value.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '')}
                </span>
                <span>{value?.name || ''}</span>
              </span>
            ) : (
              <span>{value || <span className="text-gray-400">None</span>}</span>
            )}
            <span className="text-gray-400 text-sm ml-2">✏️</span>
          </span>
        )}
      </div>
    );
  }

  function handleSidebarSave(field: string) {
    setSelectedTicket(prev => {
      let updated = { ...prev };
      if (field === 'assignee' || field === 'reporter') {
        updated[field] = { ...editValue, color: editValue.color || '#e5e7eb', avatar: editValue.avatar || (editValue.name ? editValue.name.split(' ').map((n: string) => n[0]).join('').toUpperCase() : '') };
      } else if (field === 'labels') {
        updated[field] = editValue.split(',').map((l: string) => l.trim());
      } else if (field in updated) {
        (updated as any)[field] = editValue;
      }
      return updated;
    });
    setEditingField(null);
  }

  return (
    <div className="p-8">
      {/* Ticket Header Section */}
  
      {/* Tabs */}
      <div className="flex items-center gap-4 border-b border-gray-200 mb-8">
        <button
          onClick={() => setSelectedTab('active')}
          className={`bg-none border-none outline-none flex items-center gap-2 ${selectedTab === 'active' ? 'text-blue-500 font-semibold' : 'text-gray-500 font-medium'}`}
        >
          <span className="text-xl">▦</span>
          Active Sprint
        </button>
        <button
          onClick={() => setSelectedTab('work')}
          className={`bg-none border-none outline-none flex items-center gap-2 ${selectedTab === 'work' ? 'text-blue-500 font-semibold' : 'text-gray-500 font-medium'}`}
        >
          <span className="text-xl">☑️</span>
          Work Item
        </button>
      </div>
      {/* Tab Content */}
      {selectedTab === 'active' && (
        <>
          {/* Quick Filter Bar */}
          <div className="flex items-center gap-4 mb-4">
            <input
              type="text"
              placeholder="Search work"
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="border rounded-md p-2 text-sm outline-none min-w-[120px]"
            />
            {/* Sprint Name Pill */}
            <span className="bg-blue-50 text-blue-500 font-semibold text-sm px-4 py-2 rounded-md border">
              Sprint Name 1
            </span>
            <div className="flex flex-col gap-2">
              {/* <span style={{ fontSize: 12, color: '#6b7280', marginLeft: 2 }}>Assignee</span> */}
              <select
                value={assignee}
                onChange={e => setAssignee(e.target.value)}
                className="border rounded-md p-2 text-sm outline-none min-w-[100px]"
              >
                <option value=""> Assignee (All)</option>
                {getUniqueAssignees().map(name => (
                  <option key={name} value={name}>{name}</option>
                ))}
              </select>
            </div>
            {/* Custom Type Dropdown */}
            <div className="relative min-w-[140px]" ref={typeDropdownRef}>
              <button
                type="button"
                onClick={() => setTypeDropdownOpen((open) => !open)}
                className="border rounded-md p-2 text-sm outline-none min-w-[100px] bg-white flex items-center gap-4 cursor-pointer"
              >
                {types.length === 0 ? 'Type' : types.join(', ')}
                <span className="text-sm ml-2">▼</span>
              </button>
              {typeDropdownOpen && (
                <div
                  className="absolute top-full left-0 z-10 bg-white border border-gray-200 rounded-lg shadow-lg min-w-[180px] p-4"
                >
                  <div className="font-semibold text-gray-700 mb-4">
                    Standard work types
                  </div>
                  {typeOptions.map(opt => (
                    <label
                      key={opt.value}
                      className="flex items-center gap-4 py-2 px-4 rounded cursor-pointer bg-gray-50 font-medium text-gray-900"
                    >
                      <input
                        type="checkbox"
                        checked={types.includes(opt.value)}
                        onChange={e => {
                          if (e.target.checked) {
                            setTypes([...types, opt.value]);
                          } else {
                            setTypes(types.filter(t => t !== opt.value));
                          }
                        }}
                        className="mr-2"
                      />
                      <span className="text-sm text-gray-900">{opt.icon}</span>
                      <span>{opt.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </div>
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="border rounded-md p-2 text-sm outline-none min-w-[100px]"
            >
              <option value="">Status</option>
              <option value="OPEN">OPEN</option>
              <option value="In-Progress">In-Progress</option>
              <option value="Done">Done</option>
            </select>
          </div>
          {/* Ticket Table */}
          <div className="overflow-x-auto bg-white rounded-lg shadow">
            <table className="w-full border-collapse min-w-[900px]">
              <thead>
                <tr className="bg-gray-50 text-left">
                  <th className="px-4 py-3">Key</th>
                  <th className="px-4 py-3">Type</th>
                  <th className="px-4 py-3">Assignee</th>
                  <th className="px-4 py-3">Priority</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3">Summary</th>
                </tr>
              </thead>
              <tbody>
                {filteredTickets.map((t, i) => (
                  <tr key={t.key} className="border-b border-gray-200">
                    <td
                      className="px-4 py-3 text-blue-500 font-semibold cursor-pointer"
                      onClick={() => {
                        setSelectedTicket(t);
                        setSelectedTab('work');
                      }}
                    >
                      {t.key}
                    </td>
                    <td className="px-4 py-3 text-sm">{t.type || 'Task'}</td>
                    <td className="px-4 py-3">
                      {t.assignee.avatar && t.assignee.avatar.length === 2 ? (
                        <span className="flex items-center gap-2">
                          <span className="bg-gray-200 text-white px-2 py-1 rounded-full w-8 h-8 flex items-center justify-center font-semibold text-sm">
                            {t.assignee.avatar}
                          </span>
                          <span>{t.assignee.name}</span>
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          <span className="text-xl">{t.assignee.avatar}</span>
                          <span>{t.assignee.name}</span>
                        </span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      <span className="font-semibold text-sm">
                        {t.priority === 'Highest' ? <span className="text-xl">⏫</span> : <span className="text-xl">⏺️</span>}
                        {t.priority}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="bg-gray-200 text-sm font-semibold px-2 py-1 rounded">
                        {t.status || 'OPEN'}
                      </span>
                    </td>
                    <td className="px-4 py-3">{t.summary}</td>
                  </tr>
                ))}
                {filteredTickets.length === 0 && (
                  <tr>
                    <td colSpan={6} className="text-center p-8 text-gray-500">
                      No tickets found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
      {selectedTab === 'work' && selectedTicket && (
        <div className="w-full min-h-[100vh] p-0">
          <div className="flex gap-4 items-flex-start w-full max-w-[100%] p-4">
            {/* Left: Main Info */}
            <div className="flex-2 min-w-0">
                {selectedTab === 'work' && selectedTicket && (
        <div className="mb-8">
          {/* Breadcrumbs */}
          <div className="text-sm text-gray-500 mb-2">
            Project <span className="mx-2">/</span> Sprint 1 <span className="mx-2">/</span> <span className="font-semibold text-blue-500">ATRE-40</span> <span className="mx-2">/</span> <span className="font-semibold text-red-500">ATRE-41</span>
          </div>
          {/* Title Row */}
      
          <div className="font-bold text-xl mb-2"> <span className="font-normal">{selectedTicket.summary}</span></div>
          {/* Description */}
          <div className="font-semibold text-base mb-2">Description:</div>
          <div className="text-gray-700 text-sm mb-4 leading-6">{selectedTicket.description}</div>
       
        </div>
      )}
              <div className="mb-0">
                <span className="font-semibold">Comments:</span>
                <div className="mt-2 text-gray-700 text-sm">
                  <div className="mb-4 bg-gray-50 rounded-lg p-4 border border-gray-200">
                    <textarea
                      value={newComment}
                      onChange={e => setNewComment(e.target.value)}
                      placeholder="Add a comment..."
                      className="w-full min-h-12 border border-gray-200 rounded p-2"
                    />
                    <button
                      onClick={handleAddComment}
                      className="bg-blue-500 text-white px-4 py-2 rounded font-semibold cursor-pointer"
                      disabled={!newComment.trim()}
                    >
                      Add Comment
                    </button>
                  </div>
                  {selectedTicket.comments && selectedTicket.comments.map((c, idx) => (
                    <div key={idx} className="flex flex-row items-flex-start gap-4 mb-8 bg-white rounded-lg border border-gray-200 p-4">
                      <div className="w-12 h-12 rounded-full bg-yellow-500 text-white flex items-center justify-center font-semibold text-xl flex-shrink-0">
                        {getAvatar(c.author)}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-2">
                          <span className="font-semibold text-blue-500">{c.author}</span>
                          <span className="text-gray-500 text-sm font-medium">{getCommentTime(c.author, idx)}</span>
                        </div>
                        <div className="text-gray-700 text-sm mt-2 whitespace-pre-line">
                          {renderCommentMarkdown(c.text)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            {/* Right: Meta Info */}
            <div className="flex-1 min-w-[260px] max-w-[320px] bg-white rounded-lg p-8 text-gray-700 shadow">
              <div className="font-semibold text-xl mb-6">Details</div>
              {renderSidebarField('Assignee', selectedTicket.assignee, 'assignee')}
              {renderSidebarField('Reporter', selectedTicket.reporter, 'reporter')}
              {renderSidebarField('Created', selectedTicket.created, 'created', 'date')}
              {renderSidebarField('Updated', selectedTicket.updated, 'updated', 'date')}
              {renderSidebarField('Sprint', selectedTicket.sprint, 'sprint', 'select', ['ATRE Sprint 1'])}
              {renderSidebarField('Fix Version', selectedTicket.fixVersion, 'fixVersion', 'select', ['RV2.75'])}
              {renderSidebarField('Labels', selectedTicket.labels?.join(', '), 'labels', 'select', ['HOTFIX'])}
              {renderSidebarField('Priority', selectedTicket.priority, 'priority', 'select', ['Highest', 'Medium', 'Low'])}
              {renderSidebarField('Status', selectedTicket.status, 'status', 'select', ['Done', 'OPEN', 'In-Progress'])}
              {renderSidebarField('Parent', 'ATRE-40 HOTFIX', 'parent', 'select', ['ATRE-40 HOTFIX'])}
              {/* Add more fields as needed */}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
