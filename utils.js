function getClient() {
    if (!supabaseClient) {
        // 替换为你的 Supabase 项目配置
        const supabaseUrl = 'https://your-project.supabase.co';
        const supabaseKey = 'your-anon-key';
        
        supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);
    }
    return supabaseClient;
}
