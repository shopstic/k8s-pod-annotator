/**
 * RawExtension is used to hold extensions in external versions.
 *
 * To use this, make a field which has RawExtension as its type in your external, versioned struct, and Object in your internal struct. You also need to register your various plugin types.
 *
 * // Internal package: type MyAPIObject struct {
 * 	runtime.TypeMeta `json:",inline"`
 * 	MyPlugin runtime.Object `json:"myPlugin"`
 * } type PluginA struct {
 * 	AOption string `json:"aOption"`
 * }
 *
 * // External package: type MyAPIObject struct {
 * 	runtime.TypeMeta `json:",inline"`
 * 	MyPlugin runtime.RawExtension `json:"myPlugin"`
 * } type PluginA struct {
 * 	AOption string `json:"aOption"`
 * }
 *
 * // On the wire, the JSON will look something like this: {
 * 	"kind":"MyAPIObject",
 * 	"apiVersion":"v1",
 * 	"myPlugin": {
 * 		"kind":"PluginA",
 * 		"aOption":"foo",
 * 	},
 * }
 *
 * So what happens? Decode first uses json or yaml to unmarshal the serialized data into your external MyAPIObject. That causes the raw JSON to be stored, but not unpacked. The next step is to copy (using pkg/conversion) into the internal struct. The runtime package's DefaultScheme has conversion functions installed which will unpack the JSON stored in RawExtension, turning it into the correct object type, and storing it in the Object. (TODO: In the case where the object is of an unknown type, a runtime.Unknown object will be created and stored.)
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "runtime.RawExtension".
 */
export interface RuntimeRawExtension {
  [k: string]: unknown;
}
/**
 * AdmissionRequest describes the admission.Attributes for the admission request.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.AdmissionRequest".
 */
export interface V1AdmissionRequest {
  /**
   * DryRun indicates that modifications will definitely not be persisted for this request. Defaults to false.
   */
  dryRun?: boolean;
  /**
   * Kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale)
   */
  kind: {
    group: string;
    kind: string;
    version: string;
    [k: string]: unknown;
  };
  /**
   * Name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and rely on the server to generate the name.  If that is the case, this field will contain an empty string.
   */
  name?: string;
  /**
   * Namespace is the namespace associated with the request (if any).
   */
  namespace?: string;
  /**
   * Object is the object from the incoming request.
   */
  object?: {
    [k: string]: unknown;
  };
  /**
   * OldObject is the existing object. Only populated for DELETE and UPDATE requests.
   */
  oldObject?: {
    [k: string]: unknown;
  };
  /**
   * Operation is the operation being performed. This may be different than the operation requested. e.g. a patch can result in either a CREATE or UPDATE Operation.
   */
  operation: string;
  /**
   * Options is the operation option structure of the operation being performed. e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be different than the options the caller provided. e.g. for a patch request the performed Operation might be a CREATE, in which case the Options will a `meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`.
   */
  options?: {
    [k: string]: unknown;
  };
  /**
   * RequestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale). If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.
   *
   * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for), and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).
   *
   * See documentation for the "matchPolicy" field in the webhook configuration type for more details.
   */
  requestKind?: {
    group: string;
    kind: string;
    version: string;
    [k: string]: unknown;
  };
  /**
   * RequestResource is the fully-qualified resource of the original API request (for example, v1.pods). If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.
   *
   * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for), and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).
   *
   * See documentation for the "matchPolicy" field in the webhook configuration type.
   */
  requestResource?: {
    group: string;
    resource: string;
    version: string;
    [k: string]: unknown;
  };
  /**
   * RequestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale") If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed. See documentation for the "matchPolicy" field in the webhook configuration type.
   */
  requestSubResource?: string;
  /**
   * Resource is the fully-qualified resource being requested (for example, v1.pods)
   */
  resource: {
    group: string;
    resource: string;
    version: string;
    [k: string]: unknown;
  };
  /**
   * SubResource is the subresource being requested, if any (for example, "status" or "scale")
   */
  subResource?: string;
  /**
   * UID is an identifier for the individual request/response. It allows us to distinguish instances of requests which are otherwise identical (parallel requests, requests when earlier requests did not modify etc) The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request. It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging.
   */
  uid: string;
  /**
   * UserInfo is information about the requesting user
   */
  userInfo: {
    /**
     * Any additional information provided by the authenticator.
     */
    extra?: {
      [k: string]: string[];
    };
    /**
     * The names of groups this user is a part of.
     */
    groups?: string[];
    /**
     * A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.
     */
    uid?: string;
    /**
     * The name that uniquely identifies this user among all active users.
     */
    username?: string;
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * AdmissionResponse describes an admission response.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.AdmissionResponse".
 */
export interface V1AdmissionResponse {
  /**
   * Allowed indicates whether or not the admission request was permitted.
   */
  allowed: boolean;
  /**
   * AuditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted). MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by the admission webhook to add additional context to the audit log for this request.
   */
  auditAnnotations?: {
    [k: string]: string;
  };
  /**
   * The patch body. Currently we only support "JSONPatch" which implements RFC 6902.
   */
  patch?: string;
  /**
   * The type of Patch. Currently we only allow "JSONPatch".
   */
  patchType?: string;
  /**
   * Result contains extra details into why an admission request was denied. This field IS NOT consulted in any way if "Allowed" is "true".
   */
  status?: {
    /**
     * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
     */
    apiVersion?: string;
    /**
     * Suggested HTTP return code for this status, 0 if not set.
     */
    code?: number;
    /**
     * Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.
     */
    details?: {
      /**
       * The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
       */
      causes?: V1StatusCause[];
      /**
       * The group attribute of the resource associated with the status StatusReason.
       */
      group?: string;
      /**
       * The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
       */
      kind?: string;
      /**
       * The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
       */
      name?: string;
      /**
       * If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.
       */
      retryAfterSeconds?: number;
      /**
       * UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
       */
      uid?: string;
      [k: string]: unknown;
    };
    /**
     * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    kind?: string;
    /**
     * A human-readable description of the status of this operation.
     */
    message?: string;
    /**
     * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    metadata?: {
      /**
       * continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
       */
      continue?: string;
      /**
       * remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
       */
      remainingItemCount?: number;
      /**
       * String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
       */
      resourceVersion?: string;
      /**
       * selfLink is a URL representing this object. Populated by the system. Read-only.
       *
       * DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
       */
      selfLink?: string;
      [k: string]: unknown;
    };
    /**
     * A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.
     */
    reason?: string;
    /**
     * Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
     */
    status?: string;
    [k: string]: unknown;
  };
  /**
   * UID is an identifier for the individual request/response. This must be copied over from the corresponding AdmissionRequest.
   */
  uid: string;
  /**
   * warnings is a list of warning messages to return to the requesting API client. Warning messages describe a problem the client making the API request should correct or be aware of. Limit warnings to 120 characters if possible. Warnings over 256 characters and large numbers of warnings may be truncated.
   */
  warnings?: string[];
  [k: string]: unknown;
}
/**
 * StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.StatusCause".
 */
export interface V1StatusCause {
  /**
   * The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.
   *
   * Examples:
   *   "name" - the field "name" on the current resource
   *   "items[0].name" - the field "name" on the first array entry in "items"
   */
  field?: string;
  /**
   * A human-readable description of the cause of the error.  This field may be presented as-is to a reader.
   */
  message?: string;
  /**
   * A machine-readable description of the cause of the error. If this value is empty there is no information available.
   */
  reason?: string;
  [k: string]: unknown;
}
/**
 * AdmissionReview describes an admission review request/response.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.AdmissionReview".
 */
export interface V1AdmissionReview {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: string;
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  /**
   * Request describes the attributes for the admission request.
   */
  request?: {
    /**
     * DryRun indicates that modifications will definitely not be persisted for this request. Defaults to false.
     */
    dryRun?: boolean;
    /**
     * Kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale)
     */
    kind: {
      group: string;
      kind: string;
      version: string;
      [k: string]: unknown;
    };
    /**
     * Name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and rely on the server to generate the name.  If that is the case, this field will contain an empty string.
     */
    name?: string;
    /**
     * Namespace is the namespace associated with the request (if any).
     */
    namespace?: string;
    /**
     * Object is the object from the incoming request.
     */
    object?: {
      [k: string]: unknown;
    };
    /**
     * OldObject is the existing object. Only populated for DELETE and UPDATE requests.
     */
    oldObject?: {
      [k: string]: unknown;
    };
    /**
     * Operation is the operation being performed. This may be different than the operation requested. e.g. a patch can result in either a CREATE or UPDATE Operation.
     */
    operation: string;
    /**
     * Options is the operation option structure of the operation being performed. e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be different than the options the caller provided. e.g. for a patch request the performed Operation might be a CREATE, in which case the Options will a `meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`.
     */
    options?: {
      [k: string]: unknown;
    };
    /**
     * RequestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale). If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.
     *
     * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for), and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).
     *
     * See documentation for the "matchPolicy" field in the webhook configuration type for more details.
     */
    requestKind?: {
      group: string;
      kind: string;
      version: string;
      [k: string]: unknown;
    };
    /**
     * RequestResource is the fully-qualified resource of the original API request (for example, v1.pods). If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.
     *
     * For example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for), and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).
     *
     * See documentation for the "matchPolicy" field in the webhook configuration type.
     */
    requestResource?: {
      group: string;
      resource: string;
      version: string;
      [k: string]: unknown;
    };
    /**
     * RequestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale") If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed. See documentation for the "matchPolicy" field in the webhook configuration type.
     */
    requestSubResource?: string;
    /**
     * Resource is the fully-qualified resource being requested (for example, v1.pods)
     */
    resource: {
      group: string;
      resource: string;
      version: string;
      [k: string]: unknown;
    };
    /**
     * SubResource is the subresource being requested, if any (for example, "status" or "scale")
     */
    subResource?: string;
    /**
     * UID is an identifier for the individual request/response. It allows us to distinguish instances of requests which are otherwise identical (parallel requests, requests when earlier requests did not modify etc) The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request. It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging.
     */
    uid: string;
    /**
     * UserInfo is information about the requesting user
     */
    userInfo: {
      /**
       * Any additional information provided by the authenticator.
       */
      extra?: {
        [k: string]: string[];
      };
      /**
       * The names of groups this user is a part of.
       */
      groups?: string[];
      /**
       * A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.
       */
      uid?: string;
      /**
       * The name that uniquely identifies this user among all active users.
       */
      username?: string;
      [k: string]: unknown;
    };
    [k: string]: unknown;
  };
  /**
   * Response describes the attributes for the admission response.
   */
  response?: {
    /**
     * Allowed indicates whether or not the admission request was permitted.
     */
    allowed: boolean;
    /**
     * AuditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted). MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by the admission webhook to add additional context to the audit log for this request.
     */
    auditAnnotations?: {
      [k: string]: string;
    };
    /**
     * The patch body. Currently we only support "JSONPatch" which implements RFC 6902.
     */
    patch?: string;
    /**
     * The type of Patch. Currently we only allow "JSONPatch".
     */
    patchType?: string;
    /**
     * Result contains extra details into why an admission request was denied. This field IS NOT consulted in any way if "Allowed" is "true".
     */
    status?: {
      /**
       * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
       */
      apiVersion?: string;
      /**
       * Suggested HTTP return code for this status, 0 if not set.
       */
      code?: number;
      /**
       * Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.
       */
      details?: {
        /**
         * The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
         */
        causes?: V1StatusCause[];
        /**
         * The group attribute of the resource associated with the status StatusReason.
         */
        group?: string;
        /**
         * The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
         */
        kind?: string;
        /**
         * The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
         */
        name?: string;
        /**
         * If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.
         */
        retryAfterSeconds?: number;
        /**
         * UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
         */
        uid?: string;
        [k: string]: unknown;
      };
      /**
       * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
       */
      kind?: string;
      /**
       * A human-readable description of the status of this operation.
       */
      message?: string;
      /**
       * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
       */
      metadata?: {
        /**
         * continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
         */
        continue?: string;
        /**
         * remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
         */
        remainingItemCount?: number;
        /**
         * String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
         */
        resourceVersion?: string;
        /**
         * selfLink is a URL representing this object. Populated by the system. Read-only.
         *
         * DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
         */
        selfLink?: string;
        [k: string]: unknown;
      };
      /**
       * A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.
       */
      reason?: string;
      /**
       * Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
       */
      status?: string;
      [k: string]: unknown;
    };
    /**
     * UID is an identifier for the individual request/response. This must be copied over from the corresponding AdmissionRequest.
     */
    uid: string;
    /**
     * warnings is a list of warning messages to return to the requesting API client. Warning messages describe a problem the client making the API request should correct or be aware of. Limit warnings to 120 characters if possible. Warnings over 256 characters and large numbers of warnings may be truncated.
     */
    warnings?: string[];
    [k: string]: unknown;
  };
  [k: string]: unknown;
}
/**
 * GroupVersionKind unambiguously identifies a kind.  It doesn't anonymously include GroupVersion to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.GroupVersionKind".
 */
export interface V1GroupVersionKind {
  group: string;
  kind: string;
  version: string;
  [k: string]: unknown;
}
/**
 * GroupVersionResource unambiguously identifies a resource.  It doesn't anonymously include GroupVersion to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.GroupVersionResource".
 */
export interface V1GroupVersionResource {
  group: string;
  resource: string;
  version: string;
  [k: string]: unknown;
}
/**
 * ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.ListMeta".
 */
export interface V1ListMeta {
  /**
   * continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
   */
  continue?: string;
  /**
   * remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
   */
  remainingItemCount?: number;
  /**
   * String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
   */
  resourceVersion?: string;
  /**
   * selfLink is a URL representing this object. Populated by the system. Read-only.
   *
   * DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
   */
  selfLink?: string;
  [k: string]: unknown;
}
/**
 * Status is a return value for calls that don't return other objects.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.Status".
 */
export interface V1Status {
  /**
   * APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources
   */
  apiVersion?: string;
  /**
   * Suggested HTTP return code for this status, 0 if not set.
   */
  code?: number;
  /**
   * Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.
   */
  details?: {
    /**
     * The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
     */
    causes?: V1StatusCause[];
    /**
     * The group attribute of the resource associated with the status StatusReason.
     */
    group?: string;
    /**
     * The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
     */
    kind?: string;
    /**
     * The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
     */
    name?: string;
    /**
     * If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.
     */
    retryAfterSeconds?: number;
    /**
     * UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
     */
    uid?: string;
    [k: string]: unknown;
  };
  /**
   * Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  /**
   * A human-readable description of the status of this operation.
   */
  message?: string;
  /**
   * Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  metadata?: {
    /**
     * continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.
     */
    continue?: string;
    /**
     * remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.
     */
    remainingItemCount?: number;
    /**
     * String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency
     */
    resourceVersion?: string;
    /**
     * selfLink is a URL representing this object. Populated by the system. Read-only.
     *
     * DEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.
     */
    selfLink?: string;
    [k: string]: unknown;
  };
  /**
   * A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.
   */
  reason?: string;
  /**
   * Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status
   */
  status?: string;
  [k: string]: unknown;
}
/**
 * StatusDetails is a set of additional properties that MAY be set by the server to provide additional information about a response. The Reason field of a Status object defines what attributes will be set. Clients must ignore fields that do not match the defined type of each attribute, and should assume that any attribute may be empty, invalid, or under defined.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.StatusDetails".
 */
export interface V1StatusDetails {
  /**
   * The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.
   */
  causes?: V1StatusCause[];
  /**
   * The group attribute of the resource associated with the status StatusReason.
   */
  group?: string;
  /**
   * The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds
   */
  kind?: string;
  /**
   * The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).
   */
  name?: string;
  /**
   * If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.
   */
  retryAfterSeconds?: number;
  /**
   * UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids
   */
  uid?: string;
  [k: string]: unknown;
}
/**
 * UserInfo holds the information about the user needed to implement the user.Info interface.
 *
 * This interface was referenced by `undefined`'s JSON-Schema
 * via the `definition` "v1.UserInfo".
 */
export interface V1UserInfo {
  /**
   * Any additional information provided by the authenticator.
   */
  extra?: {
    [k: string]: string[];
  };
  /**
   * The names of groups this user is a part of.
   */
  groups?: string[];
  /**
   * A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.
   */
  uid?: string;
  /**
   * The name that uniquely identifies this user among all active users.
   */
  username?: string;
  [k: string]: unknown;
}

export const jsonSchema = {
  "definitions": {
    "runtime.RawExtension": {
      "description":
        'RawExtension is used to hold extensions in external versions.\n\nTo use this, make a field which has RawExtension as its type in your external, versioned struct, and Object in your internal struct. You also need to register your various plugin types.\n\n// Internal package: type MyAPIObject struct {\n\truntime.TypeMeta `json:",inline"`\n\tMyPlugin runtime.Object `json:"myPlugin"`\n} type PluginA struct {\n\tAOption string `json:"aOption"`\n}\n\n// External package: type MyAPIObject struct {\n\truntime.TypeMeta `json:",inline"`\n\tMyPlugin runtime.RawExtension `json:"myPlugin"`\n} type PluginA struct {\n\tAOption string `json:"aOption"`\n}\n\n// On the wire, the JSON will look something like this: {\n\t"kind":"MyAPIObject",\n\t"apiVersion":"v1",\n\t"myPlugin": {\n\t\t"kind":"PluginA",\n\t\t"aOption":"foo",\n\t},\n}\n\nSo what happens? Decode first uses json or yaml to unmarshal the serialized data into your external MyAPIObject. That causes the raw JSON to be stored, but not unpacked. The next step is to copy (using pkg/conversion) into the internal struct. The runtime package\'s DefaultScheme has conversion functions installed which will unpack the JSON stored in RawExtension, turning it into the correct object type, and storing it in the Object. (TODO: In the case where the object is of an unknown type, a runtime.Unknown object will be created and stored.)',
      "type": "object",
      "required": [],
      "additionalProperties": true,
    },
    "v1.AdmissionRequest": {
      "description":
        "AdmissionRequest describes the admission.Attributes for the admission request.",
      "type": "object",
      "required": [
        "uid",
        "kind",
        "resource",
        "operation",
        "userInfo",
      ],
      "properties": {
        "dryRun": {
          "description":
            "DryRun indicates that modifications will definitely not be persisted for this request. Defaults to false.",
          "type": "boolean",
        },
        "kind": {
          "description":
            "Kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale)",
          "type": "object",
          "required": [
            "group",
            "version",
            "kind",
          ],
          "properties": {
            "group": {
              "type": "string",
            },
            "kind": {
              "type": "string",
            },
            "version": {
              "type": "string",
            },
          },
          "additionalProperties": true,
        },
        "name": {
          "description":
            "Name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and rely on the server to generate the name.  If that is the case, this field will contain an empty string.",
          "type": "string",
        },
        "namespace": {
          "description":
            "Namespace is the namespace associated with the request (if any).",
          "type": "string",
        },
        "object": {
          "description": "Object is the object from the incoming request.",
          "type": "object",
          "required": [],
          "additionalProperties": true,
        },
        "oldObject": {
          "description":
            "OldObject is the existing object. Only populated for DELETE and UPDATE requests.",
          "type": "object",
          "required": [],
          "additionalProperties": true,
        },
        "operation": {
          "description":
            "Operation is the operation being performed. This may be different than the operation requested. e.g. a patch can result in either a CREATE or UPDATE Operation.",
          "type": "string",
        },
        "options": {
          "description":
            "Options is the operation option structure of the operation being performed. e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be different than the options the caller provided. e.g. for a patch request the performed Operation might be a CREATE, in which case the Options will a `meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`.",
          "type": "object",
          "required": [],
          "additionalProperties": true,
        },
        "requestKind": {
          "description":
            'RequestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale). If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.\n\nFor example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for), and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).\n\nSee documentation for the "matchPolicy" field in the webhook configuration type for more details.',
          "type": "object",
          "required": [
            "group",
            "version",
            "kind",
          ],
          "properties": {
            "group": {
              "type": "string",
            },
            "kind": {
              "type": "string",
            },
            "version": {
              "type": "string",
            },
          },
          "additionalProperties": true,
        },
        "requestResource": {
          "description":
            'RequestResource is the fully-qualified resource of the original API request (for example, v1.pods). If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.\n\nFor example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for), and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).\n\nSee documentation for the "matchPolicy" field in the webhook configuration type.',
          "type": "object",
          "required": [
            "group",
            "version",
            "resource",
          ],
          "properties": {
            "group": {
              "type": "string",
            },
            "resource": {
              "type": "string",
            },
            "version": {
              "type": "string",
            },
          },
          "additionalProperties": true,
        },
        "requestSubResource": {
          "description":
            'RequestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale") If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed. See documentation for the "matchPolicy" field in the webhook configuration type.',
          "type": "string",
        },
        "resource": {
          "description":
            "Resource is the fully-qualified resource being requested (for example, v1.pods)",
          "type": "object",
          "required": [
            "group",
            "version",
            "resource",
          ],
          "properties": {
            "group": {
              "type": "string",
            },
            "resource": {
              "type": "string",
            },
            "version": {
              "type": "string",
            },
          },
          "additionalProperties": true,
        },
        "subResource": {
          "description":
            'SubResource is the subresource being requested, if any (for example, "status" or "scale")',
          "type": "string",
        },
        "uid": {
          "description":
            "UID is an identifier for the individual request/response. It allows us to distinguish instances of requests which are otherwise identical (parallel requests, requests when earlier requests did not modify etc) The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request. It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging.",
          "type": "string",
        },
        "userInfo": {
          "description": "UserInfo is information about the requesting user",
          "type": "object",
          "properties": {
            "extra": {
              "description":
                "Any additional information provided by the authenticator.",
              "type": "object",
              "additionalProperties": {
                "type": "array",
                "items": {
                  "type": "string",
                },
                "minItems": 0,
              },
              "required": [],
            },
            "groups": {
              "description": "The names of groups this user is a part of.",
              "type": "array",
              "items": {
                "type": "string",
              },
              "minItems": 0,
            },
            "uid": {
              "description":
                "A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.",
              "type": "string",
            },
            "username": {
              "description":
                "The name that uniquely identifies this user among all active users.",
              "type": "string",
            },
          },
          "required": [],
          "additionalProperties": true,
        },
      },
      "additionalProperties": true,
    },
    "v1.AdmissionResponse": {
      "description": "AdmissionResponse describes an admission response.",
      "type": "object",
      "required": [
        "uid",
        "allowed",
      ],
      "properties": {
        "allowed": {
          "description":
            "Allowed indicates whether or not the admission request was permitted.",
          "type": "boolean",
        },
        "auditAnnotations": {
          "description":
            "AuditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted). MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by the admission webhook to add additional context to the audit log for this request.",
          "type": "object",
          "additionalProperties": {
            "type": "string",
          },
          "required": [],
        },
        "patch": {
          "description":
            'The patch body. Currently we only support "JSONPatch" which implements RFC 6902.',
          "type": "string",
          "format": "byte",
        },
        "patchType": {
          "description":
            'The type of Patch. Currently we only allow "JSONPatch".',
          "type": "string",
        },
        "status": {
          "description":
            'Result contains extra details into why an admission request was denied. This field IS NOT consulted in any way if "Allowed" is "true".',
          "type": "object",
          "properties": {
            "apiVersion": {
              "description":
                "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
              "type": "string",
            },
            "code": {
              "description":
                "Suggested HTTP return code for this status, 0 if not set.",
              "type": "integer",
              "format": "int32",
            },
            "details": {
              "description":
                "Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.",
              "type": "object",
              "properties": {
                "causes": {
                  "description":
                    "The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.",
                  "type": "array",
                  "items": {
                    "description":
                      "StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.",
                    "type": "object",
                    "properties": {
                      "field": {
                        "description":
                          'The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.\n\nExamples:\n  "name" - the field "name" on the current resource\n  "items[0].name" - the field "name" on the first array entry in "items"',
                        "type": "string",
                      },
                      "message": {
                        "description":
                          "A human-readable description of the cause of the error.  This field may be presented as-is to a reader.",
                        "type": "string",
                      },
                      "reason": {
                        "description":
                          "A machine-readable description of the cause of the error. If this value is empty there is no information available.",
                        "type": "string",
                      },
                    },
                    "required": [],
                    "additionalProperties": true,
                  },
                  "minItems": 0,
                },
                "group": {
                  "description":
                    "The group attribute of the resource associated with the status StatusReason.",
                  "type": "string",
                },
                "kind": {
                  "description":
                    "The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                  "type": "string",
                },
                "name": {
                  "description":
                    "The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).",
                  "type": "string",
                },
                "retryAfterSeconds": {
                  "description":
                    "If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.",
                  "type": "integer",
                  "format": "int32",
                },
                "uid": {
                  "description":
                    "UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                  "type": "string",
                },
              },
              "required": [],
              "additionalProperties": true,
            },
            "kind": {
              "description":
                "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
              "type": "string",
            },
            "message": {
              "description":
                "A human-readable description of the status of this operation.",
              "type": "string",
            },
            "metadata": {
              "description":
                "Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
              "type": "object",
              "properties": {
                "continue": {
                  "description":
                    "continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.",
                  "type": "string",
                },
                "remainingItemCount": {
                  "description":
                    "remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.",
                  "type": "integer",
                  "format": "int64",
                },
                "resourceVersion": {
                  "description":
                    "String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
                  "type": "string",
                },
                "selfLink": {
                  "description":
                    "selfLink is a URL representing this object. Populated by the system. Read-only.\n\nDEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.",
                  "type": "string",
                },
              },
              "required": [],
              "additionalProperties": true,
            },
            "reason": {
              "description":
                'A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.',
              "type": "string",
            },
            "status": {
              "description":
                'Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status',
              "type": "string",
            },
          },
          "required": [],
          "additionalProperties": true,
        },
        "uid": {
          "description":
            "UID is an identifier for the individual request/response. This must be copied over from the corresponding AdmissionRequest.",
          "type": "string",
        },
        "warnings": {
          "description":
            "warnings is a list of warning messages to return to the requesting API client. Warning messages describe a problem the client making the API request should correct or be aware of. Limit warnings to 120 characters if possible. Warnings over 256 characters and large numbers of warnings may be truncated.",
          "type": "array",
          "items": {
            "type": "string",
          },
          "minItems": 0,
        },
      },
      "additionalProperties": true,
    },
    "v1.AdmissionReview": {
      "description":
        "AdmissionReview describes an admission review request/response.",
      "type": "object",
      "properties": {
        "apiVersion": {
          "description":
            "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
          "type": "string",
        },
        "kind": {
          "description":
            "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
          "type": "string",
        },
        "request": {
          "description":
            "Request describes the attributes for the admission request.",
          "type": "object",
          "required": [
            "uid",
            "kind",
            "resource",
            "operation",
            "userInfo",
          ],
          "properties": {
            "dryRun": {
              "description":
                "DryRun indicates that modifications will definitely not be persisted for this request. Defaults to false.",
              "type": "boolean",
            },
            "kind": {
              "description":
                "Kind is the fully-qualified type of object being submitted (for example, v1.Pod or autoscaling.v1.Scale)",
              "type": "object",
              "required": [
                "group",
                "version",
                "kind",
              ],
              "properties": {
                "group": {
                  "type": "string",
                },
                "kind": {
                  "type": "string",
                },
                "version": {
                  "type": "string",
                },
              },
              "additionalProperties": true,
            },
            "name": {
              "description":
                "Name is the name of the object as presented in the request.  On a CREATE operation, the client may omit name and rely on the server to generate the name.  If that is the case, this field will contain an empty string.",
              "type": "string",
            },
            "namespace": {
              "description":
                "Namespace is the namespace associated with the request (if any).",
              "type": "string",
            },
            "object": {
              "description": "Object is the object from the incoming request.",
              "type": "object",
              "required": [],
              "additionalProperties": true,
            },
            "oldObject": {
              "description":
                "OldObject is the existing object. Only populated for DELETE and UPDATE requests.",
              "type": "object",
              "required": [],
              "additionalProperties": true,
            },
            "operation": {
              "description":
                "Operation is the operation being performed. This may be different than the operation requested. e.g. a patch can result in either a CREATE or UPDATE Operation.",
              "type": "string",
            },
            "options": {
              "description":
                "Options is the operation option structure of the operation being performed. e.g. `meta.k8s.io/v1.DeleteOptions` or `meta.k8s.io/v1.CreateOptions`. This may be different than the options the caller provided. e.g. for a patch request the performed Operation might be a CREATE, in which case the Options will a `meta.k8s.io/v1.CreateOptions` even though the caller provided `meta.k8s.io/v1.PatchOptions`.",
              "type": "object",
              "required": [],
              "additionalProperties": true,
            },
            "requestKind": {
              "description":
                'RequestKind is the fully-qualified type of the original API request (for example, v1.Pod or autoscaling.v1.Scale). If this is specified and differs from the value in "kind", an equivalent match and conversion was performed.\n\nFor example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `kind: {group:"apps", version:"v1", kind:"Deployment"}` (matching the rule the webhook registered for), and `requestKind: {group:"apps", version:"v1beta1", kind:"Deployment"}` (indicating the kind of the original API request).\n\nSee documentation for the "matchPolicy" field in the webhook configuration type for more details.',
              "type": "object",
              "required": [
                "group",
                "version",
                "kind",
              ],
              "properties": {
                "group": {
                  "type": "string",
                },
                "kind": {
                  "type": "string",
                },
                "version": {
                  "type": "string",
                },
              },
              "additionalProperties": true,
            },
            "requestResource": {
              "description":
                'RequestResource is the fully-qualified resource of the original API request (for example, v1.pods). If this is specified and differs from the value in "resource", an equivalent match and conversion was performed.\n\nFor example, if deployments can be modified via apps/v1 and apps/v1beta1, and a webhook registered a rule of `apiGroups:["apps"], apiVersions:["v1"], resources: ["deployments"]` and `matchPolicy: Equivalent`, an API request to apps/v1beta1 deployments would be converted and sent to the webhook with `resource: {group:"apps", version:"v1", resource:"deployments"}` (matching the resource the webhook registered for), and `requestResource: {group:"apps", version:"v1beta1", resource:"deployments"}` (indicating the resource of the original API request).\n\nSee documentation for the "matchPolicy" field in the webhook configuration type.',
              "type": "object",
              "required": [
                "group",
                "version",
                "resource",
              ],
              "properties": {
                "group": {
                  "type": "string",
                },
                "resource": {
                  "type": "string",
                },
                "version": {
                  "type": "string",
                },
              },
              "additionalProperties": true,
            },
            "requestSubResource": {
              "description":
                'RequestSubResource is the name of the subresource of the original API request, if any (for example, "status" or "scale") If this is specified and differs from the value in "subResource", an equivalent match and conversion was performed. See documentation for the "matchPolicy" field in the webhook configuration type.',
              "type": "string",
            },
            "resource": {
              "description":
                "Resource is the fully-qualified resource being requested (for example, v1.pods)",
              "type": "object",
              "required": [
                "group",
                "version",
                "resource",
              ],
              "properties": {
                "group": {
                  "type": "string",
                },
                "resource": {
                  "type": "string",
                },
                "version": {
                  "type": "string",
                },
              },
              "additionalProperties": true,
            },
            "subResource": {
              "description":
                'SubResource is the subresource being requested, if any (for example, "status" or "scale")',
              "type": "string",
            },
            "uid": {
              "description":
                "UID is an identifier for the individual request/response. It allows us to distinguish instances of requests which are otherwise identical (parallel requests, requests when earlier requests did not modify etc) The UID is meant to track the round trip (request/response) between the KAS and the WebHook, not the user request. It is suitable for correlating log entries between the webhook and apiserver, for either auditing or debugging.",
              "type": "string",
            },
            "userInfo": {
              "description":
                "UserInfo is information about the requesting user",
              "type": "object",
              "properties": {
                "extra": {
                  "description":
                    "Any additional information provided by the authenticator.",
                  "type": "object",
                  "additionalProperties": {
                    "type": "array",
                    "items": {
                      "type": "string",
                    },
                    "minItems": 0,
                  },
                  "required": [],
                },
                "groups": {
                  "description": "The names of groups this user is a part of.",
                  "type": "array",
                  "items": {
                    "type": "string",
                  },
                  "minItems": 0,
                },
                "uid": {
                  "description":
                    "A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.",
                  "type": "string",
                },
                "username": {
                  "description":
                    "The name that uniquely identifies this user among all active users.",
                  "type": "string",
                },
              },
              "required": [],
              "additionalProperties": true,
            },
          },
          "additionalProperties": true,
        },
        "response": {
          "description":
            "Response describes the attributes for the admission response.",
          "type": "object",
          "required": [
            "uid",
            "allowed",
          ],
          "properties": {
            "allowed": {
              "description":
                "Allowed indicates whether or not the admission request was permitted.",
              "type": "boolean",
            },
            "auditAnnotations": {
              "description":
                "AuditAnnotations is an unstructured key value map set by remote admission controller (e.g. error=image-blacklisted). MutatingAdmissionWebhook and ValidatingAdmissionWebhook admission controller will prefix the keys with admission webhook name (e.g. imagepolicy.example.com/error=image-blacklisted). AuditAnnotations will be provided by the admission webhook to add additional context to the audit log for this request.",
              "type": "object",
              "additionalProperties": {
                "type": "string",
              },
              "required": [],
            },
            "patch": {
              "description":
                'The patch body. Currently we only support "JSONPatch" which implements RFC 6902.',
              "type": "string",
              "format": "byte",
            },
            "patchType": {
              "description":
                'The type of Patch. Currently we only allow "JSONPatch".',
              "type": "string",
            },
            "status": {
              "description":
                'Result contains extra details into why an admission request was denied. This field IS NOT consulted in any way if "Allowed" is "true".',
              "type": "object",
              "properties": {
                "apiVersion": {
                  "description":
                    "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
                  "type": "string",
                },
                "code": {
                  "description":
                    "Suggested HTTP return code for this status, 0 if not set.",
                  "type": "integer",
                  "format": "int32",
                },
                "details": {
                  "description":
                    "Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.",
                  "type": "object",
                  "properties": {
                    "causes": {
                      "description":
                        "The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.",
                      "type": "array",
                      "items": {
                        "description":
                          "StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.",
                        "type": "object",
                        "properties": {
                          "field": {
                            "description":
                              'The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.\n\nExamples:\n  "name" - the field "name" on the current resource\n  "items[0].name" - the field "name" on the first array entry in "items"',
                            "type": "string",
                          },
                          "message": {
                            "description":
                              "A human-readable description of the cause of the error.  This field may be presented as-is to a reader.",
                            "type": "string",
                          },
                          "reason": {
                            "description":
                              "A machine-readable description of the cause of the error. If this value is empty there is no information available.",
                            "type": "string",
                          },
                        },
                        "required": [],
                        "additionalProperties": true,
                      },
                      "minItems": 0,
                    },
                    "group": {
                      "description":
                        "The group attribute of the resource associated with the status StatusReason.",
                      "type": "string",
                    },
                    "kind": {
                      "description":
                        "The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                      "type": "string",
                    },
                    "name": {
                      "description":
                        "The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).",
                      "type": "string",
                    },
                    "retryAfterSeconds": {
                      "description":
                        "If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.",
                      "type": "integer",
                      "format": "int32",
                    },
                    "uid": {
                      "description":
                        "UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
                      "type": "string",
                    },
                  },
                  "required": [],
                  "additionalProperties": true,
                },
                "kind": {
                  "description":
                    "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                  "type": "string",
                },
                "message": {
                  "description":
                    "A human-readable description of the status of this operation.",
                  "type": "string",
                },
                "metadata": {
                  "description":
                    "Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
                  "type": "object",
                  "properties": {
                    "continue": {
                      "description":
                        "continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.",
                      "type": "string",
                    },
                    "remainingItemCount": {
                      "description":
                        "remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.",
                      "type": "integer",
                      "format": "int64",
                    },
                    "resourceVersion": {
                      "description":
                        "String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
                      "type": "string",
                    },
                    "selfLink": {
                      "description":
                        "selfLink is a URL representing this object. Populated by the system. Read-only.\n\nDEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.",
                      "type": "string",
                    },
                  },
                  "required": [],
                  "additionalProperties": true,
                },
                "reason": {
                  "description":
                    'A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.',
                  "type": "string",
                },
                "status": {
                  "description":
                    'Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status',
                  "type": "string",
                },
              },
              "required": [],
              "additionalProperties": true,
            },
            "uid": {
              "description":
                "UID is an identifier for the individual request/response. This must be copied over from the corresponding AdmissionRequest.",
              "type": "string",
            },
            "warnings": {
              "description":
                "warnings is a list of warning messages to return to the requesting API client. Warning messages describe a problem the client making the API request should correct or be aware of. Limit warnings to 120 characters if possible. Warnings over 256 characters and large numbers of warnings may be truncated.",
              "type": "array",
              "items": {
                "type": "string",
              },
              "minItems": 0,
            },
          },
          "additionalProperties": true,
        },
      },
      "required": [],
      "additionalProperties": true,
    },
    "v1.GroupVersionKind": {
      "description":
        "GroupVersionKind unambiguously identifies a kind.  It doesn't anonymously include GroupVersion to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling",
      "type": "object",
      "required": [
        "group",
        "version",
        "kind",
      ],
      "properties": {
        "group": {
          "type": "string",
        },
        "kind": {
          "type": "string",
        },
        "version": {
          "type": "string",
        },
      },
      "additionalProperties": true,
    },
    "v1.GroupVersionResource": {
      "description":
        "GroupVersionResource unambiguously identifies a resource.  It doesn't anonymously include GroupVersion to avoid automatic coersion.  It doesn't use a GroupVersion to avoid custom marshalling",
      "type": "object",
      "required": [
        "group",
        "version",
        "resource",
      ],
      "properties": {
        "group": {
          "type": "string",
        },
        "resource": {
          "type": "string",
        },
        "version": {
          "type": "string",
        },
      },
      "additionalProperties": true,
    },
    "v1.ListMeta": {
      "description":
        "ListMeta describes metadata that synthetic resources must have, including lists and various status objects. A resource may have only one of {ObjectMeta, ListMeta}.",
      "type": "object",
      "properties": {
        "continue": {
          "description":
            "continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.",
          "type": "string",
        },
        "remainingItemCount": {
          "description":
            "remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.",
          "type": "integer",
          "format": "int64",
        },
        "resourceVersion": {
          "description":
            "String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
          "type": "string",
        },
        "selfLink": {
          "description":
            "selfLink is a URL representing this object. Populated by the system. Read-only.\n\nDEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.",
          "type": "string",
        },
      },
      "required": [],
      "additionalProperties": true,
    },
    "v1.Status": {
      "description":
        "Status is a return value for calls that don't return other objects.",
      "type": "object",
      "properties": {
        "apiVersion": {
          "description":
            "APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources",
          "type": "string",
        },
        "code": {
          "description":
            "Suggested HTTP return code for this status, 0 if not set.",
          "type": "integer",
          "format": "int32",
        },
        "details": {
          "description":
            "Extended data associated with the reason.  Each reason may define its own extended details. This field is optional and the data returned is not guaranteed to conform to any schema except that defined by the reason type.",
          "type": "object",
          "properties": {
            "causes": {
              "description":
                "The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.",
              "type": "array",
              "items": {
                "description":
                  "StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.",
                "type": "object",
                "properties": {
                  "field": {
                    "description":
                      'The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.\n\nExamples:\n  "name" - the field "name" on the current resource\n  "items[0].name" - the field "name" on the first array entry in "items"',
                    "type": "string",
                  },
                  "message": {
                    "description":
                      "A human-readable description of the cause of the error.  This field may be presented as-is to a reader.",
                    "type": "string",
                  },
                  "reason": {
                    "description":
                      "A machine-readable description of the cause of the error. If this value is empty there is no information available.",
                    "type": "string",
                  },
                },
                "required": [],
                "additionalProperties": true,
              },
              "minItems": 0,
            },
            "group": {
              "description":
                "The group attribute of the resource associated with the status StatusReason.",
              "type": "string",
            },
            "kind": {
              "description":
                "The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
              "type": "string",
            },
            "name": {
              "description":
                "The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).",
              "type": "string",
            },
            "retryAfterSeconds": {
              "description":
                "If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.",
              "type": "integer",
              "format": "int32",
            },
            "uid": {
              "description":
                "UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
              "type": "string",
            },
          },
          "required": [],
          "additionalProperties": true,
        },
        "kind": {
          "description":
            "Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
          "type": "string",
        },
        "message": {
          "description":
            "A human-readable description of the status of this operation.",
          "type": "string",
        },
        "metadata": {
          "description":
            "Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
          "type": "object",
          "properties": {
            "continue": {
              "description":
                "continue may be set if the user set a limit on the number of items returned, and indicates that the server has more data available. The value is opaque and may be used to issue another request to the endpoint that served this list to retrieve the next set of available objects. Continuing a consistent list may not be possible if the server configuration has changed or more than a few minutes have passed. The resourceVersion field returned when using this continue value will be identical to the value in the first response, unless you have received this token from an error message.",
              "type": "string",
            },
            "remainingItemCount": {
              "description":
                "remainingItemCount is the number of subsequent items in the list which are not included in this list response. If the list request contained label or field selectors, then the number of remaining items is unknown and the field will be left unset and omitted during serialization. If the list is complete (either because it is not chunking or because this is the last chunk), then there are no more remaining items and this field will be left unset and omitted during serialization. Servers older than v1.15 do not set this field. The intended use of the remainingItemCount is *estimating* the size of a collection. Clients should not rely on the remainingItemCount to be set or to be exact.",
              "type": "integer",
              "format": "int64",
            },
            "resourceVersion": {
              "description":
                "String that identifies the server's internal version of this object that can be used by clients to determine when objects have changed. Value must be treated as opaque by clients and passed unmodified back to the server. Populated by the system. Read-only. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#concurrency-control-and-consistency",
              "type": "string",
            },
            "selfLink": {
              "description":
                "selfLink is a URL representing this object. Populated by the system. Read-only.\n\nDEPRECATED Kubernetes will stop propagating this field in 1.20 release and the field is planned to be removed in 1.21 release.",
              "type": "string",
            },
          },
          "required": [],
          "additionalProperties": true,
        },
        "reason": {
          "description":
            'A machine-readable description of why this operation is in the "Failure" status. If this value is empty there is no information available. A Reason clarifies an HTTP status code but does not override it.',
          "type": "string",
        },
        "status": {
          "description":
            'Status of the operation. One of: "Success" or "Failure". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status',
          "type": "string",
        },
      },
      "required": [],
      "additionalProperties": true,
    },
    "v1.StatusCause": {
      "description":
        "StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.",
      "type": "object",
      "properties": {
        "field": {
          "description":
            'The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.\n\nExamples:\n  "name" - the field "name" on the current resource\n  "items[0].name" - the field "name" on the first array entry in "items"',
          "type": "string",
        },
        "message": {
          "description":
            "A human-readable description of the cause of the error.  This field may be presented as-is to a reader.",
          "type": "string",
        },
        "reason": {
          "description":
            "A machine-readable description of the cause of the error. If this value is empty there is no information available.",
          "type": "string",
        },
      },
      "required": [],
      "additionalProperties": true,
    },
    "v1.StatusDetails": {
      "description":
        "StatusDetails is a set of additional properties that MAY be set by the server to provide additional information about a response. The Reason field of a Status object defines what attributes will be set. Clients must ignore fields that do not match the defined type of each attribute, and should assume that any attribute may be empty, invalid, or under defined.",
      "type": "object",
      "properties": {
        "causes": {
          "description":
            "The Causes array includes more details associated with the StatusReason failure. Not all StatusReasons may provide detailed causes.",
          "type": "array",
          "items": {
            "description":
              "StatusCause provides more information about an api.Status failure, including cases when multiple errors are encountered.",
            "type": "object",
            "properties": {
              "field": {
                "description":
                  'The field of the resource that has caused this error, as named by its JSON serialization. May include dot and postfix notation for nested attributes. Arrays are zero-indexed.  Fields may appear more than once in an array of causes due to fields having multiple errors. Optional.\n\nExamples:\n  "name" - the field "name" on the current resource\n  "items[0].name" - the field "name" on the first array entry in "items"',
                "type": "string",
              },
              "message": {
                "description":
                  "A human-readable description of the cause of the error.  This field may be presented as-is to a reader.",
                "type": "string",
              },
              "reason": {
                "description":
                  "A machine-readable description of the cause of the error. If this value is empty there is no information available.",
                "type": "string",
              },
            },
            "required": [],
            "additionalProperties": true,
          },
          "minItems": 0,
        },
        "group": {
          "description":
            "The group attribute of the resource associated with the status StatusReason.",
          "type": "string",
        },
        "kind": {
          "description":
            "The kind attribute of the resource associated with the status StatusReason. On some operations may differ from the requested resource Kind. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds",
          "type": "string",
        },
        "name": {
          "description":
            "The name attribute of the resource associated with the status StatusReason (when there is a single name which can be described).",
          "type": "string",
        },
        "retryAfterSeconds": {
          "description":
            "If specified, the time in seconds before the operation should be retried. Some errors may indicate the client must take an alternate action - for those errors this field may indicate how long to wait before taking the alternate action.",
          "type": "integer",
          "format": "int32",
        },
        "uid": {
          "description":
            "UID of the resource. (when there is a single resource which can be described). More info: http://kubernetes.io/docs/user-guide/identifiers#uids",
          "type": "string",
        },
      },
      "required": [],
      "additionalProperties": true,
    },
    "v1.UserInfo": {
      "description":
        "UserInfo holds the information about the user needed to implement the user.Info interface.",
      "type": "object",
      "properties": {
        "extra": {
          "description":
            "Any additional information provided by the authenticator.",
          "type": "object",
          "additionalProperties": {
            "type": "array",
            "items": {
              "type": "string",
            },
            "minItems": 0,
          },
          "required": [],
        },
        "groups": {
          "description": "The names of groups this user is a part of.",
          "type": "array",
          "items": {
            "type": "string",
          },
          "minItems": 0,
        },
        "uid": {
          "description":
            "A unique value that identifies this user across time. If this user is deleted and another user by the same name is added, they will have different UIDs.",
          "type": "string",
        },
        "username": {
          "description":
            "The name that uniquely identifies this user among all active users.",
          "type": "string",
        },
      },
      "required": [],
      "additionalProperties": true,
    },
  },
  "$schema": "http://json-schema.org/draft-07/schema",
};
