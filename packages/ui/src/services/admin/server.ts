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

function omitEmptyValues<T extends Record<string, any>>(payload: T): T {
  const next = { ...payload } as Record<string, any>;
  for (const key of Object.keys(next)) {
    if (next[key] === "") {
      delete next[key];
      continue;
    }
    if (Array.isArray(next[key]) && next[key].length === 0) {
      delete next[key];
    }
  }
  return next as T;
}

function serializeNodePayload<T extends Record<string, any>>(body: T): T {
  if (!body || typeof body !== "object") {
    return body;
  }
  const payload = omitEmptyValues({ ...body }) as Record<string, any>;
  for (const key of ["id", "server_id"]) {
    if (key in payload) {
      payload[key] = toRequestString(payload[key]);
    }
  }
  if (Array.isArray(payload.node_group_ids)) {
    payload.node_group_ids = payload.node_group_ids
      .filter((value: unknown) => value !== "" && value !== null && value !== undefined)
      .map((value: unknown) => toRequestString(value));
  }
  return payload as T;
}

function normalizeServer(server: Record<string, any>) {
  return {
    ...server,
    ...(server.id !== undefined ? { id: String(server.id) } : {}),
    ...(server.last_reported_at !== undefined
      ? { last_reported_at: toSafeNumber(server.last_reported_at) }
      : {}),
    ...(server.created_at !== undefined ? { created_at: toSafeNumber(server.created_at) } : {}),
    ...(server.updated_at !== undefined ? { updated_at: toSafeNumber(server.updated_at) } : {}),
    ...(server.status
      ? {
          status: {
            ...server.status,
            online: Array.isArray(server.status.online)
              ? server.status.online.map((user: Record<string, any>) => ({
                  ...user,
                  ...(user.user_id !== undefined ? { user_id: String(user.user_id) } : {}),
                  ...(user.subscribe_id !== undefined ? { subscribe_id: String(user.subscribe_id) } : {}),
                  ...(user.traffic !== undefined ? { traffic: toSafeNumber(user.traffic) } : {}),
                  ...(user.expired_at !== undefined ? { expired_at: toSafeNumber(user.expired_at) } : {}),
                }))
              : server.status.online,
          },
        }
      : {}),
  };
}

function normalizeNode(node: Record<string, any>) {
  return {
    ...node,
    ...(node.id !== undefined ? { id: String(node.id) } : {}),
    ...(node.server_id !== undefined ? { server_id: String(node.server_id) } : {}),
    ...(node.node_group_id !== undefined ? { node_group_id: String(node.node_group_id) } : {}),
    ...(Array.isArray(node.node_group_ids)
      ? { node_group_ids: node.node_group_ids.map((value: unknown) => String(value)) }
      : {}),
    ...(node.created_at !== undefined ? { created_at: toSafeNumber(node.created_at) } : {}),
    ...(node.updated_at !== undefined ? { updated_at: toSafeNumber(node.updated_at) } : {}),
  };
}

/** Create Server POST /v1/admin/server/create */
export async function createServer(
  body: API.CreateServerRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: omitEmptyValues({ ...body }),
      ...(options || {}),
    }
  );
  if (response?.data?.data?.server) {
    response.data.data.server = normalizeServer(response.data.data.server);
  }
  return response;
}

/** Delete Server POST /v1/admin/server/delete */
export async function deleteServer(
  body: API.DeleteServerRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/delete`,
    {
      method: "POST",
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

/** Filter Server List GET /v1/admin/server/list */
export async function filterServerList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FilterServerListParams,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.FilterServerListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/list`,
    {
      method: "GET",
      params: {
        ...params,
      },
      ...(options || {}),
    }
  );
  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeServer(item as Record<string, any>)
    );
  }
  return response;
}

/** Create Node POST /v1/admin/server/node/create */
export async function createNode(
  body: API.CreateNodeRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/create`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeNodePayload(body),
      ...(options || {}),
    }
  );
  if (response?.data?.data?.node) {
    response.data.data.node = normalizeNode(response.data.data.node);
  }
  return response;
}

/** Delete Node POST /v1/admin/server/node/delete */
export async function deleteNode(
  body: API.DeleteNodeRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/delete`,
    {
      method: "POST",
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

/** Filter Node List GET /v1/admin/server/node/list */
export async function filterNodeList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.FilterNodeListParams,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: API.FilterNodeListResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/list`,
    {
      method: "GET",
      params: {
        ...params,
        node_group_id: params?.node_group_id
          ? toRequestString(params.node_group_id)
          : undefined,
      },
      ...(options || {}),
    }
  );
  if (Array.isArray(response?.data?.data?.list)) {
    response.data.data.list = response.data.data.list.map((item) =>
      normalizeNode(item as Record<string, any>)
    );
  }
  return response;
}

/** Reset node sort POST /v1/admin/server/node/sort */
export async function resetSortWithNode(
  body: API.ResetSortRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/sort`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        sort: Array.isArray(body?.sort)
          ? body.sort.map((item: Record<string, any>) => ({
              ...item,
              id: toRequestString(item?.id),
            }))
          : body?.sort,
      },
      ...(options || {}),
    }
  );
}

/** Toggle Node Status POST /v1/admin/server/node/status/toggle */
export async function toggleNodeStatus(
  body: API.ToggleNodeStatusRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${
      import.meta.env.VITE_API_PREFIX || ""
    }/v1/admin/server/node/status/toggle`,
    {
      method: "POST",
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

/** Query all node tags GET /v1/admin/server/node/tags */
export async function queryNodeTag(options?: { [key: string]: any }) {
  return request<API.Response & { data?: API.QueryNodeTagResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/tags`,
    {
      method: "GET",
      ...(options || {}),
    }
  );
}

/** Update Node POST /v1/admin/server/node/update */
export async function updateNode(
  body: API.UpdateNodeRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/node/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: serializeNodePayload(body),
      ...(options || {}),
    }
  );
  if (response?.data?.data?.node) {
    response.data.data.node = normalizeNode(response.data.data.node);
  }
  return response;
}

/** Get Server Protocols GET /v1/admin/server/protocols */
export async function getServerProtocols(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.GetServerProtocolsParams,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: API.GetServerProtocolsResponse }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/protocols`,
    {
      method: "GET",
      params: {
        ...params,
        id: toRequestString(params?.id),
      },
      ...(options || {}),
    }
  );
}

/** Reset server sort POST /v1/admin/server/server/sort */
export async function resetSortWithServer(
  body: API.ResetSortRequest,
  options?: { [key: string]: any }
) {
  return request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/server/sort`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...body,
        sort: Array.isArray(body?.sort)
          ? body.sort.map((item: Record<string, any>) => ({
              ...item,
              id: toRequestString(item?.id),
            }))
          : body?.sort,
      },
      ...(options || {}),
    }
  );
}

/** Update Server POST /v1/admin/server/update */
export async function updateServer(
  body: API.UpdateServerRequest,
  options?: { [key: string]: any }
) {
  const response = await request<API.Response & { data?: any }>(
    `${import.meta.env.VITE_API_PREFIX || ""}/v1/admin/server/update`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      data: {
        ...omitEmptyValues({ ...body }),
        id: toRequestString(body?.id),
      },
      ...(options || {}),
    }
  );
  if (response?.data?.data?.server) {
    response.data.data.server = normalizeServer(response.data.data.server);
  }
  return response;
}
