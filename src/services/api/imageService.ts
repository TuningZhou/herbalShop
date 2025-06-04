import { R2_IMAGE_HANDLER_URL } from '@/config/env';

// 上传图片到R2存储桶
export async function uploadImage(file: File, objectName: string): Promise<string> {
  try {
    const response = await fetch(`${R2_IMAGE_HANDLER_URL}/${objectName}`, {
      method: 'PUT',
      body: file,
      headers: {
        'Content-Type': file.type,
      },
    });

    if (!response.ok) {
      throw new Error(`上传失败: ${response.status} ${response.statusText}`);
    }

    // 返回可访问的图片URL
    return getImageUrl(objectName);
  } catch (error) {
    console.error('图片上传错误:', error);
    throw error;
  }
}

// 获取图片URL
export function getImageUrl(objectName: string): string {
  if (!objectName) return '';
  return `${R2_IMAGE_HANDLER_URL}/${objectName}`;
}

// 删除R2存储桶中的图片
export async function deleteImage(objectName: string): Promise<void> {
  try {
    const response = await fetch(`${R2_IMAGE_HANDLER_URL}/${objectName}`, {
      method: 'DELETE',
    });

    if (!response.ok) {
      throw new Error(`删除失败: ${response.status} ${response.statusText}`);
    }
  } catch (error) {
    console.error('图片删除错误:', error);
    throw error;
  }
}