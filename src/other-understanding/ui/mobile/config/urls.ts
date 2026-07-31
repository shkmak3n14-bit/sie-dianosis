/**
 * type-engine（既存 HTML 診断）への導線
 * 本番: GitHub Pages ホスト
 * 上書き: EXPO_PUBLIC_TYPE_ENGINE_DIAGNOSIS_URL
 */
import { Platform } from 'react-native';

/** 公開サイト（GitHub Pages） */
export const SIE_HOST_URL = 'https://shkmak3n14-bit.github.io/sie-dianosis';

/** 診断フォームのデフォルト URL */
export const DEFAULT_TYPE_ENGINE_DIAGNOSIS_URL = `${SIE_HOST_URL}/diagnosis.html`;

const ENV_URL = process.env.EXPO_PUBLIC_TYPE_ENGINE_DIAGNOSIS_URL?.trim();

/** 診断フォーム（diagnosis.html）の URL */
export function getTypeEngineDiagnosisUrl(): string {
  if (ENV_URL) return ENV_URL;

  // Expo Web で同一オリジン配信時は相対パスを優先
  if (Platform.OS === 'web' && typeof window !== 'undefined') {
    const { origin, pathname } = window.location;
    // Pages 配下（/sie-dianosis/）で動いている場合は既存パスを維持
    if (pathname.includes('/sie-dianosis')) {
      return new URL('diagnosis.html', `${origin}${pathname}`).toString();
    }
  }

  return DEFAULT_TYPE_ENGINE_DIAGNOSIS_URL;
}

export const TYPE_ENGINE_URL_IS_CONFIGURED = true;
