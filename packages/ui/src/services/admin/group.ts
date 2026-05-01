// @ts-nocheck
/* eslint-disable */
import request from "@workspace/ui/lib/request";

function toRequestString(value: unknown) {
  return value === undefined || value === null || value === ""
    ? value
    : String(value);
}

function toSafeNumber(value: unknown) {
  const parsed = Number(value ?? 0);
  return Number.isFinite(parsed) ? parsed : 0;
}

function normalizeNodeGroup<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.max_traffic_gb_expired !== undefined
      ? { max_traffic_gb_expired: toSafeNumber(item.max_traffic_gb_expired) }
      : {}),
    ...(item.min_traffic_gb !== undefined
      ? { min_traffic_gb: toSafeNumber(item.min_traffic_gb) }
      : {}),
    ...(item.max_traffic_gb !== undefined
      ? { max_traffic_gb: toSafeNumber(item.max_traffic_gb) }
      : {}),
    ...(item.node_count !== undefined ? { node_count: toSafeNumber(item.node_count) } : {}),
    ...(item.created_at !== undefined ? { created_at: toSafeNumber(item.created_at) } : {}),
    ...(item.updated_at !== undefined ? { updated_at: toSafeNumber(item.updated_at) } : {}),
  } as T;
}

function serializeNodeGroupPayload<T extends Record<string, any>>(body: T): T {
  if (!body || typeof body !== "object") {
    return body;
  }

  const payload = { ...body } as Record<string, any>;
  for (const key of ["id", "max_traffic_gb_expired", "min_traffic_gb", "max_traffic_gb"]) {
    if (key in payload) {
      payload[key] = toRequestString(payload[key]);
    }
  }
  return payload as T;
}

function normalizeGroupHistoryItem<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.start_time !== undefined ? { start_time: toSafeNumber(item.start_time) } : {}),
    ...(item.end_time !== undefined ? { end_time: toSafeNumber(item.end_time) } : {}),
    ...(item.created_at !== undefined ? { created_at: toSafeNumber(item.created_at) } : {}),
  } as T;
}

function normalizeGroupHistoryDetail<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.id !== undefined ? { id: String(item.id) } : {}),
    ...(item.start_time !== undefined ? { start_time: toSafeNumber(item.start_time) } : {}),
    ...(item.end_time !== undefined ? { end_time: toSafeNumber(item.end_time) } : {}),
    ...(item.created_at !== undefined ? { created_at: toSafeNumber(item.created_at) } : {}),
    ...(Array.isArray(item.group_details)
      ? {
          group_details: item.group_details.map((detail: Record<string, any>) => ({
            ...detail,
            ...(detail.id !== undefined ? { id: String(detail.id) } : {}),
            ...(detail.history_id !== undefined ? { history_id: String(detail.history_id) } : {}),
            ...(detail.user_group_id !== undefined ? { user_group_id: String(detail.user_group_id) } : {}),
            ...(detail.node_group_id !== undefined ? { node_group_id: String(detail.node_group_id) } : {}),
            ...(detail.created_at !== undefined ? { created_at: toSafeNumber(detail.created_at) } : {}),
          })),
        }
      : {}),
  } as T;
}

function normalizePreviewUserNodes<T extends Record<string, any>>(item: T): T {
  if (!item || typeof item !== "object") {
    return item;
  }

  return {
    ...item,
    ...(item.user_id !== undefined ? { user_id: String(item.user_id) } : {}),
    ...(Array.isArray(item.node_groups)
      ? {
          node_groups: item.node_groups.map((group: Record<string, any>) => ({
            ...group,
            ...(group.id !== undefined ? { id: String(group.id) } : {}),
            ...(Array.isArray(group.nodes)
              ? {
                  nodes: group.nodes.map((node: Record<string, any>) => ({
                    ...node,
                    ...(node.id !== undefined ? { id: String(node.id) } : {}),
                  })),
                }
              : {}),
          })),
        }
      : {}),
  } as T;
}

/** Get user group list GET /v1/admin/group/user/list */
export async function getUserGroupList(
  params: API.GetUserGroupListRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetUserGroupListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/user/list`,
    {
      method: "GET",
      params: {
        ...params,
        page: toRequestString(params?.page),
        size: toRequestString(params?.size),
        group_id: params?.group_id ? toRequestString(params.group_id) : undefined,
      },
      ...(options || {}),
    }
  );
}

/** Create user group POST /v1/admin/group/user */
export async function createUserGroup(
  body: API.CreateUserGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/user`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        node_group_id:
          body?.node_group_id === null || body?.node_group_id === undefined
            ? body?.node_group_id
            : toRequestString(body.node_group_id),
      },
      ...(options || {}),
    }
  );
}

/** Update user group PUT /v1/admin/group/user */
export async function updateUserGroup(
  body: API.UpdateUserGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/user`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        id: toRequestString(body?.id),
        node_group_id:
          body?.node_group_id === null || body?.node_group_id === undefined
            ? body?.node_group_id
            : toRequestString(body.node_group_id),
      },
      ...(options || {}),
    }
  );
}

/** Delete user group DELETE /v1/admin/group/user */
export async function deleteUserGroup(
  body: API.DeleteUserGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/user`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        id: toRequestString(body?.id),
      },
      ...(options || {}),
    }
  );
}

/** Get node group list GET /v1/admin/group/node/list */
export async function getNodeGroupList(
  params: API.GetNodeGroupListRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.GetNodeGroupListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node/list`,
    {
      method: "GET",
      params: {
        ...params,
        page: toRequestString(params?.page),
        size: toRequestString(params?.size),
        group_id: params?.group_id ? toRequestString(params.group_id) : undefined,
      },
      ...(options || {}),
    }
  );

  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeNodeGroup(item)
    );
  }

  return response;
}

/** Create node group POST /v1/admin/group/node */
export async function createNodeGroup(
  body: API.CreateNodeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeNodeGroupPayload(body),
      ...(options || {}),
    }
  );
}

/** Update node group PUT /v1/admin/group/node */
export async function updateNodeGroup(
  body: API.UpdateNodeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeNodeGroupPayload(body),
      ...(options || {}),
    }
  );
}

/** Delete node group DELETE /v1/admin/group/node */
export async function deleteNodeGroup(
  body: API.DeleteNodeGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/node`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        id: toRequestString(body?.id),
      },
      ...(options || {}),
    }
  );
}

/** Get subscribe mapping list GET /v1/admin/group/subscribe/mapping */
export async function getSubscribeMapping(
  params: API.GetSubscribeMappingRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetSubscribeMappingResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/subscribe/mapping`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
}

/** Update subscribe mapping PUT /v1/admin/group/subscribe/mapping */
export async function updateSubscribeMapping(
  body: API.UpdateSubscribeMappingRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/subscribe/mapping`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get subscribe group mapping GET /v1/admin/group/subscribe/mapping */
export async function getSubscribeGroupMapping(
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetSubscribeGroupMappingResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/subscribe/mapping`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Get group config GET /v1/admin/group/config */
export async function getGroupConfig(
  params?: API.GetGroupConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetGroupConfigResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/config`,
    {
      method: "GET",
      params: params || {},
      ...(options || {}),
    }
  );
}

/** Update group config PUT /v1/admin/group/config */
export async function updateGroupConfig(
  body: API.UpdateGroupConfigRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/config`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get recalculation status GET /v1/admin/group/recalculation/status */
export async function getRecalculationStatus(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.RecalculationState }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/recalculation/status`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Recalculate groups POST /v1/admin/group/recalculate */
export async function recalculateGroup(
  body: API.RecalculateGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/recalculate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Get group history GET /v1/admin/group/history */
export async function getGroupHistory(
  params: API.GetGroupHistoryRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.GetGroupHistoryResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/history`,
    {
      method: "GET",
      params: {
        ...params,
        page: toRequestString(params?.page),
        size: toRequestString(params?.size),
      },
      ...(options || {}),
    }
  );

  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeGroupHistoryItem(item)
    );
  }

  return response;
}

/** Get group history detail GET /v1/admin/group/history/detail */
export async function getGroupHistoryDetail(
  params: { id: string },
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.GetGroupHistoryDetailResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/history/detail`,
    {
      method: "GET",
      params: {
        id: toRequestString(params.id),
      },
      ...(options || {}),
    }
  );

  if (response?.data?.data) {
    response.data.data = normalizeGroupHistoryDetail(response.data.data);
  }

  return response;
}

/** Export group result GET /v1/admin/group/export */
export async function exportGroupResult(
  params?: API.ExportGroupResultRequest,
  options?: { [key: string]: any }
) {
  return request<Blob>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/export`,
    {
      method: "GET",
      params: params
        ? {
            ...params,
            history_id: params.history_id
              ? toRequestString(params.history_id)
              : undefined,
          }
        : {},
      responseType: 'blob',
      ...(options || {}),
    }
  );
}

/** Preview user nodes GET /v1/admin/group/preview */
export async function previewUserNodes(
  params: API.PreviewUserNodesRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.PreviewUserNodesResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/preview`,
    {
      method: "GET",
      params: {
        user_id: toRequestString(params.user_id),
      },
      ...(options || {}),
    }
  );

  if (response?.data?.data) {
    response.data.data = normalizePreviewUserNodes(response.data.data);
  }

  return response;
}

/** Migrate users to another group POST /v1/admin/group/migrate */
export async function migrateUsersToGroup(
  body: API.MigrateUsersRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.MigrateUsersResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/migrate`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        from_user_group_id: toRequestString(body?.from_user_group_id),
        to_user_group_id: toRequestString(body?.to_user_group_id),
      },
      ...(options || {}),
    }
  );
}

/** Update user user group PUT /v1/admin/user/user_group */
export async function updateUserUserGroup(
  body: API.UpdateUserUserGroupRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/user/user_group`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Reset all groups POST /v1/admin/group/reset */
export async function resetGroups(
  body: API.ResetGroupsRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/reset`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: body,
      ...(options || {}),
    }
  );
}

/** Bind node group to user groups POST /v1/admin/group/user/bind-node-groups */
export async function bindNodeGroups(
  body: API.BindNodeGroupsRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/group/user/bind-node-groups`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        user_group_ids: Array.isArray(body?.user_group_ids)
          ? body.user_group_ids.map((id: unknown) => toRequestString(id))
          : body?.user_group_ids,
        node_group_id:
          body?.node_group_id === null || body?.node_group_id === undefined
            ? body?.node_group_id
            : toRequestString(body.node_group_id),
      },
      ...(options || {}),
    }
  );
}
