import { reportStorageInterface } from "@/interfaces/reportStorageInterface";

const REMARK_FIELDS = [
  "attitudeRemarks",
  "tasksExecRemarks",
  "contactRemarks",
  "opinionRemarks",
  "advicesRemarks",
  "considerCandidatesRemarks",
] as const;

export function migrateReportStorage(data: Record<string, unknown>): reportStorageInterface {
  const migrated: Record<string, unknown> = { ...data };

  for (const field of REMARK_FIELDS) {
    const value = migrated[field];
    if (typeof value !== "string") continue;

    if (value === "") {
      delete migrated[field];
      continue;
    }
    migrated[field] = [value];
    migrated[`${field}Selected`] = 0;
  }

  return migrated as reportStorageInterface;
}
