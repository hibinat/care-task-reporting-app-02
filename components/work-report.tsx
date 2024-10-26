import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mic, X } from "lucide-react";

export function WorkReport({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-4 space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">作業報告</h2>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <label className="block">
            担当者
            <Input type="text" placeholder="担当者名" />
          </label>
          <label className="block">
            利用者
            <Input type="text" placeholder="利用者名" />
          </label>
        </div>
        <label className="block">
          日時
          <Input type="datetime-local" />
        </label>
        <label className="block">
          対応内容
          <div className="flex items-center space-x-2">
            <textarea className="w-full p-2 border rounded" rows={4}></textarea>
            <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
          </div>
        </label>
        <label className="block">
          その他詳細
          <div className="flex items-center space-x-2">
            <textarea className="w-full p-2 border rounded" rows={4}></textarea>
            <Button size="icon" className="w-12 h-12"><Mic className="w-6 h-6" /></Button>
          </div>
        </label>
      </div>
      <Button onClick={onClose} variant="outline" size="lg" className="w-full">
        <X className="mr-2 h-4 w-4" /> 閉じる
      </Button>
    </div>
  );
}
