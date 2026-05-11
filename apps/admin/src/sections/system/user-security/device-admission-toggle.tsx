import { useQuery, useQueryClient } from "@tanstack/react-query";
import { Switch } from "@workspace/ui/components/switch";
import { Icon } from "@workspace/ui/composed/icon";
import {
  getNodeConfig,
  updateNodeConfig,
} from "@workspace/ui/services/admin/system";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { toast } from "sonner";

export default function DeviceAdmissionToggle() {
  const { t } = useTranslation("system");
  const [loading, setLoading] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery({
    queryKey: ["getNodeConfig"],
    queryFn: async () => {
      const { data } = await getNodeConfig();
      return data.data;
    },
  });

  const enabled = data?.device_admission_enabled ?? false;

  async function handleToggle(checked: boolean) {
    if (!data) return;
    setLoading(true);
    try {
      await updateNodeConfig({
        ...data,
        device_admission_enabled: checked,
      } as API.NodeConfig);
      toast.success(t("deviceAdmission.saveSuccess", "Save Successful"));
      queryClient.invalidateQueries({ queryKey: ["getNodeConfig"] });
    } catch (_error) {
      toast.error(t("deviceAdmission.saveFailed", "Save Failed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center justify-between transition-colors">
      <div className="flex min-w-0 flex-1 items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Icon className="h-5 w-5 text-primary" icon="mdi:shield-check" />
        </div>
        <div className="flex-1">
          <p className="font-medium">
            {t("deviceAdmission.title", "Real-time Device Admission Control")}
          </p>
          <p className="max-w-md break-words text-muted-foreground text-sm">
            {t(
              "deviceAdmission.description",
              "When enabled, OmnXT nodes will perform device admission checks with the panel on every new connection. This feature requires OmnXT Node (v1.0.0+) with the admission control module deployed. When disabled, nodes will not perform admission checks and device limits rely solely on the traditional heartbeat reporting mechanism."
            )}
          </p>
        </div>
      </div>
      <div className="ml-4 flex flex-shrink-0 items-center gap-2">
        <span className="text-muted-foreground text-sm">
          {enabled
            ? t("deviceAdmission.enabled", "Enabled")
            : t("deviceAdmission.disabled", "Disabled")}
        </span>
        <Switch
          checked={enabled}
          disabled={loading}
          onCheckedChange={handleToggle}
        />
      </div>
    </div>
  );
}
