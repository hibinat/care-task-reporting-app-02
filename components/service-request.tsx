import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, X } from "lucide-react";

export function ServiceRequest({ onClose }: { onClose: () => void }) {
  const setTodayDate = () => {
    const today = new Date().toISOString().slice(0, 16);
    const dateInput = document.getElementById("request-date-input") as HTMLInputElement;
    if (dateInput) {
      dateInput.value = today;
    }
  };

  return (
    <div className="p-4 space-y-4 flex flex-col h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">サービス依頼書</h2>
      </div>
      <div className="space-y-4 flex-1">
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
          <div className="flex items-center space-x-2">
            <Input id="request-date-input" type="datetime-local" />
            <Button onClick={setTodayDate}>今日の日付を入力</Button>
          </div>
        </label>
        <Button variant="outline" size="lg" className="w-full">
          依頼書を送信
        </Button>
      </div>
      <div className="mt-auto">
        <Button onClick={onClose} variant="outline" size="lg" className="w-full">
          <X className="mr-2 h-4 w-4" /> 閉じる
        </Button>
      </div>
    </div>
  );
}
