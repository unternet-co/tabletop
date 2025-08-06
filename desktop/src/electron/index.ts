import { app, BrowserWindow, dialog, MessageBoxOptions } from 'electron';
import path from 'path';
import { autoUpdater } from 'electron-updater';
import { registerIPCService } from './ipc-service.main';
import { HTTPService } from '../services/http-service.main';

const isDev = !app.isPackaged;
const devUrl = process.env.VITE_DEV_SERVER_URL || 'http://localhost:5173';
const AUTOUPDATE_INTERVAL = 3_600_000; // Hourly

function formatReleaseNotes(
  notes: string | { note: string | null; }[] | null | undefined
): string {
  if (typeof notes === 'string') return notes;
  if (Array.isArray(notes)) return notes.map((n) => n.note).join('\n\n');
  return '';
}

function setupAutoUpdater() {
  if (isDev) {
    return;
  }

  autoUpdater.setFeedURL({
    provider: 'github',
    owner: 'unternet-co',
    repo: 'tabletop',
  });

  // Check for updates
  autoUpdater.on('update-downloaded', (info) => {
    const releaseNotes = formatReleaseNotes(info.releaseNotes);

    const dialogOpts: MessageBoxOptions = {
      type: 'info',
      buttons: ['Restart', 'Later'],
      title: 'Application Update',
      message:
        process.platform === 'win32' ? releaseNotes : info.releaseName || '',
      detail:
        'A new version has been downloaded. Restart the application to apply the updates.',
    };

    dialog.showMessageBox(dialogOpts).then((returnValue) => {
      if (returnValue.response === 0) autoUpdater.quitAndInstall();
    });
  });

  setInterval(() => {
    autoUpdater.checkForUpdates();
  }, AUTOUPDATE_INTERVAL);

  autoUpdater.checkForUpdates();
}

function createWindow() {
  const win = new BrowserWindow({
    height: 860,
    width: 900,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, 'preload.js'),
    },
    titleBarStyle: 'hidden',
    trafficLightPosition: { x: 11, y: 11 },
  });

  if (isDev) {
    win.loadURL(devUrl);
    win.webContents.openDevTools();
  } else {
    const indexPath = path.join(__dirname, '../renderer/index.html');
    win.loadFile(indexPath);
  }
};

function registerServices() {
  const httpService = new HTTPService();
  registerIPCService(httpService);
}

app.on('ready', () => {
  setupAutoUpdater();
  createWindow();
  registerServices();
});

// Quit when all windows are closed, except on macOS.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
