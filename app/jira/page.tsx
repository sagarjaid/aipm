/** @format */

'use client';

import type React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MessageSquare, Settings, List, Grid3X3 } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

// Components
import { ConfigForm } from '@/components/jira/config-form';
import { BoardFilters } from '@/components/jira/board-filters';
import { IssueListView } from '@/components/jira/issue-list-view';
import { IssueGridView } from '@/components/jira/issue-grid-view';
import { IssueDetailView } from '@/components/jira/issue-detail-view';

// Types and utilities
import type {
  JiraBoard,
  JiraConfig,
  SavedConfig,
  JiraIssue,
  ViewMode,
  Filters,
  BoardData,
  JiraSprint,
  JiraUser,
  Transition,
  JiraComment,
} from '@/lib/jira-types';
import {
  getBoardTypeColor,
  extractTextFromDescription,
  generateId,
  saveLastSelectedBoard,
  getLastSelectedBoard,
  clearLastSelectedBoard,
} from '@/lib/jira-utils';

import AIPageContent from '../ai/AIPageContent';

export default function UnifiedJiraBoard() {
  // Configuration states
  const [boards, setBoards] = useState<JiraBoard[]>([]);
  const [config, setConfig] = useState<JiraConfig>({
    id: '',
    domain: '',
    email: '',
    apiToken: '',
    lastUsed: '',
    createdAt: '',
  });
  const [showConfig, setShowConfig] = useState(true);
  const [savedConfigs, setSavedConfigs] = useState<SavedConfig[]>([]);
  const [showAddNew, setShowAddNew] = useState(false);
  const [selectedConfigId, setSelectedConfigId] = useState<string | null>(null);

  // Board and Sprint states
  const [selectedBoard, setSelectedBoard] = useState<BoardData | null>(null);
  const [lastSelectedBoardId, setLastSelectedBoardId] = useState<string | null>(
    null
  );
  const [sprint, setSprint] = useState<JiraSprint | null>(null);
  const [issues, setIssues] = useState<JiraIssue[]>([]);
  const [filteredIssues, setFilteredIssues] = useState<JiraIssue[]>([]);
  const [viewMode, setViewMode] = useState<ViewMode>('list');

  // Issue detail states
  const [selectedIssue, setSelectedIssue] = useState<JiraIssue | null>(null);
  const [comments, setComments] = useState<JiraComment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [editMode, setEditMode] = useState<string | null>(null);
  const [editSummary, setEditSummary] = useState('');
  const [editDescription, setEditDescription] = useState('');

  // Loading and error states
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updating, setUpdating] = useState<string | null>(null);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [addingComment, setAddingComment] = useState(false);

  // Filter states
  const [filters, setFilters] = useState<Filters>({
    assignees: [],
    types: [],
    statuses: [],
    labels: [],
    fixVersions: [],
  });

  // Data for filters and operations
  const [users, setUsers] = useState<JiraUser[]>([]);
  const [transitions, setTransitions] = useState<Transition[]>([]);
  const [priorities, setPriorities] = useState<any[]>([]);

  // Tab state
  const [activeTab, setActiveTab] = useState('sprint-list');

  useEffect(() => {
    loadSavedConfigs();
  }, []);

  // Load last selected board when configuration is available but no board is selected
  useEffect(() => {
    if (
      !showConfig &&
      selectedConfigId &&
      !selectedBoard &&
      boards.length > 0
    ) {
      const lastBoardId = getLastSelectedBoard(selectedConfigId);
      if (lastBoardId) {
        const lastBoard = boards.find(
          (board: JiraBoard) => board.id.toString() === lastBoardId
        );
        if (lastBoard) {
          setSelectedBoard({
            id: lastBoard.id.toString(),
            name: lastBoard.name,
            type: lastBoard.type,
          });
          setLastSelectedBoardId(lastBoardId);
          // We'll fetch board data in the next useEffect when selectedBoard changes
        }
      }
    }
  }, [showConfig, selectedConfigId, selectedBoard, boards]);

  useEffect(() => {
    if (!showConfig && config.domain && config.email && config.apiToken) {
      saveCurrentConfig();
    }
  }, [showConfig, config]);

  useEffect(() => {
    if (issues.length > 0) {
      fetchUsers();
      fetchPriorities();
      fetchTransitionsForIssues();
    }
  }, [issues]);

  // Fetch board data when selectedBoard changes
  useEffect(() => {
    if (selectedBoard && !sprint) {
      fetchBoardData(selectedBoard.id);
    }
  }, [selectedBoard]);

  useEffect(() => {
    applyFilters();
  }, [issues, filters]);

  // Configuration functions
  const loadSavedConfigs = () => {
    try {
      const saved = localStorage.getItem('jiraSavedConfigs');
      if (saved) {
        const configs: SavedConfig[] = JSON.parse(saved);
        setSavedConfigs(configs);

        const currentConfig = localStorage.getItem('jiraConfig');
        if (currentConfig) {
          const current = JSON.parse(currentConfig);
          const activeConfig = configs.find(
            (c) => c.domain === current.domain && c.email === current.email
          );
          if (activeConfig) {
            setSelectedConfigId(activeConfig.id);
            setConfig(current);
            setShowConfig(false);

            // Load last selected board for this configuration
            const lastBoardId = getLastSelectedBoard(activeConfig.id);
            if (lastBoardId) {
              setLastSelectedBoardId(lastBoardId);
            }

            // Fetch boards after setting the config ID, passing the config ID explicitly
            fetchBoards(current, activeConfig.id);
          }
        }

        if (configs.length > 0 && !currentConfig) {
          setShowConfig(true);
        }
      }
    } catch (error) {
      console.error('Failed to load saved configs:', error);
    }
  };

  const saveCurrentConfig = () => {
    try {
      const configToSave: JiraConfig = {
        ...config,
        id: config.id || generateId(),
        lastUsed: new Date().toISOString(),
        createdAt: config.createdAt || new Date().toISOString(),
      };

      localStorage.setItem('jiraConfig', JSON.stringify(configToSave));

      const existingConfigs = savedConfigs.filter(
        (c) => c.id !== configToSave.id
      );
      const updatedConfigs = [configToSave, ...existingConfigs].slice(0, 10);

      setSavedConfigs(updatedConfigs);
      localStorage.setItem('jiraSavedConfigs', JSON.stringify(updatedConfigs));
      setSelectedConfigId(configToSave.id);

      // Clear any previous board selection for new configurations
      if (!config.id) {
        setLastSelectedBoardId(null);
        setSelectedBoard(null);
      }
    } catch (error) {
      console.error('Failed to save config:', error);
    }
  };

  const selectSavedConfig = (savedConfig: SavedConfig) => {
    const updatedConfig = {
      ...savedConfig,
      lastUsed: new Date().toISOString(),
    };

    setConfig(updatedConfig);
    setSelectedConfigId(savedConfig.id);
    localStorage.setItem('jiraConfig', JSON.stringify(updatedConfig));

    const updatedConfigs = savedConfigs.map((c) =>
      c.id === savedConfig.id ? updatedConfig : c
    );
    setSavedConfigs(updatedConfigs);
    localStorage.setItem('jiraSavedConfigs', JSON.stringify(updatedConfigs));

    // Load last selected board for this configuration
    const lastBoardId = getLastSelectedBoard(savedConfig.id);
    if (lastBoardId) {
      setLastSelectedBoardId(lastBoardId);
    } else {
      setLastSelectedBoardId(null);
    }

    setShowConfig(false);
    fetchBoards(updatedConfig, savedConfig.id);
  };

  const deleteSavedConfig = (configId: string) => {
    const updatedConfigs = savedConfigs.filter((c) => c.id !== configId);
    setSavedConfigs(updatedConfigs);
    localStorage.setItem('jiraSavedConfigs', JSON.stringify(updatedConfigs));

    // Clean up board selection for deleted configuration
    clearLastSelectedBoard(configId);

    if (selectedConfigId === configId) {
      setSelectedConfigId(null);
      setLastSelectedBoardId(null);
      localStorage.removeItem('jiraConfig');
      setShowConfig(true);
    }
  };

  const handleAddNew = () => {
    setConfig({
      id: '',
      domain: '',
      email: '',
      apiToken: '',
      lastUsed: '',
      createdAt: '',
    });
    setSelectedConfigId(null);
    setLastSelectedBoardId(null);
    setShowAddNew(true);
  };

  // Board and Sprint functions
  const fetchBoards = async (configToUse?: JiraConfig, configId?: string) => {
    const activeConfig = configToUse || config;

    if (!activeConfig.domain || !activeConfig.email || !activeConfig.apiToken) {
      setError('Please provide all required configuration fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jira/boards', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(activeConfig),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || `HTTP error! status: ${response.status}`);
      }

      setBoards(data.values || []);
      setShowConfig(false);

      // Auto-select last selected board if available
      if (data.values && data.values.length > 0) {
        // Use the provided configId or fall back to selectedConfigId
        const currentConfigId = configId || selectedConfigId || config.id;
        if (currentConfigId) {
          const lastBoardId = getLastSelectedBoard(currentConfigId);
          if (lastBoardId) {
            const lastBoard = data.values.find(
              (board: JiraBoard) => board.id.toString() === lastBoardId
            );
            if (lastBoard) {
              setSelectedBoard({
                id: lastBoard.id.toString(),
                name: lastBoard.name,
                type: lastBoard.type,
              });
              setLastSelectedBoardId(lastBoardId);
              fetchBoardData(lastBoard.id.toString());
            }
          }
        }
      }
    } catch (err) {
      console.error('Fetch error:', err);
      setError(
        err instanceof Error ? err.message : 'An unexpected error occurred'
      );
    } finally {
      setLoading(false);
    }
  };

  const fetchBoardData = async (boardId: string) => {
    setLoading(true);
    setError(null);

    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) {
        setError(
          'No Jira configuration found. Please configure your connection.'
        );
        return;
      }

      const config = JSON.parse(storedConfig);

      try {
        const boardResponse = await fetch('/api/jira/board', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ ...config, boardId }),
        });

        if (boardResponse.ok) {
          const boardData = await boardResponse.json();
          setSelectedBoard(boardData);
        } else {
          setSelectedBoard({
            id: boardId,
            name: `Board ${boardId}`,
            type: 'unknown',
          });
        }
      } catch (boardError) {
        setSelectedBoard({
          id: boardId,
          name: `Board ${boardId}`,
          type: 'unknown',
        });
      }

      const sprintResponse = await fetch('/api/jira/sprint', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, boardId }),
      });

      if (!sprintResponse.ok) {
        const sprintError = await sprintResponse.json();
        throw new Error(
          sprintError.error || `HTTP error! status: ${sprintResponse.status}`
        );
      }

      const sprintData = await sprintResponse.json();

      setSprint(sprintData.sprint);
      setIssues(sprintData.issues || []);
    } catch (err) {
      console.error('Fetch error:', err);
      setError(
        err instanceof Error
          ? err.message
          : 'An error occurred while fetching board data'
      );
    } finally {
      setLoading(false);
    }
  };

  const testConnection = async () => {
    if (!config.domain || !config.email || !config.apiToken) {
      setError('Please provide all required configuration fields');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/jira/test', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(config),
      });

      const data = await response.json();

      if (data.success) {
        setError(null);
        setConfig((prev) => ({
          ...prev,
          displayName: data.user,
        }));
        alert(
          `✅ Connection successful!\nConnected as: ${data.user}\nDomain: ${data.domain}`
        );
      } else {
        setError(data.error);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Connection test failed');
    } finally {
      setLoading(false);
    }
  };

  const handleConfigSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchBoards();
  };

  // Filter and utility functions
  const applyFilters = () => {
    let filtered = [...issues];

    if (filters.assignees.length > 0) {
      filtered = filtered.filter((issue) => {
        if (filters.assignees.includes('unassigned')) {
          return (
            !issue.fields.assignee ||
            filters.assignees.includes(issue.fields.assignee?.accountId || '')
          );
        }
        return (
          issue.fields.assignee &&
          filters.assignees.includes(issue.fields.assignee.accountId)
        );
      });
    }

    if (filters.types.length > 0) {
      filtered = filtered.filter((issue) =>
        filters.types.includes(issue.fields.issuetype.name)
      );
    }

    if (filters.statuses.length > 0) {
      filtered = filtered.filter((issue) =>
        filters.statuses.includes(issue.fields.status.name)
      );
    }

    if (filters.labels.length > 0) {
      filtered = filtered.filter((issue) =>
        issue.fields.labels?.some((label) => filters.labels.includes(label))
      );
    }

    if (filters.fixVersions.length > 0) {
      filtered = filtered.filter((issue) =>
        issue.fields.fixVersions?.some((version) =>
          filters.fixVersions.includes(version.id)
        )
      );
    }

    setFilteredIssues(filtered);
  };

  const fetchUsers = async () => {
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          projectKey: issues[0]?.fields.project.key,
        }),
      });

      if (response.ok) {
        const usersData = await response.json();
        setUsers(Array.isArray(usersData) ? usersData : []);
      }
    } catch (err) {
      console.error('Failed to fetch users:', err);
    }
  };

  const fetchPriorities = async () => {
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/priorities', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(config),
      });

      if (response.ok) {
        const prioritiesData = await response.json();
        setPriorities(Array.isArray(prioritiesData) ? prioritiesData : []);
      }
    } catch (err) {
      console.error('Failed to fetch priorities:', err);
    }
  };

  const fetchTransitionsForIssues = async () => {
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig || issues.length === 0) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/issue/transitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, issueKey: issues[0].key }),
      });

      if (response.ok) {
        const transitionsData = await response.json();
        setTransitions(transitionsData.transitions || []);
      }
    } catch (err) {
      console.error('Failed to fetch transitions:', err);
    }
  };

  // Issue functions
  const handleIssueClick = (issue: JiraIssue) => {
    setSelectedIssue(issue);
    setEditSummary(issue.fields.summary || '');
    setEditDescription(extractTextFromDescription(issue.fields.description));
    setActiveTab('work-item');
    fetchIssueDetails(issue.key);
  };

  const fetchIssueDetails = async (issueKey: string) => {
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/issue', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, issueKey }),
      });

      if (response.ok) {
        const issueData = await response.json();
        setSelectedIssue(issueData);
        fetchComments(issueData);
        fetchTransitions(issueKey);
      }
    } catch (err) {
      console.error('Failed to fetch issue details:', err);
    }
  };

  const fetchComments = async (issue: JiraIssue) => {
    setCommentsLoading(true);
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const params = new URLSearchParams({
        domain: config.domain,
        email: config.email,
        apiToken: config.apiToken,
        issueKey: issue.key,
      });

      const response = await fetch(`/api/jira/comments?${params}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (response.ok) {
        const commentsData = await response.json();
        setComments(commentsData.comments || []);
      } else {
        setComments([]);
      }
    } catch (err) {
      console.error('Failed to fetch comments:', err);
      setComments([]);
    } finally {
      setCommentsLoading(false);
    }
  };

  const fetchTransitions = async (issueKey: string) => {
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/issue/transitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, issueKey }),
      });

      if (response.ok) {
        const transitionsData = await response.json();
        setTransitions(transitionsData.transitions || []);
      }
    } catch (err) {
      console.error('Failed to fetch transitions:', err);
    }
  };

  const addComment = async () => {
    if (!newComment.trim() || !selectedIssue) return;

    setAddingComment(true);
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/comments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...config,
          issueKey: selectedIssue.key,
          comment: newComment,
        }),
      });

      if (response.ok) {
        setNewComment('');
        await fetchComments(selectedIssue);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to add comment');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add comment');
    } finally {
      setAddingComment(false);
    }
  };

  const updateIssueField = async (
    issueKey: string,
    fieldName: string,
    fieldValue: any
  ) => {
    setUpdating(issueKey);
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const fields: any = {};
      fields[fieldName] = fieldValue;

      const response = await fetch('/api/jira/issue/update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, issueKey, fields }),
      });

      if (response.ok) {
        setIssues((prevIssues) =>
          prevIssues.map((issue) => {
            if (issue.key === issueKey) {
              const updatedIssue = { ...issue };
              if (fieldName === 'priority') {
                updatedIssue.fields.priority = fieldValue;
              } else if (fieldName === 'assignee') {
                updatedIssue.fields.assignee = fieldValue;
              } else if (fieldName === 'summary') {
                updatedIssue.fields.summary = fieldValue;
              }
              return updatedIssue;
            }
            return issue;
          })
        );

        if (selectedIssue && selectedIssue.key === issueKey) {
          const updatedIssue = { ...selectedIssue };
          if (fieldName === 'summary') {
            updatedIssue.fields.summary = fieldValue;
          }
          setSelectedIssue(updatedIssue);
        }

        setEditMode(null);
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update field');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update field');
    } finally {
      setUpdating(null);
    }
  };

  const updateIssueStatus = async (issueKey: string, transitionId: string) => {
    setUpdating(issueKey);
    try {
      const storedConfig = localStorage.getItem('jiraConfig');
      if (!storedConfig) return;

      const config = JSON.parse(storedConfig);

      const response = await fetch('/api/jira/issue/transitions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...config, issueKey, transitionId }),
      });

      if (response.ok) {
        if (selectedBoard) {
          await fetchBoardData(selectedBoard.id);
        }
        setError(null);
      } else {
        const errorData = await response.json();
        setError(errorData.error || 'Failed to update status');
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
    } finally {
      setUpdating(null);
    }
  };

  // Filter functions
  const toggleFilter = (filterType: keyof Filters, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter((item) => item !== value)
        : [...prev[filterType], value],
    }));
  };

  const clearFilters = () => {
    setFilters({
      assignees: [],
      types: [],
      statuses: [],
      labels: [],
      fixVersions: [],
    });
  };

  const hasActiveFilters = () => {
    return Object.values(filters).some((filterArray) => filterArray.length > 0);
  };

  const handleSaveField = (fieldName: string) => {
    if (!selectedIssue) return;
    switch (fieldName) {
      case 'summary':
        updateIssueField(selectedIssue.key, 'summary', editSummary);
        break;
      case 'description':
        updateIssueField(selectedIssue.key, 'description', editDescription);
        break;
    }
  };

  const handleCancelEdit = () => {
    setEditMode(null);
    if (selectedIssue) {
      setEditSummary(selectedIssue.fields.summary || '');
      setEditDescription(
        extractTextFromDescription(selectedIssue.fields.description)
      );
    }
  };

  // Main render
  if (showConfig) {
    return (
      <ConfigForm
        config={config}
        setConfig={setConfig}
        savedConfigs={savedConfigs}
        selectedConfigId={selectedConfigId}
        showAddNew={showAddNew}
        setShowAddNew={setShowAddNew}
        loading={loading}
        error={error}
        onConfigSubmit={handleConfigSubmit}
        onSelectSavedConfig={selectSavedConfig}
        onDeleteSavedConfig={deleteSavedConfig}
        onTestConnection={testConnection}
        onAddNew={handleAddNew}
      />
    );
  }

  return (
    <div className='min-h-screen bg-gray-50 p-4'>
      <div className='max-w-7xl mx-auto'>
        {/* Header */}
        <div className='flex items-center justify-between mb-6'>
          <div className='flex items-center gap-4'>
            <h1 className='text-2xl font-bold text-gray-900'>
              {sprint?.name || selectedBoard?.name || 'Active Sprint'}
            </h1>
          </div>
          <div className='flex gap-2'>
            <AIPageContent />
            <Select
              value={selectedBoard?.id || ''}
              onValueChange={(boardId) => {
                const board = boards.find((b) => b.id.toString() === boardId);
                if (board) {
                  setSelectedBoard({
                    id: boardId,
                    name: board.name,
                    type: board.type,
                  });
                  setLastSelectedBoardId(boardId);

                  // Save the selected board to localStorage for this configuration
                  if (selectedConfigId) {
                    saveLastSelectedBoard(selectedConfigId, boardId);
                  }

                  fetchBoardData(boardId);
                }
              }}>
              <SelectTrigger className='w-64'>
                <SelectValue placeholder='Select Board'>
                  {selectedBoard?.name || 'Select Board'}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {boards.map((board) => (
                  <SelectItem
                    key={board.id}
                    value={board.id.toString()}>
                    <div className='flex items-center gap-2'>
                      <Badge
                        className={getBoardTypeColor(board.type)}
                        variant='secondary'>
                        {board.type}
                      </Badge>
                      {board.name}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button
              variant='outline'
              onClick={() => setShowConfig(true)}>
              <Settings className='mr-2 h-4 w-4' />
              Jira Config
            </Button>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <Alert
            variant='destructive'
            className='mb-6'>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* Tabs */}
        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className='w-full'>
          <TabsList className='grid w-full grid-cols-2 max-w-md'>
            <TabsTrigger value='sprint-list'>
              Active Sprint List View
            </TabsTrigger>
            <TabsTrigger value='work-item'>Individual Work Item</TabsTrigger>
          </TabsList>

          {/* Sprint List Tab */}
          <TabsContent
            value='sprint-list'
            className='space-y-6'>
            {selectedBoard && (
              <>
                {/* Filters */}
                <BoardFilters
                  filters={filters}
                  issues={issues}
                  users={users}
                  onToggleFilter={toggleFilter}
                  onClearFilters={clearFilters}
                  hasActiveFilters={hasActiveFilters()}
                  viewMode={viewMode}
                  onViewModeChange={setViewMode}
                />

                {/* Issues Display */}
                {loading ? (
                  <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
                    {[...Array(6)].map((_, i) => (
                      <div
                        key={i}
                        className='bg-white p-4 rounded-lg border'>
                        <Skeleton className='h-6 w-3/4 mb-2' />
                        <Skeleton className='h-4 w-1/2 mb-2' />
                        <Skeleton className='h-4 w-full' />
                      </div>
                    ))}
                  </div>
                ) : filteredIssues.length > 0 ? (
                  viewMode === 'list' ? (
                    <IssueListView
                      issues={filteredIssues}
                      users={users}
                      priorities={priorities}
                      transitions={transitions}
                      updating={updating}
                      onIssueClick={handleIssueClick}
                      onUpdateIssueField={updateIssueField}
                      onUpdateIssueStatus={updateIssueStatus}
                    />
                  ) : (
                    <IssueGridView
                      issues={filteredIssues}
                      transitions={transitions}
                      updating={updating}
                      onIssueClick={handleIssueClick}
                      onUpdateIssueStatus={updateIssueStatus}
                    />
                  )
                ) : (
                  <div className='text-center py-12'>
                    <Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                    <h3 className='text-lg font-medium text-gray-900 mb-2'>
                      {issues.length === 0
                        ? 'No issues found'
                        : 'No issues match the current filters'}
                    </h3>
                    <p className='text-gray-500'>
                      {issues.length === 0
                        ? 'Select a board to view issues.'
                        : 'Try adjusting your filters to see more results.'}
                    </p>
                    {issues.length > 0 && hasActiveFilters() && (
                      <Button
                        variant='outline'
                        className='mt-4 bg-transparent'
                        onClick={clearFilters}>
                        Clear All Filters
                      </Button>
                    )}
                  </div>
                )}
              </>
            )}

            {!selectedBoard && (
              <div className='text-center py-12'>
                <Calendar className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Select a Board
                </h3>
                <p className='text-gray-500'>
                  Choose a board from the dropdown to view its active sprint
                  issues.
                </p>
              </div>
            )}
          </TabsContent>

          {/* Individual Work Item Tab */}
          <TabsContent
            value='work-item'
            className='space-y-6'>
            {selectedIssue ? (
              <IssueDetailView
                selectedIssue={selectedIssue}
                users={users}
                priorities={priorities}
                transitions={transitions}
                comments={comments}
                updating={updating}
                addingComment={addingComment}
                newComment={newComment}
                setNewComment={setNewComment}
                editMode={editMode}
                setEditMode={setEditMode}
                editSummary={editSummary}
                setEditSummary={setEditSummary}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                commentsLoading={commentsLoading}
                onUpdateIssueField={updateIssueField}
                onUpdateIssueStatus={updateIssueStatus}
                onAddComment={addComment}
                onSaveField={handleSaveField}
                onCancelEdit={handleCancelEdit}
              />
            ) : (
              <div className='text-center py-12'>
                <MessageSquare className='h-12 w-12 text-gray-400 mx-auto mb-4' />
                <h3 className='text-lg font-medium text-gray-900 mb-2'>
                  Select an Issue
                </h3>
                <p className='text-gray-500'>
                  Click on an issue from the Active Sprint List to view its
                  details.
                </p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
