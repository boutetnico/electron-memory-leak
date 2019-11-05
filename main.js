// Modules to control application life and create native browser window
const {app, BrowserWindow} = require('electron')
const path = require('path')

const url = [
              'https://google.com',
              'https://facebook.com',
              'https://twitter.com',
              'https://youtube.com',
              'https://cnn.com',
              'https://bbc.com',
              'https://abc.com',
              'https://paypal.com',
              'https://github.com',
              'https://yahoo.com',
            ]

function createWindow (delay) {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    show: false,
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // and load the index.html of the app.
  // mainWindow.loadFile('index.html')
  let randomUrl = url[Math.floor(Math.random() * url.length)];

  mainWindow.loadURL(randomUrl)

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Auto-destroy
  setTimeout(() => {
    mainWindow.destroy()
  }, delay)
}

function createThenDestroyWindow (delay) {

  console.log('timestamp,private,shared')

  setInterval(() => {

    createWindow(delay)

    process.getProcessMemoryInfo().then((result) => {
      console.log(Math.floor(new Date().getTime() / 1000) + ',' + result.private + ',' + result.shared)
    })

  }, delay * 2)
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', () => {
  createThenDestroyWindow(2000)
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') app.quit()
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  // We don't want this behaviour in our test to avoid duplicate window
  // if (BrowserWindow.getAllWindows().length === 0) createWindow()
})

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
