
if (window.remotetype === 'remote') {
  require('./components/remote/').init();
}

if (window.remotetype === 'viewer') {
  require('./components/viewer/').init();
}
