/// <reference path="../typings.d.ts" />
import type { InitOptions } from "i18next";
import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";

/** 在 i18n 初始化之前同步读取用户上次保存的语言偏好 */
function getSavedLanguage(
  supportedLngs: string[],
  fallback: string,
  storageKey = "language"
): string {
  try {
    const saved = localStorage.getItem(storageKey);
    if (saved && supportedLngs.includes(saved)) {
      return saved;
    }
  } catch {
    // localStorage 不可用时静默降级
  }
  return fallback;
}

export function initializeI18n(i18nConfig?: InitOptions) {
  const supportedLngs = (i18nConfig?.supportedLngs as string[]) ?? [
    "en-US",
    "zh-CN",
  ];
  const fallbackLng =
    typeof i18nConfig?.fallbackLng === "string"
      ? i18nConfig.fallbackLng
      : "en-US";

  // 同步读取保存的语言，避免刷新后闪英文
  const initialLng = getSavedLanguage(supportedLngs, fallbackLng);

  i18n
    // Load translation using http backend
    // Learn more: https://github.com/i18next/i18next-http-backend
    .use(Backend)
    // Detect user language
    // Learn more: https://github.com/i18next/i18next-browser-languagedetector
    .use(LanguageDetector)
    // Pass the i18n instance to react-i18next
    .use(initReactI18next)
    // Initialize i18next
    // For all options read: https://www.i18next.com/overview/configuration-options
    .init({
      // Language configuration
      fallbackLng: "en-US", // Default language when detection fails
      supportedLngs: ["en-US", "zh-CN"], // Available locales
      // 显式设置初始语言，确保刷新后立即使用正确语言
      lng: initialLng,

      // Interpolation configuration
      interpolation: {
        escapeValue: false, // Disable escaping since React handles XSS protection
      },

      // HTTP backend configuration
      backend: {
        loadPath: "./assets/locales/{{lng}}/{{ns}}.json", // Translation files path template
        crossDomain: false, // Disable cross-domain requests
        withCredentials: false, // Don't send credentials with requests
        allowMultiLoading: true, // Load namespaces individually
      },

      // Language detection configuration
      detection: {
        order: ["localStorage", "navigator", "htmlTag"], // Detection priority order
        lookupLocalStorage: "language", // localStorage key for saved language
        caches: ["localStorage"], // Cache detected language in localStorage
      },
      // Namespace configuration
      defaultNS: "components", // Default namespace for translations
      ns: [],

      // React integration options
      react: {
        useSuspense: true, // Enable React Suspense for async translation loading
      },
      ...i18nConfig,
    });
  window.i18n = i18n;
  return i18n;
}

