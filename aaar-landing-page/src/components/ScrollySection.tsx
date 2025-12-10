import React, { useEffect, useState } from 'react';

/**
 * スクロールテリングの各ステップの型定義
 */
export interface Step {
  id: number;
  title: string;
  body: string;
  /** カスタムビジュアルを指定可能。未指定の場合はtitleとbodyが表示される */
  visual?: React.ReactNode;
}

interface ScrollySectionProps {
  steps: Step[];
}

/**
 * スクロール量に応じてコンテンツを切り替えるスクロールテリングコンポーネント
 *
 * Why: 閾値ベースのスナップ動作を採用
 * - ユーザーが途中でスクロールを止めても、中途半端な状態にならない
 * - コンテンツが重なって読みにくくなることを防ぐ
 * - ページ遷移のタイミングが明確で直感的
 */
const ScrollySection: React.FC<ScrollySectionProps> = ({ steps }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [animationDirection, setAnimationDirection] = useState<'forward' | 'backward'>('forward');

  useEffect(() => {
    /**
     * Why: 閾値を60%に設定
     * - 50%だと意図せず遷移しやすい（少しスクロールしただけで切り替わる）
     * - 70%以上だとユーザーが「切り替わらない」と感じる
     * - 60%は「意図的なスクロール」と「偶発的なスクロール」を区別できる最適値
     */
    const threshold = 0.6;

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      const windowHeight = window.innerHeight;

      /**
       * Why: rawProgressを使用
       * - scrollPosition / windowHeightで、現在何ページ目にいるかを小数で表現
       * - 例: 1.3 = 1ページ目の30%地点
       * - この方法により、スクロール位置とページ番号を簡単に関連付けられる
       */
      const rawProgress = scrollPosition / windowHeight;
      const sectionIndex = Math.floor(rawProgress);
      const sectionProgress = rawProgress - sectionIndex;

      /**
       * Why: 双方向の閾値判定
       * - 下スクロール: 60%を超えたら次のページへ
       * - 上スクロール: 40%未満なら前のページへ
       * - この20%のヒステリシス（不感帯）により、ページが頻繁に切り替わることを防ぐ
       */
      let newIndex = activeIndex;

      if (sectionProgress >= threshold && sectionIndex < steps.length - 1) {
        newIndex = sectionIndex + 1;
      } else if (sectionProgress < 1 - threshold) {
        newIndex = sectionIndex;
      }

      /**
       * Why: activeIndexが変わったときのみアニメーションを実行
       * - scrollイベントは頻繁に発火するため、毎回アニメーションを再生すると重い
       * - ページが実際に切り替わるときだけアニメーションすることで、パフォーマンスを保つ
       */
      if (newIndex !== activeIndex) {
        /**
         * Why: 前進・後退の方向を記録
         * - 前進時は下から上へ、後退時は上から下へのアニメーション
         * - スクロール方向に合った自然な動きを実現
         */
        setAnimationDirection(newIndex > activeIndex ? 'forward' : 'backward');
        setIsAnimating(true);
        setActiveIndex(newIndex);

        /**
         * Why: 600msでアニメーションフラグをリセット
         * - CSSアニメーションの時間（global.css）と同期させる必要がある
         * - 同期しないと、次の遷移時にアニメーションが再生されない場合がある
         */
        setTimeout(() => {
          setIsAnimating(false);
        }, 600);
      }
    };

    window.addEventListener('scroll', handleScroll);
    /**
     * Why: 初回表示時にもhandleScrollを呼ぶ
     * - ページをリロードしたとき、スクロール位置が途中の場合がある
     * - その場合でも正しいページを表示するため
     */
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, [steps.length, activeIndex]);

  const currentStep = steps[activeIndex];

  return (
    <div className="relative">
      {/**
       * Why: fixedで固定し、z-10で前面に配置
       * - ビジュアルエリアは常に画面に固定し、スクロールしても動かない
       * - スペーサーの上に重ねることで、スクロール可能にしつつ表示は固定
       */}
      <div className="fixed top-0 left-0 w-full h-screen flex items-center justify-center p-8 bg-gradient-to-br from-slate-900 to-slate-800 z-10 overflow-hidden">
        {/**
         * Why: key={activeIndex}で要素を強制的に再マウント
         * - Reactは同じコンポーネントを再利用しようとする
         * - keyを変えることで「別の要素」として認識させ、CSSアニメーションを確実に再生
         * - これがないと、2回目以降のページ遷移でアニメーションが動かない
         */}
        <div
          key={activeIndex}
          className={`absolute inset-0 flex items-center justify-center p-8 ${
            isAnimating
              ? animationDirection === 'forward'
                ? 'animate-slide-up-fade-in'
                : 'animate-slide-down-fade-in'
              : ''
          }`}
        >
          <div className="text-white text-center max-w-xl">
            {/**
             * Why: visualがある場合はそちらを優先
             * - ステップごとにカスタムビジュアルを指定できる柔軟性
             * - デフォルトのtitle+bodyレイアウトも提供
             */}
            {currentStep?.visual || (
              <>
                <h2 className="text-5xl font-bold mb-6">{currentStep?.title}</h2>
                <p className="text-xl leading-relaxed opacity-90">
                  {currentStep?.body}
                </p>
              </>
            )}
          </div>
        </div>
      </div>

      {/**
       * Why: ステップ数分のスペーサーを配置
       * - 各ステップにつき100vhの高さを確保
       * - これによりスクロール可能な領域を作り、スクロール量でページを判定できる
       * - fixedで固定されたビジュアルエリアの「下」に配置されるが、視覚的には見えない
       */}
      {steps.map((step) => (
        <div key={step.id} className="h-screen" />
      ))}
    </div>
  );
};

export default ScrollySection;
