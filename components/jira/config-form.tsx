"use client"

import type React from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { RefreshCw, Settings, Clock, Plus, Check, X, Trash2 } from "lucide-react"
import type { JiraConfig, SavedConfig } from "@/lib/jira-types"
import { formatLastUsed } from "@/lib/jira-utils"

interface ConfigFormProps {
  config: JiraConfig
  setConfig: (config: JiraConfig) => void
  savedConfigs: SavedConfig[]
  selectedConfigId: string | null
  showAddNew: boolean
  setShowAddNew: (show: boolean) => void
  loading: boolean
  error: string | null
  onConfigSubmit: (e: React.FormEvent) => void
  onSelectSavedConfig: (config: SavedConfig) => void
  onDeleteSavedConfig: (configId: string) => void
  onTestConnection: () => void
  onAddNew: () => void
}

export function ConfigForm({
  config,
  setConfig,
  savedConfigs,
  selectedConfigId,
  showAddNew,
  setShowAddNew,
  loading,
  error,
  onConfigSubmit,
  onSelectSavedConfig,
  onDeleteSavedConfig,
  onTestConnection,
  onAddNew,
}: ConfigFormProps) {
  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-4xl mx-auto mt-8">
        {/* Saved Configurations */}
        {savedConfigs.length > 0 && !showAddNew && (
          <Card className="mb-6">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Clock className="h-5 w-5" />
                    Saved Configurations
                  </CardTitle>
                  <CardDescription>Select a previously used Jira configuration</CardDescription>
                </div>
                <Button variant="outline" onClick={onAddNew}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {savedConfigs.map((savedConfig) => (
                  <div
                    key={savedConfig.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-all hover:shadow-md ${
                      selectedConfigId === savedConfig.id
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    onClick={() => onSelectSavedConfig(savedConfig)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2">
                              <h3 className="font-medium text-gray-900 truncate">
                                {savedConfig.displayName || savedConfig.email}
                              </h3>
                              {selectedConfigId === savedConfig.id && <Check className="h-4 w-4 text-green-600" />}
                            </div>
                            <p className="text-sm text-gray-600 truncate">{savedConfig.domain}</p>
                            <p className="text-xs text-gray-500">{savedConfig.email}</p>
                          </div>
                          <div className="text-right">
                            <div className="flex items-center gap-1 text-xs text-gray-500 mb-1">
                              <Clock className="h-3 w-3" />
                              {formatLastUsed(savedConfig.lastUsed)}
                            </div>
                            <Badge variant="secondary" className="text-xs">
                              Last used
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation()
                          onDeleteSavedConfig(savedConfig.id)
                        }}
                        className="ml-2 text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Add New Configuration Form */}
        {(showAddNew || savedConfigs.length === 0) && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    {showAddNew ? "Add New Configuration" : "Jira Configuration"}
                  </CardTitle>
                  <CardDescription>Enter your Jira credentials to connect</CardDescription>
                </div>
                {showAddNew && savedConfigs.length > 0 && (
                  <Button variant="outline" onClick={() => setShowAddNew(false)}>
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <form onSubmit={onConfigSubmit} className="space-y-4">
                <div>
                  <Label htmlFor="domain">Jira Domain</Label>
                  <Input
                    id="domain"
                    placeholder="your-domain.atlassian.net"
                    value={config.domain}
                    onChange={(e) => setConfig({ ...config, domain: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your-email@example.com"
                    value={config.email}
                    onChange={(e) => setConfig({ ...config, email: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="apiToken">API Token</Label>
                  <Input
                    id="apiToken"
                    type="password"
                    placeholder="Your Jira API token"
                    value={config.apiToken}
                    onChange={(e) => setConfig({ ...config, apiToken: e.target.value })}
                    required
                  />
                  <p className="text-xs text-gray-500 mt-1">
                    Generate an API token from your Atlassian account settings
                  </p>
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <div className="flex gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={onTestConnection}
                    disabled={loading}
                    className="flex-1 bg-transparent"
                  >
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Testing...
                      </>
                    ) : (
                      "Test Connection"
                    )}
                  </Button>
                  <Button type="submit" className="flex-1" disabled={loading}>
                    {loading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      "Connect to Jira"
                    )}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
