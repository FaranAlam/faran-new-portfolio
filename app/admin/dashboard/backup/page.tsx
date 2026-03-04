'use client';

import { useState, useEffect, useRef } from 'react';
import { 
  MdEmail, 
  MdNewspaper, 
  MdWork, 
  MdArticle, 
  MdMailOutline, 
  MdCampaign, 
  MdHistory, 
  MdInventory, 
  MdWarning, 
  MdSave, 
  MdUpload, 
  MdCheckCircle, 
  MdError, 
  MdMenuBook 
} from 'react-icons/md';

interface BackupStats {
  totalDocuments: number;
  totalCollections: number;
  stats: Record<string, number>;
}

export default function BackupPage() {
  const [stats, setStats] = useState<BackupStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [backing, setBacking] = useState(false);
  const [restoring, setRestoring] = useState(false);
  const [restoreResults, setRestoreResults] = useState<any>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const response = await fetch('/api/backup?action=stats');
      const data = await response.json();
      if (data.success) {
        setStats(data);
      }
    } catch (error) {
      console.error('Failed to load stats:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportBackup = async () => {
    if (!confirm('Create a complete backup of all database collections?')) return;

    setBacking(true);
    try {
      const response = await fetch('/api/backup?action=export');
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `portfolio-backup-${Date.now()}.json`;
      a.click();
      window.URL.revokeObjectURL(url);
      alert('Backup created successfully!');
    } catch (error) {
      console.error('Backup failed:', error);
      alert('Failed to create backup');
    } finally {
      setBacking(false);
    }
  };

  const handleRestoreBackup = async () => {
    if (!fileInputRef.current?.files?.[0]) {
      alert('Please select a backup file');
      return;
    }

    if (!confirm('WARNING: This will restore data from the backup file. Existing data might be affected. Continue?')) {
      return;
    }

    setRestoring(true);
    setRestoreResults(null);

    try {
      const file = fileInputRef.current.files[0];
      const text = await file.text();
      const backup = JSON.parse(text);

      const response = await fetch('/api/backup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(backup),
      });

      const data = await response.json();

      if (data.success) {
        setRestoreResults(data.results);
        alert('Backup restored successfully!');
        loadStats(); // Refresh stats
      } else {
        alert(`${data.error}`);
      }
    } catch (error) {
      console.error('Restore failed:', error);
      alert('Failed to restore backup. Please check the file format.');
    } finally {
      setRestoring(false);
    }
  };

  const getCollectionIcon = (name: string) => {
    switch (name) {
      case 'contacts': return <MdEmail className="text-blue-500" />;
      case 'newsletter_subscribers': return <MdNewspaper className="text-purple-500" />;
      case 'projects': return <MdWork className="text-orange-500" />;
      case 'blog_posts': return <MdArticle className="text-pink-500" />;
      case 'email_templates': return <MdMailOutline className="text-cyan-500" />;
      case 'email_campaigns': return <MdCampaign className="text-indigo-500" />;
      case 'activity_logs': return <MdHistory className="text-green-500" />;
      default: return <MdInventory className="text-gray-500" />;
    }
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Database Backup & Restore</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">Backup and restore your database collections</p>
      </div>

      {/* Warning Banner */}
      <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-xl p-4">
        <div className="flex items-start gap-3">
          <MdWarning className="text-3xl text-yellow-600 dark:text-yellow-400" />
          <div>
            <h3 className="font-bold text-yellow-900 dark:text-yellow-300">Important</h3>
            <p className="text-sm text-yellow-800 dark:text-yellow-400 mt-1">
              Always create backups before making major changes. Store backups in a safe location outside your server.
            </p>
          </div>
        </div>
      </div>

      {/* Stats */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 dark:from-blue-600 dark:to-blue-700 rounded-xl p-6 text-white shadow-lg">
            <p className="text-blue-100 text-sm font-medium">Total Collections</p>
            <p className="text-3xl font-bold mt-2">{stats.totalCollections}</p>
          </div>
          <div className="bg-gradient-to-br from-green-500 to-green-600 dark:from-green-600 dark:to-green-700 rounded-xl p-6 text-white shadow-lg">
            <p className="text-green-100 text-sm font-medium">Total Documents</p>
            <p className="text-3xl font-bold mt-2">{stats.totalDocuments.toLocaleString()}</p>
          </div>
          <div className="bg-gradient-to-br from-purple-500 to-purple-600 dark:from-purple-600 dark:to-purple-700 rounded-xl p-6 text-white shadow-lg">
            <p className="text-purple-100 text-sm font-medium">Last Backup</p>
            <p className="text-lg font-bold mt-2">Manual Only</p>
          </div>
        </div>
      )}

      {/* Collection Details */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Collection Statistics</h2>
        {loading ? (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-500 border-t-transparent"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {stats && Object.entries(stats.stats).map(([collection, count]) => (
              <div key={collection} className="border border-gray-200 dark:border-gray-700 rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center gap-3">
                  <span className="text-3xl">{getCollectionIcon(collection)}</span>
                  <div className="flex-1">
                    <p className="text-sm text-gray-500 dark:text-gray-400 capitalize">
                      {collection.replace(/_/g, ' ')}
                    </p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">
                      {count.toLocaleString()}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Backup Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Export Backup */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg">
              <MdSave className="text-3xl text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Create Backup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Export all database collections</p>
            </div>
          </div>
          <button
            onClick={handleExportBackup}
            disabled={backing}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {backing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Creating Backup...
              </>
            ) : (
              <>
                <MdSave className="text-xl" />
                Download Backup File
              </>
            )}
          </button>
        </div>

        {/* Restore Backup */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-green-100 dark:bg-green-900/30 p-3 rounded-lg">
              <MdUpload className="text-3xl text-green-600 dark:text-green-400" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900 dark:text-white">Restore Backup</h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">Import data from backup file</p>
            </div>
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json"
            className="w-full mb-3 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-green-500 dark:bg-gray-700 dark:text-white text-sm"
          />
          <button
            onClick={handleRestoreBackup}
            disabled={restoring}
            className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2"
          >
            {restoring ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                Restoring...
              </>
            ) : (
              <>
                <MdUpload className="text-xl" />
                Restore from File
              </>
            )}
          </button>
        </div>
      </div>

      {/* Restore Results */}
      {restoreResults && (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
          <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">Restore Results</h2>
          <div className="space-y-3">
            {Object.entries(restoreResults).map(([collection, result]: [string, any]) => (
              <div key={collection} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{getCollectionIcon(collection)}</span>
                  <span className="font-medium text-gray-900 dark:text-white capitalize">
                    {collection.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="flex items-center gap-4 text-sm">
                  <span className="text-green-600 dark:text-green-400 flex items-center gap-1">
                    <MdCheckCircle /> {result.inserted} inserted
                  </span>
                  {result.errors > 0 && (
                    <span className="text-red-600 dark:text-red-400 flex items-center gap-1">
                      <MdError /> {result.errors} errors
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Best Practices */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md p-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
          <MdMenuBook className="text-blue-600" /> Backup Best Practices
        </h2>
        <ul className="space-y-2 text-gray-700 dark:text-gray-300">
          <li className="flex items-start gap-2">
            <MdCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>Create backups before major updates or migrations</span>
          </li>
          <li className="flex items-start gap-2">
            <MdCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>Store backups in multiple secure locations (local + cloud)</span>
          </li>
          <li className="flex items-start gap-2">
            <MdCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>Test restore procedures regularly</span>
          </li>
          <li className="flex items-start gap-2">
            <MdCheckCircle className="text-green-600 dark:text-green-400 mt-1 flex-shrink-0" />
            <span>Keep backup files organized with dates in filenames</span>
          </li>
          <li className="flex items-start gap-2">
            <MdWarning className="text-yellow-600 dark:text-yellow-400 mt-1 flex-shrink-0" />
            <span>Restoring will add documents - it doesn&apos;t delete existing data</span>
          </li>
        </ul>
      </div>
    </div>
  );
}
