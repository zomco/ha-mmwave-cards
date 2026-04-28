import en from './languages/en.json';
import zhHans from './languages/zh-Hans.json';

const languages: Record<string, typeof en> = {
  en,
  'zh-Hans': zhHans,
};

/**
 * 返回本地化字符串
 * @param key  例如 "tabs.geo"
 * @param lang 例如 "zh-Hans"；省略时尝试读取浏览器语言
 */
export function localize(key: string, lang?: string): string {
  const language = lang ?? navigator.language?.split('-')[0] ?? 'en';

  // 完整匹配（如 zh-Hans）优先，再 fallback 到前缀（如 zh→zh-Hans）
  const dict =
    languages[lang ?? ''] ?? Object.entries(languages).find(([k]) => k.startsWith(language))?.[1] ?? languages['en'];

  const keys = key.split('.');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let result: any = dict;
  for (const k of keys) {
    result = result?.[k];
    if (result === undefined) break;
  }
  return typeof result === 'string' ? result : key;
}
