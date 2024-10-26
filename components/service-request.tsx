import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, X } from "lucide-react";

export function ServiceRequest({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">サービス依頼書</h2>
        <Button onClick={onClose} variant="outline" size="lg" className="px-6">
          <X className="mr-2 h-4 w-4" /> 閉じる
        </Button>
      </div>
      <div className="space-y-4">
        <label className="block">
          サービス内容
          <Input type="text" />
        </label>
        <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
        <label className="block">
          担当者
          <Input type="text" />
        </label>
        <label className="block">
          依頼日時
          <Input type="datetime-local" />
        </label>
      </div>
      <Button className="w-full">依頼書を送信</Button>
    </div>
  );
}
