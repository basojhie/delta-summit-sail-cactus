import { createFileRoute } from "@tanstack/react-router";
import { lazy, Suspense, useEffect, useState } from "react";

const OfficeApp = lazy(() => import("@/office/OfficeApp").then((mod) => ({ default: mod.OfficeApp })));

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return (
    <main className="app-frame">
      {ready ? (
        <Suspense fallback={<Boot />}>
          <OfficeApp />
        </Suspense>
      ) : (
        <Boot />
      )}
    </main>
  );
}

function Boot() {
  return (
    <div className="boot">
      <p>Tim kreatif</p>
      <h1>Atrium</h1>
    </div>
  );
}
