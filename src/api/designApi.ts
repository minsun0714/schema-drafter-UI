const BASE_URL = import.meta.env.VITE_API_BASE_URL ?? '';

export interface DesignDocumentResponse {
  requirementsMarkdown: string;
  analysis: Record<string, unknown>;
  schema: Record<string, unknown>;
}

/**
 * POST /api/v1/design/document/requirements
 * Returns a Blob (text/markdown) for download.
 */
export async function fetchRequirementsMarkdown(file: File): Promise<Blob> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/v1/design/document/requirements`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`요청 실패 (${response.status}): ${text}`);
  }

  return response.blob();
}

/**
 * POST /api/v1/design/document
 * Returns DB design JSON.
 */
export async function fetchDesignDocument(file: File): Promise<DesignDocumentResponse> {
  const formData = new FormData();
  formData.append('file', file);

  const response = await fetch(`${BASE_URL}/api/v1/design/document`, {
    method: 'POST',
    body: formData,
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`요청 실패 (${response.status}): ${text}`);
  }

  return response.json() as Promise<DesignDocumentResponse>;
}
