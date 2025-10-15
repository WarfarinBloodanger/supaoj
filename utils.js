let supabaseClient = null;
function getClient() {
    if (!supabaseClient) {
        const supabaseUrl = '你的 SupaBase 项目地址';
        const supabaseKey = '你的 SupaBase 匿名密钥';
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
    const scriptPath = currentPath.replace(/\.html$/, '.js');
    const script = document.createElement('script');
    script.src = scriptPath;
    document.head.appendChild(script);
});
