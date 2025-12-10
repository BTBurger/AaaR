import React from "react";

const LandingHero: React.FC = () => {
  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "3rem 1.5rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        textAlign: "center",
        gap: "1.5rem",
        background:
          "radial-gradient(circle at top, #e0f2ff 0, #f9fbff 40%, #ffffff 100%)",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", fontWeight: 800, margin: 0 }}>
        あなたのサービスのキャッチコピー
      </h1>
      <p style={{ maxWidth: 520, fontSize: "1rem", lineHeight: 1.7 }}>
        ここにサービスの説明文を短く書きます。ユーザーの課題・ベネフィットを
        2〜3行で簡潔に伝えましょう。
      </p>
      <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap", justifyContent: "center" }}>
        <button
          style={{
            padding: "0.9rem 1.8rem",
            borderRadius: "999px",
            border: "none",
            fontWeight: 700,
            cursor: "pointer",
            fontSize: "0.95rem",
            boxShadow: "0 10px 25px rgba(15, 118, 110, 0.25)",
          }}
        >
          今すぐ始める
        </button>
        <button
          style={{
            padding: "0.9rem 1.8rem",
            borderRadius: "999px",
            border: "1px solid #d1d5db",
            background: "white",
            cursor: "pointer",
            fontSize: "0.95rem",
          }}
        >
          詳細を見る
        </button>
      </div>
      <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
        ※ 14日間の無料トライアル。クレジットカードは不要です。
      </p>
    </div>
  );
};

export default LandingHero;
