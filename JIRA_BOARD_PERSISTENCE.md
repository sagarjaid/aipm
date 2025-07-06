<!-- @format -->

# Jira Board Selection Persistence

This document describes the implementation of board selection persistence in the
Jira integration.

## Overview

The Jira integration now remembers the last selected board for each Jira
configuration, allowing users to return to their preferred board automatically
when switching between different Jira accounts or returning to the application.

## Features

### 1. Per-Configuration Board Memory

- Each Jira configuration (domain + email combination) has its own remembered
  board
- Board selections are stored separately for different configurations
- When switching between configurations, the last selected board for that
  configuration is automatically restored

### 2. Automatic Board Selection

- When boards are loaded for a configuration, if a previously selected board
  exists, it is automatically selected
- The board's data (issues, sprint information) is automatically fetched
- Users don't need to manually select their board each time

### 3. Persistent Storage

- Board selections are stored in localStorage using the key pattern:
  `jiraLastBoard_{configId}`
- Selections persist across browser sessions
- Cleanup occurs when configurations are deleted

## Implementation Details

### Storage Keys

- Board selections: `jiraLastBoard_{configId}`
- Configurations: `jiraSavedConfigs`
- Current configuration: `jiraConfig`

### Utility Functions

Located in `lib/jira-utils.ts`:

```typescript
// Save the last selected board for a configuration
saveLastSelectedBoard(configId: string, boardId: string)

// Retrieve the last selected board for a configuration
getLastSelectedBoard(configId: string): string | null

// Clear the last selected board for a configuration
clearLastSelectedBoard(configId: string)
```

### State Management

The main component (`app/jira/page.tsx`) manages:

- `selectedBoard`: Currently selected board
- `lastSelectedBoardId`: ID of the last selected board for the current
  configuration
- `selectedConfigId`: ID of the current configuration

### Lifecycle Events

1. **Configuration Load**: When a saved configuration is loaded, the last
   selected board is retrieved
2. **Board Selection**: When a user selects a board, it's saved to localStorage
3. **Configuration Switch**: When switching configurations, the appropriate
   board is loaded
4. **Configuration Deletion**: When a configuration is deleted, its board
   selection is cleaned up

## User Experience

### For New Users

- No board is pre-selected
- User must manually select a board after configuration
- Selection is remembered for future sessions

### For Returning Users

- Last selected board is automatically loaded
- User can immediately see their issues without additional clicks
- Can still change board selection if needed

### For Multi-Account Users

- Each Jira account remembers its own board selection
- Switching between accounts automatically loads the appropriate board
- No interference between different configurations

## Technical Notes

- Board selections are tied to configuration IDs, not user accounts
- If a board no longer exists, the selection is ignored gracefully
- localStorage is used for persistence (no server-side storage)
- Error handling is implemented for localStorage operations
- Cleanup prevents localStorage bloat when configurations are deleted
- Config ID is passed explicitly to `fetchBoards` to avoid React state timing
  issues
- Board selection is restored immediately when boards are loaded, ensuring
  persistence across page reloads and new tabs

## Future Enhancements

Potential improvements could include:

- Server-side storage for cross-device synchronization
- Board selection preferences (favorite boards)
- Board selection history
- Automatic board selection based on user activity patterns
