export interface DeveloperDriveFile {
  courseSlug: string;
  fileName: string;
  fileId: string;
}

export const DEVELOPER_DRIVE_FILES: Record<string, DeveloperDriveFile> = {
  'api-development-fundamentals': {
    courseSlug: 'api-development-fundamentals',
    fileName: '08_api-development-fundamentals.pdf',
    fileId: '1j_7vahBG1ICXM0HMVNTOPbiQGkhsLHgA',
  },
  'database-design-best-practices': {
    courseSlug: 'database-design-best-practices',
    fileName: '07_database-design-best-practices.pdf',
    fileId: '128Uz3Ocx4-JTcuruIN4WuQWC-qt_3bWR',
  },
  'javascript-interview-prep': {
    courseSlug: 'javascript-interview-prep',
    fileName: '04_javascript-interview-prep.pdf',
    fileId: '12zK7Uvu4zexiOPSZA0Izuyi7SJ3etAxb',
  },
  'portfolio-website-template': {
    courseSlug: 'portfolio-website-template',
    fileName: '03_portfolio-website-template.pdf',
    fileId: '1H2Hz5wdhj6jkDQMgLnMhrqVoDh23i0Wq',
  },
  'react-components-library': {
    courseSlug: 'react-components-library',
    fileName: '02_react-components-library.pdf',
    fileId: '1V-MejQ7aNKlZjrYUcvL__2UzDY2xGXeb',
  },
  'seo-checklist-for-developers': {
    courseSlug: 'seo-checklist-for-developers',
    fileName: '05_seo-checklist-developers.pdf',
    fileId: '1tkw9pTlYChN7MHXyR7e7_HtzdPTv0AWN',
  },
  'ui-ux-design-system': {
    courseSlug: 'ui-ux-design-system',
    fileName: '06_ui-ux-design-system.pdf',
    fileId: '1vmvq_-OiZtYq420z402xDrw14h61aXdi',
  },
  'web-development-roadmap-2026': {
    courseSlug: 'web-development-roadmap-2026',
    fileName: '01_web-dev-roadmap-2026.pdf',
    fileId: '1cDnsMrv_PR-hyHDOHe4GKlotp5Te3vt4',
  },
};

export function getDeveloperFileByCourseSlug(courseSlug: string): DeveloperDriveFile | null {
  return DEVELOPER_DRIVE_FILES[courseSlug] || null;
}

export function buildDrivePreviewUrl(fileId: string): string {
  return `https://drive.google.com/file/d/${fileId}/preview`;
}

export function buildDriveDownloadUrl(fileId: string): string {
  return `https://drive.google.com/uc?export=download&id=${fileId}`;
}
