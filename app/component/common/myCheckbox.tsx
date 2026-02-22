import { Switch } from "@headlessui/react";

export function MyCheckbox({ value, onChange }: { value: boolean, onChange: (val: boolean) => void }) {
  return (
    <div className="flex items-center space-x-3">
      <Switch
        checked={value}
        onChange={onChange}
        className={`relative inline-flex h-6 w-11 items-center rounded border transition-colors duration-200 ${
          value ? 'bg-blue-600 border-blue-600' : 'bg-white border-gray-300'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded bg-white transition-transform duration-200 ${
            value ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </Switch>
      <span className="text-gray-700 text-sm">Activo</span>
    </div>
  );
}