export default function normalizeLanguage(language) {
    return language && language.replace('_', '-').toLowerCase();
}