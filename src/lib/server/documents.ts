// This file is for functions that need to run on the server,
// specifically during the build process for generating static paths.

// Note: This function cannot use browser/client-side APIs like fetch().
export async function getContentSlugs(): Promise<string[]> {
    // In a static export setup, we can't dynamically read a directory
    // at build time without more complex scripting. For now, we
    // hardcode the known slugs. This list must be kept in sync
    // with the files in `public/content/[locale]`.
    return ['eula', 'privacy-policy', 'terms-of-service', 'apps-and-support'];
}
