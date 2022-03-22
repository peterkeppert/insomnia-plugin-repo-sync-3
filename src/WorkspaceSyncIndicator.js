const ActiveWorkspace = require('./ActiveWorkspace.js');

class WorkspaceSyncIndicator {
  constructor() {
  }

  refresh() {
    var syncStateElement = document.getElementById('sync-state');
    if (!syncStateElement) {
      syncStateElement = document.createElement('div');
      syncStateElement.setAttribute('id', 'sync-state');
      document.querySelector('.header_left').appendChild(syncStateElement);
    }    

    // Outside of workspace.
    if (!document.querySelector('li[data-testid="workspace"]')) {
      syncStateElement.innerHTML = '';
      return;
    }

    const activeWorkspace = new ActiveWorkspace();
    if (!activeWorkspace.isSynced()) {
      syncStateElement.innerHTML = '<i class="fa fa-circle" style="color:white"></i>';
    }
    else if (activeWorkspace.isUpToDate()) {
      syncStateElement.innerHTML = '<i class="fa fa-check-circle" style="color:green"></i>';
    }
    else {
      syncStateElement.innerHTML = '<i class="fa fa-exclamation-circle" style="color:yellow"></i>';
    }
  }
  
}

module.exports = WorkspaceSyncIndicator;
