// 1. 接続設定（ここを今中さんの情報に書き換えてください！）
const SUPABASE_URL = "https://bmblstfrzddpkkudmiqt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FjGXDlSBCot46gcK3bqeRA_ktHLprLe"; //

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- A. 新規登録機能 ---
async function signUp() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    if (!email || !password) return alert("メールとパスワードを入力してください");
    
    const { error } = await _supabase.auth.signUp({ email, password });
    if (error) alert("登録エラー: " + error.message);
    else alert("確認メールを送りました。メール内のリンクを押して戻ってきてください！");
}

// --- B. ログイン機能 ---
async function signIn() {
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const { data, error } = await _supabase.auth.signInWithPassword({ email, password });
    
    if (error) alert("ログイン失敗: " + error.message);
    // 成功時は下の onAuthStateChange が検知して画面を切り替えます
}

// --- C. ログアウト機能 ---
async function signOut() {
    await _supabase.auth.signOut();
    alert("ログアウトしました");
    location.reload();
}

// --- D. メモ保存機能 ---
async function saveMemo() {
    const content = document.getElementById('memo-content').value;
    if (!content) return alert("内容を入力してください");

    const { data: { user } } = await _supabase.auth.getUser();
    const { error } = await _supabase.from('memos').insert([{ content, user_id: user.id }]);

    if (error) alert("保存失敗: " + error.message);
    else {
        alert("保存しました！");
        document.getElementById('memo-content').value = '';
        displayMemos();
    }
}

// --- E. メモ一覧表示機能 ---
async function displayMemos() {
    const { data: memos, error } = await _supabase.from('memos').select('*').order('created_at', { ascending: false });
    if (error) return console.error(error);

    const listElement = document.getElementById('memo-list');
    listElement.innerHTML = memos.map(m => `
        <div style="border-bottom: 1px solid #eee; padding: 10px; margin-top: 10px; background: #fff;">
            <p style="margin: 0;">${m.content}</p>
            <small style="color: #999;">${new Date(m.created_at).toLocaleString()}</small>
        </div>
    `).join('');
}

// 2. ログイン状態の監視（ログインしたら画面を切り替える）
_supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('memo-section').style.display = 'block';
        displayMemos();
    }
});
