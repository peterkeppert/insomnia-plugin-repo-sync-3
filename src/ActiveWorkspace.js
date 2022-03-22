const fs = require('fs');

class ActiveWorkspace {
  constructor(workspaceId) {
    if (workspaceId === undefined) {
      this.workspaceId = localStorage.getItem("insomnia::meta::activeWorkspaceId").replace(/['"]+/g, '');
    }
    else {
      this.workspaceId = workspaceId;
    }
  }

  getSyncPath() {
    return localStorage.getItem("insomnia-plugin-repo-sync-workspacePath-" + this.workspaceId);
  }
  
  setSyncPath(workspaceName, filePath) {
    localStorage.setItem("insomnia-plugin-repo-sync-workspacePath-" + this.workspaceId, `${filePath}/${workspaceName}.json`);
  }
  
  markSynced(timestamp) {
    if (timestamp === undefined) {
      const currentDate = new Date();
      timestamp = currentDate.getTime();
    }
    localStorage.setItem("insomnia-plugin-repo-sync-lastImport-" + this.workspaceId, timestamp);
  }

  getExportFileModified() {
    const exportFileStats = fs.statSync(this.getSyncPath());
    return exportFileStats.mtime.getTime();
  }
  
  isSynced() {
    if (!this.getSyncPath()) {
      return false;
    }

    if (!fs.existsSync(this.getSyncPath())) {
      return false;
    }

    return true;
  }
  
  isUpToDate() {
    if (this.getExportFileModified() > localStorage.getItem("insomnia-plugin-repo-sync-lastImport-" + this.workspaceId)) {
      return false;
    }
  
    return true;
  }
  
}

module.exports = ActiveWorkspace;
