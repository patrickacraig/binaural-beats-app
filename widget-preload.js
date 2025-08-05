const { contextBridge, ipcRenderer } = require('electron');

// Expose protected methods that allow the renderer process to use
// the ipcRenderer without exposing the entire object
contextBridge.exposeInMainWorld('electronAPI', {
    startPreset: (preset) => ipcRenderer.invoke('widget-start-preset', preset),
    stopAudio: () => ipcRenderer.invoke('widget-stop-audio'),
    getStatus: () => ipcRenderer.invoke('widget-get-status'),
    onStatusUpdate: (callback) => ipcRenderer.on('status-update', callback),
    removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});
