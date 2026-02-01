// 今中さんのSupabase情報
const SUPABASE_URL = "https://bmblstfrzddpkkudmiqt.supabase.co"; 
const SUPABASE_ANON_KEY = "sb_publishable_FjGXDlSBCot46gcK3bqeRA_ktHLprLe"; //

const _supabase = supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// ログインなどの機能は、ここから下にAI Studioが生成したものを追加します
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { error } = await _supabase.auth.signUp({ email, password });
    if (error) alert("エラー: " + error.message);
    else alert("確認メールを送りました！");
}

async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    if (error) alert("ログイン失敗: " + error.message);
    else {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('memo-section').style.display = 'block';
    }
}
