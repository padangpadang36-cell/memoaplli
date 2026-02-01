// 1. 接続設定（今中さんの情報に書き換えてください！）
const SUPABASE_URL = "https://bmblstfrzddpkkudmiqt.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_FjGXDlSBCot46gcK3bqeRA_ktHLprLe"; //

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- A. ログアウト機能 ---
async function signOut() {
    const { error } = await _supabase.auth.signOut();
    if (error) alert("エラー: " + error.message);
    else {
        alert("ログアウトしました");
        location.reload(); // 画面を更新してログイン前に戻す
    }
}

// --- B. メモ保存機能 ---
async function saveMemo() {
    const content = document.getElementById('memo-content').value;
    if (!content) return alert("内容を入力してください");

    // 今ログインしている人の情報を取得
    const { data: { user } } = await _supabase.auth.getUser();

    const { error } = await _supabase.from('memos').insert([
        { content: content, user_id: user.id }
    ]);

    if (error) {
        console.error(error);
        alert("保存失敗: " + error.message);
    } else {
        alert("保存しました！");
        document.getElementById('memo-content').value = '';
        displayMemos(); // 一覧を更新
    }
}

// --- C. メモ一覧表示機能 ---
async function displayMemos() {
    const { data: memos, error } = await _supabase.from('memos').select('*').order('created_at', { ascending: false });
    
    if (error) return console.error(error);

    const listElement = document.getElementById('memo-list');
    listElement.innerHTML = memos.map(m => `
        <div style="border-bottom: 1px solid #eee; padding: 10px;">
            <p>${m.content}</p>
            <small>${new Date(m.created_at).toLocaleString()}</small>
        </div>
    `).join('');
}

// ログイン状態を監視して、ログイン済みならメモ一覧を出す
_supabase.auth.onAuthStateChange((event, session) => {
    if (session) {
        document.getElementById('auth-section').style.display = 'none';
        document.getElementById('memo-section').style.display = 'block';
        displayMemos();
    }
});
