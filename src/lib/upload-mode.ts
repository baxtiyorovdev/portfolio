import "server-only";

export type UploadMode = "presigned" | "token" | "none";

/**
 * How the admin panel can upload images to Vercel Blob:
 * - "presigned": newer OIDC-based stores (Vercel sets BLOB_STORE_ID and
 *   BLOB_WEBHOOK_PUBLIC_KEY when the store is connected with the default "BLOB" prefix)
 * - "token": older stores with BLOB_READ_WRITE_TOKEN
 * - "none": no store connected — uploads are disabled, paths still work
 */
export function getUploadMode(): UploadMode {
  if (process.env.BLOB_READ_WRITE_TOKEN) return "token";
  if (process.env.BLOB_STORE_ID && process.env.BLOB_WEBHOOK_PUBLIC_KEY) return "presigned";
  return "none";
}
