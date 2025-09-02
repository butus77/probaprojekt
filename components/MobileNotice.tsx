"use client";

import { useState } from "react";

type Props = {
  onContinue?: () => void;
  onClose?: () => void;
};

export default function MobileNotice({ onContinue, onClose }: Props) {
  const [hidden, setHidden] = useState(false);
  const handleClose = () => {
    setHidden(true);
    onClose?.();
  };
  if (hidden) return null;

  return (
    <div
      role="status"
      aria-live="polite"
      className="md:hidden fixed bottom-0 left-0 right-0 z-50 w-full p-4 border-t border-yellow-200 bg-yellow-50 text-sm text-yellow-800 shadow-lg"
    >
      <div className="flex items-start gap-2">
        <span className="mt-0.5 text-lg" aria-hidden>⚠️</span>
        <p className="flex-1">
          <strong className="font-semibold">Figyelem!</strong> A könyvek mobiltelefonon
          korlátozottan jelennek meg. Javasoljuk, hogy inkább számítógépen vagy tableten
          nyissa meg őket az élvezhetőbb olvasási élmény érdekében.
        </p>
        <div className="flex items-center gap-2">
          {onContinue ? (
            <button
              type="button"
              onClick={onContinue}
              className="inline-flex rounded-md border border-yellow-300 px-2 py-1 text-xs"
            >
              Megnyitás most
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleClose}
            className="inline-flex rounded-md border border-yellow-300 px-2 py-1 text-xs"
            aria-label="Értem, bezárás"
          >
            Bezár
          </button>
        </div>
      </div>
    </div>
  );
}

