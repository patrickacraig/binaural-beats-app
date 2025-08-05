const { app, BrowserWindow, Menu, Tray, nativeImage, ipcMain } = require('electron');
const path = require('path');

let mainWindow;
let widgetWindow;
let tray = null;
let isPlaying = false;
let currentPreset = null;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 1200,
        height: 900,
        minWidth: 800,
        minHeight: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            enableRemoteModule: false,
            webSecurity: true
        },
        titleBarStyle: 'hiddenInset',
        icon: path.join(__dirname, 'icon.png'), // We'll create this
        show: false // Don't show until ready
    });

    // Load the index.html file
    mainWindow.loadFile('index.html');

    // Show window when ready to prevent visual flash
    mainWindow.once('ready-to-show', () => {
        mainWindow.show();
    });

    // Handle window closed - don't quit app, just hide window
    mainWindow.on('close', (event) => {
        if (!app.isQuitting) {
            event.preventDefault();
            mainWindow.hide();
            return false;
        }
    });
    
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    // Create application menu
    createMenu();
    
    // Create system tray
    createTray();
}

function createWidgetWindow() {
    // Create the widget window
    widgetWindow = new BrowserWindow({
        width: 320,
        height: 220,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            enableRemoteModule: false,
            preload: path.join(__dirname, 'widget-preload.js')
        },
        frame: true,
        transparent: false,
        alwaysOnTop: false,
        resizable: true,
        movable: true,
        minimizable: true,
        maximizable: false,
        fullscreenable: false,
        closable: true,
        show: false,
        title: 'Binaural Beats Widget',
        titleBarStyle: 'default'
    });

    // Load the widget HTML file
    widgetWindow.loadFile('widget.html');

    // Show widget when ready
    widgetWindow.once('ready-to-show', () => {
        widgetWindow.show();
    });

    // Handle widget window closed
    widgetWindow.on('closed', () => {
        widgetWindow = null;
    });
}

function createTray() {
    // Create tray icon - use a simple 16x16 template
    const trayIcon = nativeImage.createFromPath(path.join(__dirname, 'icon.png'));
    const templateIcon = trayIcon.resize({ width: 16, height: 16 });
    templateIcon.setTemplateImage(true);
    
    tray = new Tray(templateIcon);
    tray.setToolTip('Binaural Beats for Studying');
    
    updateTrayMenu();
    
    // Handle tray click (show main window)
    tray.on('click', () => {
        if (mainWindow) {
            if (mainWindow.isMinimized()) {
                mainWindow.restore();
            }
            mainWindow.show();
            mainWindow.focus();
        } else {
            createWindow();
        }
    });
}

function updateTrayMenu() {
    const contextMenu = Menu.buildFromTemplate([
        {
            label: isPlaying ? `Playing: ${currentPreset || 'Custom'}` : 'Not Playing',
            enabled: false
        },
        { type: 'separator' },
        {
            label: 'Focus Mode',
            click: () => startPresetFromTray('Focus Mode')
        },
        {
            label: 'Deep Focus', 
            click: () => startPresetFromTray('Deep Focus')
        },
        {
            label: 'Alert Study',
            click: () => startPresetFromTray('Alert Study')
        },
        {
            label: 'Calm Focus',
            click: () => startPresetFromTray('Calm Focus')
        },
        { type: 'separator' },
        {
            label: 'Stop Audio',
            enabled: isPlaying,
            click: () => stopAudioFromTray()
        },
        { type: 'separator' },
        {
            label: 'Show Main Window',
            click: () => {
                if (mainWindow) {
                    if (mainWindow.isMinimized()) {
                        mainWindow.restore();
                    }
                    mainWindow.show();
                    mainWindow.focus();
                } else {
                    createWindow();
                }
            }
        },
        {
            label: 'Show Widget',
            click: () => {
                if (widgetWindow) {
                    widgetWindow.focus();
                } else {
                    createWidgetWindow();
                }
            }
        },
        { type: 'separator' },
        {
            label: 'Quit',
            click: () => {
                app.quit();
            }
        }
    ]);
    
    tray.setContextMenu(contextMenu);
}

function startPresetFromTray(preset) {
    if (mainWindow) {
        mainWindow.webContents.send('start-preset', preset);
    } else {
        // Create main window if it doesn't exist
        createWindow();
        mainWindow.once('ready-to-show', () => {
            mainWindow.webContents.send('start-preset', preset);
        });
    }
}

function stopAudioFromTray() {
    if (mainWindow) {
        mainWindow.webContents.send('stop-audio');
    }
}

function createMenu() {
    const template = [
        {
            label: 'Binaural Beats',
            submenu: [
                {
                    label: 'About Binaural Beats',
                    role: 'about'
                },
                { type: 'separator' },
                {
                    label: 'Hide Binaural Beats',
                    accelerator: 'Command+H',
                    role: 'hide'
                },
                {
                    label: 'Hide Others',
                    accelerator: 'Command+Shift+H',
                    role: 'hideothers'
                },
                {
                    label: 'Show All',
                    role: 'unhide'
                },
                { type: 'separator' },
                {
                    label: 'Show Desktop Widget',
                    accelerator: 'Command+Shift+W',
                    click: () => {
                        if (widgetWindow) {
                            widgetWindow.focus();
                        } else {
                            createWidgetWindow();
                        }
                    }
                },
                {
                    label: 'Hide Desktop Widget',
                    click: () => {
                        if (widgetWindow) {
                            widgetWindow.close();
                        }
                    }
                },
                {
                    label: 'Toggle Widget Always On Top',
                    click: () => {
                        if (widgetWindow) {
                            const isOnTop = widgetWindow.isAlwaysOnTop();
                            widgetWindow.setAlwaysOnTop(!isOnTop);
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Hide to Menu Bar',
                    accelerator: 'Command+H',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.hide();
                        }
                    }
                },
                {
                    label: 'Quit',
                    accelerator: 'Command+Q',
                    click: () => {
                        app.quit();
                    }
                }
            ]
        },
        {
            label: 'Edit',
            submenu: [
                {
                    label: 'Undo',
                    accelerator: 'Command+Z',
                    role: 'undo'
                },
                {
                    label: 'Redo',
                    accelerator: 'Shift+Command+Z',
                    role: 'redo'
                },
                { type: 'separator' },
                {
                    label: 'Cut',
                    accelerator: 'Command+X',
                    role: 'cut'
                },
                {
                    label: 'Copy',
                    accelerator: 'Command+C',
                    role: 'copy'
                },
                {
                    label: 'Paste',
                    accelerator: 'Command+V',
                    role: 'paste'
                },
                {
                    label: 'Select All',
                    accelerator: 'Command+A',
                    role: 'selectall'
                }
            ]
        },
        {
            label: 'View',
            submenu: [
                {
                    label: 'Reload',
                    accelerator: 'Command+R',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.reload();
                        }
                    }
                },
                {
                    label: 'Toggle Developer Tools',
                    accelerator: 'F12',
                    click: () => {
                        if (mainWindow) {
                            mainWindow.webContents.toggleDevTools();
                        }
                    }
                },
                { type: 'separator' },
                {
                    label: 'Actual Size',
                    accelerator: 'Command+0',
                    role: 'resetzoom'
                },
                {
                    label: 'Zoom In',
                    accelerator: 'Command+Plus',
                    role: 'zoomin'
                },
                {
                    label: 'Zoom Out',
                    accelerator: 'Command+-',
                    role: 'zoomout'
                },
                { type: 'separator' },
                {
                    label: 'Toggle Fullscreen',
                    accelerator: 'Ctrl+Command+F',
                    role: 'togglefullscreen'
                }
            ]
        },
        {
            label: 'Window',
            submenu: [
                {
                    label: 'Minimize',
                    accelerator: 'Command+M',
                    role: 'minimize'
                },
                {
                    label: 'Close',
                    accelerator: 'Command+W',
                    role: 'close'
                }
            ]
        },
        {
            label: 'Help',
            submenu: [
                {
                    label: 'About Binaural Beats',
                    click: () => {
                        // Show about dialog or navigate to info section
                        if (mainWindow) {
                            mainWindow.webContents.executeJavaScript(`
                                document.querySelector('.info-section').scrollIntoView({ 
                                    behavior: 'smooth' 
                                });
                            `);
                        }
                    }
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
}

// App event listeners
app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    // Keep the app running in background with tray
    // Don't quit when all windows are closed
});

app.on('activate', () => {
    // On macOS, re-create window when dock icon is clicked
    if (!mainWindow) {
        createWindow();
    } else {
        mainWindow.show();
    }
});

app.on('before-quit', () => {
    app.isQuitting = true;
});

// Security: Prevent new window creation
app.on('web-contents-created', (event, contents) => {
    contents.on('new-window', (event, url) => {
        event.preventDefault();
    });
});

// IPC Communication between main app and widget
ipcMain.handle('widget-start-preset', async (event, preset) => {
    if (mainWindow) {
        mainWindow.webContents.send('start-preset', preset);
        return { success: true };
    }
    return { success: false, error: 'Main window not available' };
});

ipcMain.handle('widget-stop-audio', async (event) => {
    if (mainWindow) {
        mainWindow.webContents.send('stop-audio');
        return { success: true };
    }
    return { success: false, error: 'Main window not available' };
});

ipcMain.handle('widget-get-status', async (event) => {
    if (mainWindow) {
        return new Promise((resolve) => {
            mainWindow.webContents.send('get-status');
            ipcMain.once('status-response', (event, status) => {
                resolve(status);
            });
            // Timeout after 1 second
            setTimeout(() => resolve({ isPlaying: false, currentPreset: null }), 1000);
        });
    }
    return { isPlaying: false, currentPreset: null };
});

ipcMain.on('status-update', (event, status) => {
    // Update global state
    isPlaying = status.isPlaying;
    currentPreset = status.currentPreset;
    
    // Update widget
    if (widgetWindow) {
        widgetWindow.webContents.send('status-update', status);
    }
    
    // Update tray menu
    if (tray) {
        updateTrayMenu();
    }
});
