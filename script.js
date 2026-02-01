// 1. Supabaseとの接続設定（ここを書き換えます！）
const SUPABASE_URL = "https://bmblstfrzddpkkudmiqt.supabase.co"; // 今中さんのURL
const SUPABASE_ANON_KEY = "sb_publishable_FjGXDlSBCot46gcK3bqeRA_ktHLprLe"; // image_4e1b9b.png の鍵

// Supabaseクライアントの初期化
const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// --- ここから下にログインやメモ保存のプログラムを書いていきます ---

console.log("Supabase準備完了！");
