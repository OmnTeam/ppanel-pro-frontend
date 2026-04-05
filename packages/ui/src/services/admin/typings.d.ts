declare namespace API {
  type Int64Value = string | number;

  type Ads = {
    id: number;
    title: string;
    type: string;
    content: string;
    description: string;
    target_url: string;
    start_time: number;
    end_time: number;
    status: number;
    created_at: number;
    updated_at: number;
  };

  type AlipayNotifyResponse = {
    return_code: string;
  };

  type Announcement = {
    id: number;
    title: string;
    content: string;
    show: boolean;
    pinned: boolean;
    popup: boolean;
    created_at: number;
    updated_at: number;
  };

  type AnyTLS = {
    port: number;
    security_config: SecurityConfig;
  };

  type Application = {
    id: number;
    icon: string;
    name: string;
    description: string;
    subscribe_type: string;
  };

  type ApplicationPlatform = {
    ios?: ApplicationVersion[];
    macos?: ApplicationVersion[];
    linux?: ApplicationVersion[];
    android?: ApplicationVersion[];
    windows?: ApplicationVersion[];
    harmony?: ApplicationVersion[];
  };

  type ApplicationResponse = {
    applications: ApplicationResponseInfo[];
  };

  type ApplicationResponseInfo = {
    id: number;
    name: string;
    icon: string;
    description: string;
    subscribe_type: string;
    platform: ApplicationPlatform;
  };

  type ApplicationVersion = {
    id: number;
    url: string;
    version: string;
    description: string;
    is_default: boolean;
  };

  type AppUserSubcbribe = {
    id: number;
    name: string;
    upload: number;
    traffic: number;
    download: number;
    device_limit: number;
    start_time: string;
    expire_time: string;
    list: AppUserSubscbribeNode[];
  };

  type AppUserSubscbribeNode = {
    id: number;
    name: string;
    uuid: string;
    protocol: string;
    relay_mode: string;
    relay_node: string;
    server_addr: string;
    speed_limit: number;
    tags: string[];
    traffic: number;
    traffic_ratio: number;
    upload: number;
    config: string;
    country: string;
    city: string;
    latitude: string;
    longitude: string;
    created_at: number;
    download: number;
    port: number;
  };

  type AuthConfig = {
    mobile: MobileAuthenticateConfig;
    email: EmailAuthticateConfig;
    device: DeviceAuthticateConfig;
    register: PubilcRegisterConfig;
  };

  type AuthMethodConfig = {
    id: number;
    method: string;
    config: Record<string, any>;
    enabled: boolean;
  };

  type BalanceLog = {
    type: number;
    user_id: Int64Value;
    amount: Int64Value;
    order_no?: string;
    balance: Int64Value;
    timestamp: Int64Value;
  };

  type BatchDeleteCouponRequest = {
    ids: number[];
  };

  type BatchDeleteDocumentRequest = {
    ids: number[];
  };

  type BatchDeleteSubscribeGroupRequest = {
    ids: number[];
  };

  type BatchDeleteSubscribeRequest = {
    ids: number[];
  };

  type BatchDeleteUserRequest = {
    ids: Int64Value[];
  };

  type BatchSendEmailTask = {
    id: Int64Value;
    subject: string;
    content: string;
    recipients: string;
    scope: number;
    register_start_time: Int64Value;
    register_end_time: Int64Value;
    additional: string;
    scheduled: Int64Value;
    interval: number;
    limit: Int64Value;
    status: number;
    errors: string;
    total: Int64Value;
    current: Int64Value;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type CheckoutOrderRequest = {
    orderNo: string;
    returnUrl?: string;
  };

  type CheckoutOrderResponse = {
    type: string;
    checkout_url?: string;
    stripe?: StripePayment;
  };

  type CloseOrderRequest = {
    orderNo: string;
  };

  type CommissionLog = {
    type: number;
    user_id: Int64Value;
    amount: Int64Value;
    order_no: string;
    timestamp: Int64Value;
  };

  type Coupon = {
    id: Int64Value;
    name: string;
    code: string;
    count: Int64Value;
    type: number;
    discount: Int64Value;
    start_time: Int64Value;
    expire_time: Int64Value;
    user_limit: Int64Value;
    subscribe: Int64Value[];
    used_count: Int64Value;
    enable: boolean;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type CreateAdsRequest = {
    title: string;
    type: string;
    content: string;
    description: string;
    target_url: string;
    start_time: number;
    end_time: number;
    status: number;
  };

  type CreateAnnouncementRequest = {
    title: string;
    content: string;
  };

  type CreateBatchSendEmailTaskRequest = {
    subject: string;
    content: string;
    scope: number;
    register_start_time?: number;
    register_end_time?: number;
    additional?: string;
    scheduled?: number;
    interval?: number;
    limit?: number;
  };

  type CreateCouponRequest = {
    name: string;
    code?: string;
    count?: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit?: number;
    subscribe?: number[];
    used_count?: number;
    enable?: boolean;
  };

  type CreateRedemptionCodeRequest = {
    total_count: number;
    subscribe_plan: number;
    unit_time: string;
    quantity: number;
    batch_count: number;
  };

  type UpdateRedemptionCodeRequest = {
    id: number;
    total_count?: number;
    subscribe_plan?: number;
    unit_time?: string;
    quantity?: number;
    status?: number;
  };

  type ToggleRedemptionCodeStatusRequest = {
    id: number;
    status: number;
  };

  type DeleteRedemptionCodeRequest = {
    id: number;
  };

  type BatchDeleteRedemptionCodeRequest = {
    ids: number[];
  };

  type GetRedemptionCodeListRequest = {
    page: number;
    size: number;
    subscribe_plan?: number;
    unit_time?: string;
    code?: string;
  };

  type GetRedemptionCodeListResponse = {
    total: number;
    list: RedemptionCode[];
  };

  type GetRedemptionRecordListRequest = {
    page: number;
    size: number;
    user_id?: number;
    code_id?: number;
  };

  type GetRedemptionRecordListResponse = {
    total: number;
    list: RedemptionRecord[];
  };

  type RedemptionCode = {
    id: Int64Value;
    code: string;
    total_count: Int64Value;
    used_count: Int64Value;
    subscribe_plan: Int64Value;
    unit_time: string;
    quantity: Int64Value;
    status: Int64Value;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type RedemptionRecord = {
    id: Int64Value;
    redemption_code_id: Int64Value;
    user_id: Int64Value;
    subscribe_id: Int64Value;
    unit_time: string;
    quantity: Int64Value;
    redeemed_at: Int64Value;
    created_at: Int64Value;
  };

  type CreateDocumentRequest = {
    title: string;
    content: string;
    tags?: string[];
    show: boolean;
  };

  type CreateNodeRequest = {
    name: string;
    tags?: string[];
    port: number;
    address: string;
    server_id: number;
    protocol: string;
    enabled: boolean;
  };

  type CreateOrderRequest = {
    user_id: Int64Value;
    type: number;
    quantity?: Int64Value;
    price: Int64Value;
    amount: Int64Value;
    discount?: Int64Value;
    coupon?: string;
    coupon_discount?: Int64Value;
    commission: Int64Value;
    fee_amount: Int64Value;
    payment_id: Int64Value;
    trade_no?: string;
    status?: number;
    subscribe_id?: Int64Value;
  };

  type CreatePaymentMethodRequest = {
    name: string;
    platform: string;
    description: string;
    icon?: string;
    domain?: string;
    config: Record<string, any>;
    fee_mode: number;
    fee_percent?: Int64Value;
    fee_amount?: Int64Value;
    enable: boolean;
  };

  type CreateQuotaTaskRequest = {
    subscribers: Int64Value[];
    is_active: boolean;
    start_time: Int64Value;
    end_time: Int64Value;
    reset_traffic: boolean;
    days: Int64Value;
    gift_type: number;
    gift_value: Int64Value;
  };

  type CreateServerRequest = {
    name: string;
    country?: string;
    city?: string;
    address: string;
    sort?: number;
    protocols: Protocol[];
  };

  type CreateSubscribeApplicationRequest = {
    name: string;
    description?: string;
    icon?: string;
    scheme?: string;
    user_agent: string;
    is_default: boolean;
    template: string;
    output_format: string;
    download_link: DownloadLink;
  };

  type CreateSubscribeGroupRequest = {
    name: string;
    description: string;
  };

  type CreateSubscribeRequest = {
    name: string;
    language: string;
    description: string;
    unit_price: number;
    unit_time: string;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    nodes: number[];
    node_tags: string[];
    show: boolean;
    sell: boolean;
    deduction_ratio: number;
    allow_deduction: boolean;
    reset_cycle: number;
    renewal_reset: boolean;
    show_original_price: boolean;
  };

  type CreateTicketFollowRequest = {
    ticket_id: number;
    from: string;
    type: number;
    content: string;
  };

  type CreateUserAuthMethodRequest = {
    user_id: number;
    auth_type: string;
    auth_identifier: string;
  };

  type CreateUserRequest = {
    email: string;
    telephone: string;
    telephone_area_code: string;
    password: string;
    product_id: Int64Value;
    duration: Int64Value;
    referral_percentage: number;
    only_first_purchase: boolean;
    referer_user: string;
    refer_code: string;
    balance: Int64Value;
    commission: Int64Value;
    gift_amount: Int64Value;
    is_admin: boolean;
  };

  type CreateUserSubscribeRequest = {
    user_id: Int64Value;
    expired_at: Int64Value;
    traffic: Int64Value;
    subscribe_id: Int64Value;
  };

  type CurrencyConfig = {
    access_key: string;
    currency_unit: string;
    currency_symbol: string;
  };

  type CurrentUserData = {
    user: User;
  };

  type DeleteAdsRequest = {
    id: number;
  };

  type DeleteAnnouncementRequest = {
    id: number;
  };

  type DeleteCouponRequest = {
    id: number;
  };

  type DeleteDocumentRequest = {
    id: number;
  };

  type DeleteNodeRequest = {
    id: number;
  };

  type DeletePaymentMethodRequest = {
    id: Int64Value;
  };

  type DeleteServerRequest = {
    id: number;
  };

  type DeleteSubscribeApplicationRequest = {
    id: number;
  };

  type DeleteSubscribeGroupRequest = {
    id: number;
  };

  type DeleteSubscribeRequest = {
    id: number;
  };

  type DeleteUserAuthMethodRequest = {
    user_id: number;
    auth_type: string;
  };

  type DeleteUserDeivceRequest = {
    id: number;
  };

  type DeleteUserParams = {
    id: Int64Value;
  };

  type DeleteUserSubscribeRequest = {
    user_subscribe_id: string;
  };

  type DeviceAuthticateConfig = {
    enable: boolean;
    show_ads: boolean;
    enable_security: boolean;
    only_real_device: boolean;
  };

  type Document = {
    id: Int64Value;
    title: string;
    content: string;
    tags: string[];
    show: boolean;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type DownloadLink = {
    ios?: string;
    android?: string;
    windows?: string;
    mac?: string;
    linux?: string;
    harmony?: string;
  };

  type EmailAuthticateConfig = {
    enable: boolean;
    enable_verify: boolean;
    enable_domain_suffix: boolean;
    domain_suffix_list: string;
  };

  type EPayNotifyRequest = {
    pid: number;
    trade_no: string;
    out_trade_no: string;
    type: string;
    name: string;
    money: string;
    trade_status: string;
    param: string;
    sign: string;
    sign_type: string;
  };

  type FilterBalanceLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterBalanceLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterBalanceLogResponse = {
    total: number;
    list: BalanceLog[];
  };

  type FilterCommissionLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterCommissionLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterCommissionLogResponse = {
    total: number;
    list: CommissionLog[];
  };

  type FilterEmailLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
  };

  type FilterEmailLogResponse = {
    total: number;
    list: MessageLog[];
  };

  type FilterGiftLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterGiftLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterGiftLogResponse = {
    total: number;
    list: GiftLog[];
  };

  type FilterLoginLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterLoginLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterLoginLogResponse = {
    total: number;
    list: LoginLog[];
  };

  type FilterLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
  };

  type FilterMobileLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
  };

  type FilterMobileLogResponse = {
    total: number;
    list: MessageLog[];
  };

  type FilterNodeListParams = {
    page: number;
    size: number;
    search?: string;
    node_group_id?: number;
  };

  type FilterNodeListRequest = {
    page: number;
    size: number;
    search?: string;
    node_group_id?: number;
  };

  type FilterNodeListResponse = {
    total: number;
    list: Node[];
  };

  type FilterRegisterLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterRegisterLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
  };

  type FilterRegisterLogResponse = {
    total: number;
    list: RegisterLog[];
  };

  type FilterResetSubscribeLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_subscribe_id?: number;
  };

  type FilterResetSubscribeLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_subscribe_id?: number;
  };

  type FilterResetSubscribeLogResponse = {
    total: number;
    list: ResetSubscribeLog[];
  };

  type FilterServerListParams = {
    page: number;
    size: number;
    search?: string;
  };

  type FilterServerListRequest = {
    page: number;
    size: number;
    search?: string;
  };

  type FilterServerListResponse = {
    total: number;
    list: Server[];
  };

  type FilterServerTrafficLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    server_id?: number;
  };

  type FilterServerTrafficLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    server_id?: number;
  };

  type FilterServerTrafficLogResponse = {
    total: number;
    list: ServerTrafficLog[];
  };

  type FilterSubscribeLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
    user_subscribe_id?: number;
  };

  type FilterSubscribeLogRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
    user_subscribe_id?: number;
  };

  type FilterSubscribeLogResponse = {
    total: number;
    list: SubscribeLog[];
  };

  type FilterSubscribeTrafficRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    user_id?: number;
    user_subscribe_id?: number;
  };

  type FilterSubscribeTrafficResponse = {
    total: number;
    list: UserSubscribeTrafficLog[];
  };

  type FilterTrafficLogDetailsParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    server_id?: number;
    subscribe_id?: number;
    user_id?: number;
  };

  type FilterTrafficLogDetailsRequest = {
    page?: number;
    size?: number;
    date?: string;
    search?: string;
    server_id?: number;
    subscribe_id?: number;
    user_id?: number;
  };

  type FilterTrafficLogDetailsResponse = {
    total: number;
    list: TrafficLogDetails[];
  };

  type FilterUserSubscribeTrafficLogParams = {
    page: number;
    size: number;
    date?: string;
    search?: string;
    user_id?: number;
    user_subscribe_id?: number;
  };

  type Follow = {
    id: number;
    ticket_id: number;
    from: string;
    type: number;
    content: string;
    created_at: number;
  };

  type GetAdsDetailParams = {
    id: number;
  };

  type GetAdsDetailRequest = {
    id: number;
  };

  type GetAdsListParams = {
    page: number;
    size: number;
    status?: number;
    search?: string;
  };

  type GetAdsListRequest = {
    page: number;
    size: number;
    status?: number;
    search?: string;
  };

  type GetAdsListResponse = {
    total: number;
    list: Ads[];
  };

  type GetAnnouncementListParams = {
    page: number;
    size: number;
    show?: boolean;
    pinned?: boolean;
    popup?: boolean;
    search?: string;
  };

  type GetAnnouncementListRequest = {
    page: number;
    size: number;
    show?: boolean;
    pinned?: boolean;
    popup?: boolean;
    search?: string;
  };

  type GetAnnouncementListResponse = {
    total: number;
    list: Announcement[];
  };

  type GetAnnouncementParams = {
    id: number;
  };

  type GetAnnouncementRequest = {
    id: number;
  };

  type GetAuthMethodConfigParams = {
    method: string;
  };

  type GetAuthMethodConfigRequest = {
    method: string;
  };

  type GetAuthMethodListResponse = {
    list: AuthMethodConfig[];
  };

  type GetAvailablePaymentMethodsResponse = {
    list: PaymentMethod[];
  };

  type GetBatchSendEmailTaskListParams = {
    page: number;
    size: number;
    scope?: number;
    status?: number;
  };

  type GetBatchSendEmailTaskListRequest = {
    page: number;
    size: number;
    scope?: number;
    status?: number;
  };

  type GetBatchSendEmailTaskListResponse = {
    total: number;
    list: BatchSendEmailTask[];
  };

  type GetBatchSendEmailTaskStatusRequest = {
    id: number;
  };

  type GetBatchSendEmailTaskStatusResponse = {
    status: number;
    current: number;
    total: number;
    errors: string;
  };

  type GetCouponListParams = {
    page: number;
    size: number;
    subscribe?: number;
    search?: string;
  };

  type GetCouponListRequest = {
    page: number;
    size: number;
    subscribe?: number;
    search?: string;
  };

  type GetCouponListResponse = {
    total: number;
    list: Coupon[];
  };

  type GetDetailRequest = {
    id: number;
  };

  type GetDocumentDetailRequest = {
    id: number;
  };

  type GetDocumentListParams = {
    page: number;
    size: number;
    tag?: string;
    search?: string;
  };

  type GetDocumentListRequest = {
    page: number;
    size: number;
    tag?: string;
    search?: string;
  };

  type GetDocumentListResponse = {
    total: number;
    list: Document[];
  };

  type GetMessageLogListParams = {
    page: number;
    size: number;
    type: number;
    search?: string;
  };

  type GetMessageLogListRequest = {
    page: number;
    size: number;
    type: number;
    search?: string;
  };

  type GetMessageLogListResponse = {
    total: number;
    list: MessageLog[];
  };

  type GetNodeMultiplierResponse = {
    periods: TimePeriod[];
  };

  type GetOrderListParams = {
    page: number;
    size: number;
    user_id?: Int64Value;
    status?: number;
    subscribe_id?: Int64Value;
    search?: string;
  };

  type GetOrderListRequest = {
    page: number;
    size: number;
    user_id?: Int64Value;
    status?: number;
    subscribe_id?: Int64Value;
    search?: string;
  };

  type GetOrderListResponse = {
    total: Int64Value;
    list: Order[];
  };

  type GetPaymentMethodListParams = {
    page: number;
    size: number;
    platform?: string;
    search?: string;
    enable?: boolean;
  };

  type GetPaymentMethodListRequest = {
    page: number;
    size: number;
    platform?: string;
    search?: string;
    enable?: boolean;
  };

  type GetPaymentMethodListResponse = {
    total: Int64Value;
    list: PaymentMethodDetail[];
  };

  type GetPreSendEmailCountRequest = {
    scope: number;
    register_start_time?: Int64Value;
    register_end_time?: Int64Value;
  };

  type GetPreSendEmailCountResponse = {
    count: Int64Value;
  };

  type GetServerProtocolsParams = {
    id: number;
  };

  type GetServerProtocolsRequest = {
    id: number;
  };

  type GetServerProtocolsResponse = {
    protocols: Protocol[];
  };

  type GetSubscribeApplicationListParams = {
    page: number;
    size: number;
  };

  type GetSubscribeApplicationListRequest = {
    page: number;
    size: number;
  };

  type GetSubscribeApplicationListResponse = {
    total: number;
    list: SubscribeApplication[];
  };

  type GetSubscribeDetailsParams = {
    id: number;
  };

  type GetSubscribeDetailsRequest = {
    id: number;
  };

  type GetSubscribeGroupListResponse = {
    list: SubscribeGroup[];
    total: number;
  };

  type GetSubscribeListParams = {
    page: number;
    size: number;
    language?: string;
    search?: string;
    node_group_id?: number;
  };

  type GetSubscribeListRequest = {
    page: number;
    size: number;
    language?: string;
    search?: string;
    node_group_id?: number;
  };

  type GetSubscribeListResponse = {
    list: SubscribeItem[];
    total: number;
  };

  type GetTicketListParams = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    search?: string;
  };

  type GetTicketListRequest = {
    page: number;
    size: number;
    user_id?: number;
    status?: number;
    search?: string;
  };

  type GetTicketListResponse = {
    total: number;
    list: Ticket[];
  };

  type GetTicketParams = {
    id: number;
  };

  type GetTicketRequest = {
    id: number;
  };

  type GetUserAuthMethodRequest = {
    user_id: number;
  };

  type GetUserAuthMethodResponse = {
    auth_methods: UserAuthMethod[];
  };

  type GetUserDetailParams = {
    id: Int64Value;
  };

  type GetUserListParams = {
    page: number;
    size: number;
    search?: string;
    user_id?: Int64Value;
    unscoped?: boolean;
    subscribe_id?: Int64Value;
    user_subscribe_id?: Int64Value;
    user_group_id?: Int64Value;
    short_code?: string;
  };

  type GetUserListRequest = {
    page: number;
    size: number;
    search?: string;
    user_id?: Int64Value;
    unscoped?: boolean;
    subscribe_id?: Int64Value;
    user_subscribe_id?: Int64Value;
    short_code?: string;
  };

  type GetUserListResponse = {
    total: Int64Value;
    list: User[];
  };

  type GetUserLoginLogsParams = {
    page: number;
    size: number;
    user_id: Int64Value;
  };

  type GetUserLoginLogsRequest = {
    page: number;
    size: number;
    user_id: Int64Value;
  };

  type GetUserLoginLogsResponse = {
    list: UserLoginLog[];
    total: Int64Value;
  };

  type GetUserSubscribeByIdParams = {
    id: Int64Value;
  };

  type GetUserSubscribeByIdRequest = {
    id: Int64Value;
  };

  type GetUserSubscribeDevicesParams = {
    page: number;
    size: number;
    user_id: Int64Value;
    subscribe_id: Int64Value;
  };

  type GetUserSubscribeDevicesRequest = {
    page: number;
    size: number;
    user_id: Int64Value;
    subscribe_id: Int64Value;
  };

  type GetUserSubscribeDevicesResponse = {
    list: UserDevice[];
    total: Int64Value;
  };

  type GetUserSubscribeListRequest = {
    page: number;
    size: number;
    user_id: Int64Value;
  };

  type GetUserSubscribeListResponse = {
    list: UserSubscribe[];
    total: Int64Value;
  };

  type GetUserSubscribeLogsParams = {
    page: number;
    size: number;
    user_id: Int64Value;
    subscribe_id?: Int64Value;
  };

  type GetUserSubscribeLogsRequest = {
    page: number;
    size: number;
    user_id: Int64Value;
    subscribe_id?: Int64Value;
  };

  type GetUserSubscribeLogsResponse = {
    list: UserSubscribeLog[];
    total: Int64Value;
  };

  type GetUserSubscribeParams = {
    page: number;
    size: number;
    user_id: Int64Value;
  };

  type GetUserSubscribeResetTrafficLogsParams = {
    page: number;
    size: number;
    user_subscribe_id: Int64Value;
  };

  type GetUserSubscribeResetTrafficLogsRequest = {
    page: number;
    size: number;
    user_subscribe_id: Int64Value;
  };

  type GetUserSubscribeResetTrafficLogsResponse = {
    list: ResetSubscribeTrafficLog[];
    total: Int64Value;
  };

  type GetUserSubscribeTrafficLogsParams = {
    page: number;
    size: number;
    user_id: Int64Value;
    subscribe_id: Int64Value;
    start_time: Int64Value;
    end_time: Int64Value;
  };

  type GetUserSubscribeTrafficLogsRequest = {
    page: number;
    size: number;
    user_id: Int64Value;
    subscribe_id: Int64Value;
    start_time: Int64Value;
    end_time: Int64Value;
  };

  type GetUserSubscribeTrafficLogsResponse = {
    list: TrafficLog[];
    total: number;
  };

  type GiftLog = {
    type: number;
    user_id: number;
    order_no: string;
    subscribe_id: number;
    amount: number;
    balance: number;
    remark?: string;
    timestamp: number;
  };

  type HasMigrateSeverNodeResponse = {
    has_migrate: boolean;
  };

  type Hysteria2 = {
    port: number;
    hop_ports: string;
    hop_interval: number;
    obfs_password: string;
    security_config: SecurityConfig;
  };

  type InviteConfig = {
    forced_invite: boolean;
    referral_percentage: number;
    only_first_purchase: boolean;
  };

  type KickOfflineRequest = {
    id: number;
  };

  type LoginLog = {
    user_id: Int64Value;
    method: string;
    login_ip: string;
    user_agent: string;
    success: boolean;
    timestamp: Int64Value;
  };

  type LogResponse = {
    list: Record<string, any>;
  };

  type LogSetting = {
    auto_clear: boolean;
    clear_days: number;
  };

  type MessageLog = {
    id: Int64Value;
    type: number;
    platform: string;
    to: string;
    subject: string;
    content: Record<string, any>;
    status: number;
    created_at: Int64Value;
  };

  type MigrateServerNodeResponse = {
    succee: number;
    fail: number;
    message?: string;
  };

  type MobileAuthenticateConfig = {
    enable: boolean;
    enable_whitelist: boolean;
    whitelist: string[];
  };

  type ModuleConfig = {
    /** 通讯密钥 */
    secret: string;
    /** 服务名称 */
    service_name: string;
    /** 服务版本 */
    service_version: string;
  };

  type Node = {
    id: Int64Value;
    name: string;
    tags: string[];
    port: number;
    address: string;
    server_id: Int64Value;
    protocol: string;
    enabled: boolean;
    sort?: number;
    node_group_id?: Int64Value;
    node_group_ids?: Int64Value[];
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type NodeConfig = {
    node_secret: string;
    node_pull_interval: number;
    node_push_interval: number;
    traffic_report_threshold: number;
    ip_strategy: string;
    dns: NodeDNS[];
    block: string[];
    outbound: NodeOutbound[];
  };

  type NodeDNS = {
    proto: string;
    address: string;
    domains: string[];
  };

  type NodeOutbound = {
    name: string;
    protocol: string;
    address: string;
    port: number;
    password: string;
    rules: string[];
  };

  type NodeRelay = {
    host: string;
    port: number;
    prefix: string;
  };

  type Order = {
    id: Int64Value;
    user_id: Int64Value;
    order_no: string;
    type: number;
    quantity: Int64Value;
    price: Int64Value;
    amount: Int64Value;
    gift_amount: Int64Value;
    discount: Int64Value;
    coupon: string;
    coupon_discount: Int64Value;
    commission?: Int64Value;
    payment_id?: Int64Value;
    payment?: PaymentMethod;
    method?: string;
    fee_amount: Int64Value;
    trade_no: string;
    status: number;
    subscribe_id: Int64Value;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type OrderDetail = {
    id: number;
    user_id: number;
    order_no: string;
    type: number;
    quantity: number;
    price: number;
    amount: number;
    gift_amount: number;
    discount: number;
    coupon: string;
    coupon_discount: number;
    commission?: number;
    payment: PaymentMethod;
    method: string;
    fee_amount: number;
    trade_no: string;
    status: number;
    subscribe_id: number;
    subscribe: Subscribe;
    created_at: number;
    updated_at: number;
  };

  type OrdersStatistics = {
    date?: string;
    amount_total: number;
    new_order_amount: number;
    renewal_order_amount: number;
    list?: OrdersStatistics[];
  };

  type PaymentConfig = {
    id: Int64Value;
    name: string;
    platform: string;
    description: string;
    icon?: string;
    domain?: string;
    config: Record<string, any>;
    fee_mode: number;
    fee_percent?: Int64Value;
    fee_amount?: Int64Value;
    enable: boolean;
    notify_url?: string;
    token?: string;
  };

  type PaymentMethod = {
    id: Int64Value;
    name: string;
    platform: string;
    description: string;
    icon: string;
    fee_mode: number;
    fee_percent: Int64Value;
    fee_amount: Int64Value;
  };

  type PaymentMethodDetail = {
    id: Int64Value;
    name: string;
    platform: string;
    description: string;
    icon: string;
    domain: string;
    config: Record<string, any>;
    fee_mode: number;
    fee_percent: Int64Value;
    fee_amount: Int64Value;
    enable: boolean;
    notify_url: string;
    token?: string;
  };

  type PlatformInfo = {
    platform: string;
    platform_url: string;
    platform_field_description: Record<string, any>;
  };

  type PlatformResponse = {
    list: PlatformInfo[];
  };

  type PreOrderResponse = {
    price: number;
    amount: number;
    discount: number;
    gift_amount: number;
    coupon: string;
    coupon_discount: number;
    fee_amount: number;
  };

  type PreRenewalOrderResponse = {
    orderNo: string;
  };

  type PreViewNodeMultiplierResponse = {
    current_time: string;
    ratio: number;
  };

  type PreviewSubscribeTemplateParams = {
    id: number;
  };

  type PreviewSubscribeTemplateRequest = {
    id: number;
  };

  type PreviewSubscribeTemplateResponse = {
    /** 预览的模板内容 */
    template: string;
  };

  type PrivacyPolicyConfig = {
    privacy_policy: string;
  };

  type Protocol = {
    type: string;
    port: number;
    enable: boolean;
    security?: string;
    sni?: string;
    allow_insecure?: boolean;
    fingerprint?: string;
    reality_server_addr?: string;
    reality_server_port?: number;
    reality_private_key?: string;
    reality_public_key?: string;
    reality_short_id?: string;
    transport?: string;
    host?: string;
    path?: string;
    service_name?: string;
    cipher?: string;
    server_key?: string;
    flow?: string;
    hop_ports?: string;
    hop_interval?: number;
    obfs_password?: string;
    disable_sni?: boolean;
    reduce_rtt?: boolean;
    udp_relay_mode?: string;
    congestion_controller?: string;
    /** mux, eg: off/low/medium/high */
    multiplex?: string;
    /** padding scheme */
    padding_scheme?: string;
    /** upload speed limit */
    up_mbps?: number;
    /** download speed limit */
    down_mbps?: number;
    /** obfs, 'none', 'http', 'tls' */
    obfs?: string;
    /** obfs host */
    obfs_host?: string;
    /** obfs path */
    obfs_path?: string;
    /** xhttp mode */
    xhttp_mode?: string;
    /** xhttp extra path */
    xhttp_extra?: string;
    /** encryption，'none', 'mlkem768x25519plus' */
    encryption?: string;
    /** encryption mode，'native', 'xorpub', 'random' */
    encryption_mode?: string;
    /** encryption rtt，'0rtt', '1rtt' */
    encryption_rtt?: string;
    /** encryption ticket */
    encryption_ticket?: string;
    /** encryption server padding */
    encryption_server_padding?: string;
    /** encryption private key */
    encryption_private_key?: string;
    /** encryption client padding */
    encryption_client_padding?: string;
    /** encryption password */
    encryption_password?: string;
    /** Traffic ratio, default is 1 */
    ratio?: number;
    /** Certificate mode, `none`｜`http`｜`dns`｜`self` */
    cert_mode?: string;
    /** DNS provider for certificate */
    cert_dns_provider?: string;
    /** Environment for DNS provider */
    cert_dns_env?: string;
  };

  type PubilcRegisterConfig = {
    stop_register: boolean;
    enable_ip_register_limit: boolean;
    ip_register_limit: number;
    ip_register_limit_duration: number;
  };

  type PubilcVerifyCodeConfig = {
    verify_code_interval: number;
  };

  type PurchaseOrderRequest = {
    subscribe_id: number;
    quantity: number;
    payment?: number;
    coupon?: string;
  };

  type PurchaseOrderResponse = {
    order_no: string;
  };

  type QueryAnnouncementRequest = {
    page: number;
    size: number;
    pinned: boolean;
    popup: boolean;
  };

  type QueryAnnouncementResponse = {
    total: number;
    announcements: Announcement[];
  };

  type QueryDocumentDetailRequest = {
    id: number;
  };

  type QueryDocumentListResponse = {
    total: number;
    list: Document[];
  };

  type QueryIPLocationParams = {
    ip: string;
  };

  type QueryIPLocationRequest = {
    ip: string;
  };

  type QueryIPLocationResponse = {
    country: string;
    region?: string;
    city: string;
  };

  type QueryNodeTagResponse = {
    tags: string[];
  };

  type QueryOrderDetailRequest = {
    order_no: string;
  };

  type QueryOrderListRequest = {
    page: number;
    size: number;
  };

  type QueryOrderListResponse = {
    total: number;
    list: OrderDetail[];
  };

  type QueryQuotaTaskListParams = {
    page: number;
    size: number;
    status?: number;
  };

  type QueryQuotaTaskListRequest = {
    page: number;
    size: number;
    status?: number;
  };

  type QueryQuotaTaskListResponse = {
    total: number;
    list: QuotaTask[];
  };

  type QueryQuotaTaskPreCountRequest = {
    subscribers: number[];
    is_active: boolean;
    start_time: number;
    end_time: number;
  };

  type QueryQuotaTaskPreCountResponse = {
    count: number;
  };

  type QueryQuotaTaskStatusRequest = {
    id: number;
  };

  type QueryQuotaTaskStatusResponse = {
    status: number;
    current: number;
    total: number;
    errors: string;
  };

  type QuerySubscribeGroupListResponse = {
    list: SubscribeGroup[];
    total: number;
  };

  type QuerySubscribeListResponse = {
    list: Subscribe[];
    total: number;
  };

  type QueryUserAffiliateCountResponse = {
    registers: number;
    total_commission: number;
  };

  type QueryUserAffiliateListRequest = {
    page: number;
    size: number;
  };

  type QueryUserAffiliateListResponse = {
    list: UserAffiliate[];
    total: number;
  };

  type QuotaTask = {
    id: number;
    subscribers: number[];
    is_active: boolean;
    start_time: number;
    end_time: number;
    reset_traffic: boolean;
    days: number;
    gift_type: number;
    gift_value: number;
    /** UserSubscribe IDs */
    objects: number[];
    status: number;
    total: number;
    current: number;
    errors: string;
    created_at: number;
    updated_at: number;
  };

  type RechargeOrderRequest = {
    amount: number;
    payment: number;
  };

  type RechargeOrderResponse = {
    order_no: string;
  };

  type RegisterConfig = {
    stop_register: boolean;
    enable_trial: boolean;
    trial_subscribe: number;
    trial_time: number;
    trial_time_unit: string;
    enable_ip_register_limit: boolean;
    ip_register_limit: number;
    ip_register_limit_duration: number;
    device_limit: number;
  };

  type RegisterLog = {
    user_id: number;
    auth_method: string;
    identifier: string;
    register_ip: string;
    user_agent: string;
    timestamp: number;
  };

  type RenewalOrderRequest = {
    user_subscribe_id: number;
    quantity: number;
    payment: number;
    coupon?: string;
  };

  type RenewalOrderResponse = {
    order_no: string;
  };

  type ResetAllSubscribeTokenResponse = {
    success: boolean;
  };

  type ResetSortRequest = {
    sort: SortItem[];
  };

  type ResetSubscribeLog = {
    type: number;
    user_id: Int64Value;
    user_subscribe_id: Int64Value;
    order_no?: string;
    timestamp: Int64Value;
  };

  type ResetSubscribeTrafficLog = {
    id: Int64Value;
    type: number;
    user_subscribe_id: Int64Value;
    order_no?: string;
    timestamp: Int64Value;
  };

  type ResetTrafficOrderRequest = {
    user_subscribe_id: number;
    payment: number;
  };

  type ResetTrafficOrderResponse = {
    order_no: string;
  };

  type ResetUserSubscribeTokenRequest = {
    user_subscribe_id: Int64Value;
  };

  type ResetUserSubscribeTrafficRequest = {
    user_subscribe_id: Int64Value;
  };

  type Response = {
    /** 状态码 */
    code?: number;
    /** 消息 */
    msg?: string;
    message?: string;
    /** 数据 */
    data?: Record<string, any>;
  };

  type RevenueStatisticsResponse = {
    today: OrdersStatistics;
    monthly: OrdersStatistics;
    all: OrdersStatistics;
  };

  type SecurityConfig = {
    sni: string;
    allow_insecure: boolean;
    fingerprint: string;
    reality_server_addr: string;
    reality_server_port: number;
    reality_private_key: string;
    reality_public_key: string;
    reality_short_id: string;
  };

  type Server = {
    id: Int64Value;
    name: string;
    country: string;
    city: string;
    address: string;
    sort: number;
    protocols: Protocol[];
    last_reported_at: Int64Value;
    status: ServerStatus;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type ServerGroup = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    updated_at: number;
  };

  type ServerOnlineIP = {
    ip: string;
    protocol: string;
  };

  type ServerOnlineUser = {
    ip: ServerOnlineIP[];
    user_id: Int64Value;
    subscribe: string;
    subscribe_id: Int64Value;
    traffic: Int64Value;
    expired_at: Int64Value;
  };

  type ServerRuleGroup = {
    id: number;
    icon: string;
    name: string;
    type: string;
    tags: string[];
    rules: string;
    enable: boolean;
    default: boolean;
    created_at: number;
    updated_at: number;
  };

  type ServerStatus = {
    cpu: number;
    mem: number;
    disk: number;
    protocol: string;
    online: ServerOnlineUser[];
    status: string;
  };

  type ServerTotalDataResponse = {
    online_users: Int64Value;
    online_servers: Int64Value;
    offline_servers: Int64Value;
    today_upload: Int64Value;
    today_download: Int64Value;
    monthly_upload: Int64Value;
    monthly_download: Int64Value;
    updated_at: Int64Value;
    server_traffic_ranking_today: ServerTrafficData[];
    server_traffic_ranking_yesterday: ServerTrafficData[];
    user_traffic_ranking_today: UserTrafficData[];
    user_traffic_ranking_yesterday: UserTrafficData[];
  };

  type ServerTrafficData = {
    server_id: Int64Value;
    name: string;
    upload: Int64Value;
    download: Int64Value;
  };

  type ServerTrafficLog = {
    /** Server ID */
    server_id: number;
    /** Upload traffic in bytes */
    upload: number;
    /** Download traffic in bytes */
    download: number;
    /** Total traffic in bytes (Upload + Download) */
    total: number;
    /** Date in YYYY-MM-DD format */
    date: string;
    /** Whether to show detailed traffic */
    details: boolean;
  };

  type SetNodeMultiplierRequest = {
    periods: TimePeriod[];
  };

  type Shadowsocks = {
    method: string;
    port: number;
    server_key: string;
  };

  type SiteConfig = {
    host: string;
    site_name: string;
    site_desc: string;
    site_logo: string;
    keywords: string;
    custom_html: string;
    custom_data: string;
  };

  type SiteCustomDataContacts = {
    email: string;
    telephone: string;
    address: string;
  };

  type SortItem = {
    id: number;
    sort: number;
  };

  type StopBatchSendEmailTaskRequest = {
    id: Int64Value;
  };

  type StripePayment = {
    method: string;
    client_secret: string;
    publishable_key: string;
  };

  type Subscribe = {
    id: Int64Value;
    name: string;
    language: string;
    description: string;
    unit_price: Int64Value;
    unit_time: string;
    discount: SubscribeDiscount[];
    replacement: Int64Value;
    inventory: Int64Value;
    traffic: Int64Value;
    speed_limit: Int64Value;
    device_limit: Int64Value;
    quota: Int64Value;
    nodes: Int64Value[];
    node_tags: string[];
    node_group_ids?: Int64Value[];
    node_group_id?: Int64Value;
    show: boolean;
    sell: boolean;
    sort: Int64Value;
    deduction_ratio: Int64Value;
    allow_deduction: boolean;
    reset_cycle: Int64Value;
    renewal_reset: boolean;
    show_original_price: boolean;
    created_at: Int64Value;
    updated_at: Int64Value;
    sold?: Int64Value;
  };

  type SubscribeApplication = {
    id: Int64Value;
    name: string;
    description?: string;
    icon?: string;
    scheme?: string;
    user_agent: string;
    is_default: boolean;
    template: string;
    output_format: string;
    download_link?: DownloadLink;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type SubscribeConfig = {
    single_model: boolean;
    subscribe_path: string;
    subscribe_domain: string;
    pan_domain: boolean;
    user_agent_limit: boolean;
    user_agent_list: string;
  };

  type SubscribeDiscount = {
    quantity: number;
    discount: number;
  };

  type SubscribeGroup = {
    id: number;
    name: string;
    description: string;
    created_at: number;
    updated_at: number;
  };

  type SubscribeItem = {
    id?: number;
    name?: string;
    language?: string;
    description?: string;
    unit_price?: number;
    unit_time?: string;
    discount?: SubscribeDiscount[];
    replacement?: number;
    inventory?: number;
    traffic?: number;
    speed_limit?: number;
    device_limit?: number;
    quota?: number;
    nodes?: number[];
    node_tags?: string[];
    node_group_ids?: number[];
    node_group_id?: number;
    show?: boolean;
    sell?: boolean;
    sort?: number;
    deduction_ratio?: number;
    allow_deduction?: boolean;
    reset_cycle?: number;
    renewal_reset?: boolean;
    show_original_price?: boolean;
    created_at?: number;
    updated_at?: number;
    sold: number;
  };

  type SubscribeLog = {
    user_id: number;
    token: string;
    user_agent: string;
    client_ip: string;
    user_subscribe_id: number;
    timestamp: number;
  };

  type SubscribeSortRequest = {
    sort: SortItem[];
  };

  type SubscribeType = {
    subscribe_types: string[];
  };

  type TelegramConfig = {
    telegram_bot_token: string;
    telegram_group_url: string;
    telegram_notify: boolean;
    telegram_web_hook_domain: string;
  };

  type TestEmailSendRequest = {
    email: string;
  };

  type TestSmsSendRequest = {
    area_code: string;
    telephone: string;
  };

  type Ticket = {
    id: number;
    title: string;
    description: string;
    user_id: number;
    follow?: Follow[];
    status: number;
    created_at: number;
    updated_at: number;
  };

  type TicketWaitRelpyResponse = {
    count: number;
  };

  type TimePeriod = {
    start_time: string;
    end_time: string;
    multiplier: number;
  };

  type ToggleNodeStatusRequest = {
    id: number;
    enable: boolean;
  };

  type ToggleUserSubscribeStatusRequest = {
    user_subscribe_id: Int64Value;
  };

  type TosConfig = {
    tos_content: string;
  };

  type TrafficLog = {
    id: Int64Value;
    server_id: Int64Value;
    user_id: Int64Value;
    subscribe_id: Int64Value;
    download: Int64Value;
    upload: Int64Value;
    timestamp: Int64Value;
  };

  type TrafficLogDetails = {
    id: Int64Value;
    server_id: Int64Value;
    user_id: Int64Value;
    subscribe_id: Int64Value;
    download: Int64Value;
    upload: Int64Value;
    timestamp: Int64Value;
  };

  type TransportConfig = {
    path: string;
    host: string;
    service_name: string;
  };

  type Trojan = {
    port: number;
    transport: string;
    transport_config: TransportConfig;
    security: string;
    security_config: SecurityConfig;
  };

  type Tuic = {
    port: number;
    disable_sni: boolean;
    reduce_rtt: boolean;
    udp_relay_mode: string;
    congestion_controller: string;
    security_config: SecurityConfig;
  };

  type UpdateAdsRequest = {
    id: number;
    title: string;
    type: string;
    content: string;
    description: string;
    target_url: string;
    start_time: number;
    end_time: number;
    status: number;
  };

  type UpdateAnnouncementEnableRequest = {
    id: number;
    enable: boolean;
  };

  type UpdateAnnouncementRequest = {
    id: number;
    title: string;
    content: string;
    show: boolean;
    pinned: boolean;
    popup: boolean;
  };

  type UpdateAuthMethodConfigRequest = {
    id: number;
    method: string;
    config: Record<string, any>;
    enabled: boolean;
  };

  type UpdateCouponRequest = {
    id: number;
    name: string;
    code?: string;
    count?: number;
    type: number;
    discount: number;
    start_time: number;
    expire_time: number;
    user_limit?: number;
    subscribe?: number[];
    used_count?: number;
    enable?: boolean;
  };

  type UpdateDocumentRequest = {
    id: number;
    title: string;
    content: string;
    tags?: string[];
    show: boolean;
  };

  type UpdateNodeRequest = {
    id: number;
    name: string;
    tags?: string[];
    port: number;
    address: string;
    server_id: number;
    protocol: string;
    enabled: boolean;
  };

  type UpdateOrderStatusRequest = {
    id: Int64Value;
    status: number;
    payment_id?: Int64Value;
    trade_no?: string;
  };

  type UpdatePaymentMethodRequest = {
    id: Int64Value;
    name: string;
    platform: string;
    description: string;
    icon?: string;
    domain?: string;
    config: Record<string, any>;
    fee_mode: number;
    fee_percent?: Int64Value;
    fee_amount?: Int64Value;
    enable: boolean;
  };

  type UpdateServerRequest = {
    id: number;
    name: string;
    country?: string;
    city?: string;
    address: string;
    sort?: number;
    protocols: Protocol[];
  };

  type UpdateSubscribeApplicationRequest = {
    id: number;
    name: string;
    description?: string;
    icon?: string;
    scheme?: string;
    user_agent: string;
    is_default: boolean;
    template: string;
    output_format: string;
    download_link?: DownloadLink;
  };

  type UpdateSubscribeGroupRequest = {
    id: number;
    name: string;
    description: string;
  };

  type UpdateSubscribeRequest = {
    id: number;
    name: string;
    language: string;
    description: string;
    unit_price: number;
    unit_time: string;
    discount: SubscribeDiscount[];
    replacement: number;
    inventory: number;
    traffic: number;
    speed_limit: number;
    device_limit: number;
    quota: number;
    nodes: number[];
    node_tags: string[];
    show: boolean;
    sell: boolean;
    sort: number;
    deduction_ratio: number;
    allow_deduction: boolean;
    reset_cycle: number;
    renewal_reset: boolean;
    show_original_price: boolean;
  };

  type UpdateTicketStatusRequest = {
    id: number;
    status: number;
  };

  type UpdateUserAuthMethodRequest = {
    user_id: number;
    auth_type: string;
    auth_identifier: string;
  };

  type UpdateUserBasiceInfoRequest = {
    user_id: Int64Value;
    password: string;
    avatar: string;
    balance: Int64Value;
    commission: Int64Value;
    referral_percentage: number;
    only_first_purchase: boolean;
    gift_amount: Int64Value;
    telegram: Int64Value;
    refer_code: string;
    referer_id: Int64Value;
    enable: boolean;
    is_admin: boolean;
  };

  type UpdateUserNotifySettingRequest = {
    user_id: Int64Value;
    enable_balance_notify: boolean;
    enable_login_notify: boolean;
    enable_subscribe_notify: boolean;
    enable_trade_notify: boolean;
  };

  type UpdateUserSubscribeRequest = {
    user_subscribe_id: Int64Value;
    subscribe_id: Int64Value;
    traffic: Int64Value;
    expired_at: Int64Value;
    upload: Int64Value;
    download: Int64Value;
  };

  type User = {
    id: Int64Value;
    avatar: string;
    balance: Int64Value;
    commission: Int64Value;
    referral_percentage: number;
    only_first_purchase: boolean;
    gift_amount: Int64Value;
    telegram: Int64Value;
    refer_code: string;
    referer_id: Int64Value;
    enable: boolean;
    is_admin?: boolean;
    enable_balance_notify: boolean;
    enable_login_notify: boolean;
    enable_subscribe_notify: boolean;
    enable_trade_notify: boolean;
    user_group_id?: Int64Value;
    group_locked: boolean;
    auth_methods: UserAuthMethod[];
    user_devices: UserDevice[];
    rules: string[];
    created_at: Int64Value;
    updated_at: Int64Value;
    deleted_at?: Int64Value;
  };

  type UserAffiliate = {
    avatar: string;
    identifier: string;
    registered_at: number;
    enable: boolean;
  };

  type UserAuthMethod = {
    auth_type: string;
    auth_identifier: string;
    verified: boolean;
  };

  type UserDevice = {
    id: Int64Value;
    ip: string;
    identifier: string;
    user_agent: string;
    online: boolean;
    enabled: boolean;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type UserLoginLog = {
    id?: Int64Value;
    user_id: Int64Value;
    login_ip: string;
    user_agent: string;
    success: boolean;
    timestamp: Int64Value;
  };

  type UserStatistics = {
    date?: string;
    register: Int64Value;
    new_order_users: Int64Value;
    renewal_order_users: Int64Value;
    list?: UserStatistics[];
  };

  type UserStatisticsResponse = {
    today: UserStatistics;
    monthly: UserStatistics;
    all: UserStatistics;
  };

  type UserSubscribe = {
    id: Int64Value;
    user_id: Int64Value;
    order_id: Int64Value;
    subscribe_id: Int64Value;
    subscribe: Subscribe;
    start_time: Int64Value;
    expire_time: Int64Value;
    finished_at: Int64Value;
    reset_time: Int64Value;
    traffic: Int64Value;
    download: Int64Value;
    upload: Int64Value;
    token: string;
    status: number;
    short: string;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type UserSubscribeDetail = {
    id: Int64Value;
    user_id: Int64Value;
    user: User;
    order_id: Int64Value;
    subscribe_id: Int64Value;
    subscribe: Subscribe;
    start_time: Int64Value;
    expire_time: Int64Value;
    reset_time: Int64Value;
    traffic: Int64Value;
    download: Int64Value;
    upload: Int64Value;
    token: string;
    status: number;
    created_at: Int64Value;
    updated_at: Int64Value;
  };

  type UserSubscribeLog = {
    id: Int64Value;
    user_id: Int64Value;
    user_subscribe_id: Int64Value;
    token: string;
    ip: string;
    user_agent: string;
    timestamp: Int64Value;
  };

  type UserSubscribeTrafficLog = {
    /** Subscribe ID */
    subscribe_id: Int64Value;
    /** User ID */
    user_id: Int64Value;
    /** Upload traffic in bytes */
    upload: Int64Value;
    /** Download traffic in bytes */
    download: Int64Value;
    /** Total traffic in bytes (Upload + Download) */
    total: Int64Value;
    /** Date in YYYY-MM-DD format */
    date: string;
    /** Whether to show detailed traffic */
    details: boolean;
  };

  type UserTrafficData = {
    sid: Int64Value;
    upload: Int64Value;
    download: Int64Value;
  };

  type VerifyCodeConfig = {
    verify_code_expire_time: number;
    verify_code_limit: number;
    verify_code_interval: number;
  };

  type VerifyConfig = {
    turnstile_site_key: string;
    turnstile_secret: string;
    enable_login_verify: boolean;
    enable_register_verify: boolean;
    enable_reset_password_verify: boolean;
  };

  type VersionResponse = {
    version: string;
  };

  type Vless = {
    port: number;
    flow: string;
    transport: string;
    transport_config: TransportConfig;
    security: string;
    security_config: SecurityConfig;
  };

  type Vmess = {
    port: number;
    transport: string;
    transport_config: TransportConfig;
    security: string;
    security_config: SecurityConfig;
  };

  // ===== Group Management Types =====

  type UserGroup = {
    id: number;
    name: string;
    description: string;
    sort: number;
    node_group_id?: number | null;
    for_calculation?: boolean;
    created_at: number;
    updated_at: number;
  };

  type NodeGroup = {
    id: number;
    name: string;
    type: string;
    description: string;
    sort: number;
    for_calculation: boolean;
    is_expired_group: boolean;
    expired_days_limit: number;
    max_traffic_gb_expired?: number;
    speed_limit: number;
    min_traffic_gb?: number;
    max_traffic_gb?: number;
    node_count?: number;
    created_at: number;
    updated_at: number;
  };

  type Subscribe = {
    id: number;
    name: string;
    unit_price: number;
    unit_time: number;
    show?: boolean;
    sell?: boolean;
    sort: number;
    created_at: number;
    updated_at: number;
  };

  type SubscribeGroupMapping = {
    subscribe_id: number;
    user_group_id: string;
    created_at: number;
    updated_at: number;
  };

  type SubscribeGroupMappingInfo = {
    id: number;
    subscribe_id: number;
    user_group_id: number;
    subscribe?: Subscribe;
    user_group?: UserGroup;
    created_at: number;
    updated_at: number;
  };

  type GroupHistory = {
    id: Int64Value;
    group_mode: string;
    trigger_type: string;
    total_users: number;
    success_count: number;
    failed_count: number;
    start_time?: Int64Value;
    end_time?: Int64Value;
    operator?: string;
    error_log?: string;
    created_at: Int64Value;
  };

  type GroupHistoryDetailItem = {
    id: Int64Value;
    history_id: Int64Value;
    user_group_id: string;
    node_group_id: string;
    user_count: number;
    node_count: number;
    user_data?: string;
    created_at: Int64Value;
  };

  type GroupHistoryDetail = {
    id: Int64Value;
    group_mode: string;
    trigger_type: string;
    total_users: number;
    success_count: number;
    failed_count: number;
    start_time?: Int64Value;
    end_time?: Int64Value;
    operator?: string;
    error_log?: string;
    created_at: Int64Value;
    config_snapshot?: {
      group_details?: GroupHistoryDetailItem[];
      config?: Record<string, unknown>;
    };
  };

  type RecalculationState = {
    state: string;
    progress: Int64Value;
    total: Int64Value;
  };

  // ===== Group Request/Response Types =====

  type GetUserGroupListRequest = {
    page: number;
    size: number;
    group_id?: string;
  };

  type GetUserGroupListResponse = {
    total: number;
    list: UserGroup[];
  };

  type CreateUserGroupRequest = {
    name: string;
    description?: string;
    sort?: number;
    node_group_id?: number | null;
    for_calculation?: boolean | null;
  };

  type UpdateUserGroupRequest = {
    id: number;
    name?: string;
    description?: string;
    sort?: number;
    node_group_id?: number | null;
    for_calculation?: boolean | null;
  };

  type DeleteUserGroupRequest = {
    id: number;
  };

  type BindNodeGroupsRequest = {
    user_group_ids: number[];
    node_group_id?: number | null;
  };

  type GetNodeGroupListRequest = {
    page: number;
    size: number;
    group_id?: string;
  };

  type GetNodeGroupListResponse = {
    total: number;
    list: NodeGroup[];
  };

  type CreateNodeGroupRequest = {
    name: string;
    type?: string;
    description?: string;
    sort?: number;
    for_calculation?: boolean;
    is_expired_group?: boolean;
    expired_days_limit?: number;
    max_traffic_gb_expired?: number;
    speed_limit?: number;
    min_traffic_gb?: number;
    max_traffic_gb?: number;
  };

  type UpdateNodeGroupRequest = {
    id: number;
    name?: string;
    type?: string;
    description?: string;
    sort?: number;
    for_calculation?: boolean;
    is_expired_group?: boolean;
    expired_days_limit?: number;
    max_traffic_gb_expired?: number;
    speed_limit?: number;
    min_traffic_gb?: number;
    max_traffic_gb?: number;
  };

  type DeleteNodeGroupRequest = {
    id: number;
  };

  type GetSubscribeMappingRequest = {
    page: number;
    size: number;
    subscribe_id?: number;
    user_group_id?: number;
  };

  type GetSubscribeMappingResponse = {
    total: number;
    list: SubscribeGroupMappingInfo[];
  };

  type UpdateSubscribeMappingRequest = {
    subscribe_id: number;
    user_group_id: number;
  };

  type GetGroupConfigResponse = {
    enabled: boolean;
    mode: string;
  };

  type UpdateGroupConfigRequest = {
    enabled?: boolean;
    mode?: string;
  };

  type RecalculateGroupRequest = {
    mode: string;
  };

  type GetGroupHistoryRequest = {
    page: number;
    size: number;
    group_mode?: string;
    trigger_type?: string;
  };

  type GetGroupHistoryResponse = {
    total: number;
    list: GroupHistory[];
  };

  type GetGroupHistoryDetailRequest = {
    id: number;
  };

  type GetGroupHistoryDetailResponse = GroupHistoryDetail;

  type ExportGroupResultRequest = {
    history_id?: number;
  };
  type MigrateUsersRequest = {
    from_user_group_id: number;
    to_user_group_id: number;
    include_locked?: boolean;
  };
  type MigrateUsersResponse = {
    success_count: number;
    failed_count: number;
  };
  type ResetGroupsRequest = {
    confirm: boolean;
  };

  type PreviewUserNodesRequest = {
    user_id: number;
  };

  type PreviewUserNodesResponse = {
    user_id: number;
    node_groups: Array<{
      id: number;
      name: string;
      nodes: Array<{
        id: number;
        name: string;
        address: string;
        port: number;
      }>;
    }>;
  };
}
