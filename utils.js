let supabaseClient = null;
function getClient() {
    if (!supabaseClient) {
        const supabaseUrl = 'https://lotykguxhggdqvbeifmo.supabase.co';
        const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImxvdHlrZ3V4aGdnZHF2YmVpZm1vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjA0NTYxNTIsImV4cCI6MjA3NjAzMjE1Mn0.PPaibEd5z8055Id1kGQ-QOFBA7c4rW9ycc_HZ1pU5FA';
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    }
    return supabaseClient;
}
function getArgs(key) {
    const args = {};
    for (const [k, v] of new URLSearchParams(window.location.search).entries()) {
        args[k] = v;
    }
    return key ? args[key] : args;
}
document.addEventListener('DOMContentLoaded', function() {
    const currentPath = window.location.pathname;
    let scriptPath = currentPath.replace(/\.html$/, '.js');
    if (!scriptPath.endsWith(".js")) scriptPath += ".js";
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
