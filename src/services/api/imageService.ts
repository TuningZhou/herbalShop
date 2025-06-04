// ... existing code ...
import { R2_IMAGE_HANDLER_URL } from '@/config/env';

export async function uploadImage(file: File, objectName: string): Promise<void> {
  const response = await fetch(`${R2_IMAGE_HANDLER_URL}/${objectName}`, {
    method: 'PUT',
// ... existing code ...
  });
}
export function getImageUrl(objectName: string): string {
    return `${R2_IMAGE_HANDLER_URL}/${objectName}`;
}
