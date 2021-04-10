import { validationUtils } from "./deps.ts";
import { jsonSchema } from "./generated.ts";
import type { V1AdmissionReview } from "./generated.ts";
import { admissionReviewRequestObjectPodSchema } from "./schemas.ts";

export const validateV1AdmissionReview = validationUtils
  .createDefinitionValidator<
    V1AdmissionReview
  >({
    schema: jsonSchema,
    definition: "v1.AdmissionReview",
    options: {
      formats: {
        byte: {
          type: "number",
          validate: (x: number) => x >= 0 && x <= 255 && x % 1 == 0,
        },
        int32: {
          type: "number",
          validate: () => true,
        },
        int64: {
          type: "number",
          validate: () => true,
        },
      },
    },
  });

export const validateV1Pod = validationUtils.createValidator(
  admissionReviewRequestObjectPodSchema,
);
