export const runIfMSClarityEnabled = (callback: (projectId: string) => void) => {
  const projectId = process.env.NEXT_PUBLIC_MS_CLARITY_PROJECT_ID;
  if (projectId) {
    callback(projectId);
  }
};
