// Simple debugging script to log errors
window.addEventListener('error', function(event) {
    console.error('Error:', event.message, 'at', event.filename, 'line', event.lineno);
});

document.addEventListener('DOMContentLoaded', function() {
    console.log('Game starting - debug mode');
});
