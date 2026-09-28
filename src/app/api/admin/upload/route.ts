import { issueSignedToken } from "@vercel/blob";
import {
  handleUpload,
  handleUploadPresigned,
  type HandleUploadBody,
  type HandleUploadPresignedBody,
} from "@vercel/blob/client";
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-session";
import { getUploadMode } from "@/lib/upload-mode";

const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/webp", "image/avif", "image/gif"];
const MAX_BYTES = 8 * 1024 * 1024;

/**
 * Lets the admin panel upload images straight from the browser to Vercel Blob
 * (no 4.5 MB serverless body limit). Supports both store types:
 *  - OIDC stores (BLOB_STORE_ID + BLOB_WEBHOOK_PUBLIC_KEY): presigned PUT URLs
 *  - legacy stores (BLOB_READ_WRITE_TOKEN): client tokens
 */
export async function POST(request: Request) {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = (await request.json()) as HandleUploadBody | HandleUploadPresignedBody;

  try {
    if (body.type === "blob.generate-presigned-url" && getUploadMode() === "presigned") {
      const result = await handleUploadPresigned({
        body: body as HandleUploadPresignedBody,
        request,
        getSignedToken: async (pathname) => ({
          token: await issueSignedToken({
            pathname,
            operations: ["put"],
            allowedContentTypes: ALLOWED_TYPES,
            maximumSizeInBytes: MAX_BYTES,
            validUntil: Date.now() + 10 * 60_000,
          }),
          urlOptions: { allowedContentTypes: ALLOWED_TYPES, maximumSizeInBytes: MAX_BYTES, addRandomSuffix: true },
        }),
      });
      return NextResponse.json(result);
    }

    if (body.type === "blob.generate-client-token" && getUploadMode() === "token") {
      const result = await handleUpload({
        body: body as HandleUploadBody,
        request,
        onBeforeGenerateToken: async () => ({
          allowedContentTypes: ALLOWED_TYPES,
          maximumSizeInBytes: MAX_BYTES,
          addRandomSuffix: true,
        }),
      });
      return NextResponse.json(result);
    }

    return NextResponse.json({ error: "Image uploads are not configured (Vercel Blob)." }, { status: 400 });
  } catch (error) {
    console.error("[upload] Failed:", error);
    const message = error instanceof Error ? error.message : "Upload failed";
    return NextResponse.json({ error: message }, { status: 400 });
  }
}
