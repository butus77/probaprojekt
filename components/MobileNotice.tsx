"use client";

import { useEffect, useState } from "react";

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

  // (opcionális) háttér scroll tiltása, amíg a modal nyitva van
  useEffect(() => {
    if (!hidden) {
      const prev = document.body.style.overflow;
      document.body.style.overflow = "hidden";
      return () => {
        document.body.style.overflow = prev;
      };
    }
  }, [hidden]);

  if (hidden) return null;

  return (
    <div
      className="md:hidden fixed inset-0 z-[100] flex items-center justify-center bg-black/40 backdrop-blur"
      role="dialog"
      aria-modal="true"
      aria-labelledby="mobile-notice-title"
      onClick={handleClose} // a hátterére kattintva is zár
    >
      <div
        className="mx-4 w-full max-w-md rounded-2xl border border-yellow-300 bg-yellow-50 p-5 shadow-2xl"
        onClick={(e) => e.stopPropagation()} // a dobozon belüli katt ne zárjon
      >
        <div className="flex items-start gap-3">
          {/* Ikon */}
          <span className="shrink-0 text-2xl" aria-hidden>
            ⚠️
          </span>

          {/* Szöveg */}
          <div className="min-w-0 flex-1">
            <h2
              id="mobile-notice-title"
              className="text-base font-bold text-yellow-900"
            >
              Figyelem!
            </h2>
            <p className="mt-1 break-words text-pretty leading-relaxed text-yellow-900/90">
              A könyvek mobiltelefonon korlátozottan jelennek meg. Javasoljuk,
              hogy inkább számítógépen vagy tableten nyissa meg őket az
              élvezhetőbb olvasási élmény érdekében.
            </p>
          </div>
        </div>

        {/* Gombok */}
        <div className="mt-4 flex justify-end gap-2">
          {onContinue ? (
            <button
              type="button"
              onClick={onContinue}
              className="shrink-0 rounded-lg border border-yellow-300 bg-yellow-100 px-3 py-1.5 text-sm font-medium text-yellow-900"
            >
              Megnyitás most
            </button>
          ) : null}
          <button
            type="button"
            onClick={handleClose}
            className="shrink-0 rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-sm text-gray-700"
            aria-label="Értem, bezárás"
          >
            Bezár
          </button>
        </div>
      </div>
    </div>
  );
}